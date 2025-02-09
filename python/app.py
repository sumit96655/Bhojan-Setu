from flask import Flask, request, jsonify
from pymongo import MongoClient
from geopy.distance import geodesic
from datetime import datetime
from dotenv import load_dotenv
import os
import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

load_dotenv()
app = Flask(__name__)

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["test"]

donors_collection = db["donors"]
ngos_collection = db["ngos"]
#accepted_donations_collection = db["accepted_donations"]

@app.route("/", methods=["GET"])
def default_route():
    return jsonify({
        "message": "Welcome!"
    })


#finding best ngo
def find_suitable_ngos(donor):
    donor_coords = (donor["latitude"], donor["longitude"])
    donor_items = donor["donate_items_info"]
    
    ngos = list(ngos_collection.find())  
    matched_ngos = []

    for ngo in ngos:
        ngo_coords = (ngo["Latitude"], ngo["Longitude"])
        distance_km = geodesic(donor_coords, ngo_coords).km

        ngo_data = {
            "name": ngo["Name"],
            "email": ngo["Email"],
            "contact": ngo["Contact No"],
            "address": ngo["Address"],
            "distance_km": round(distance_km, 2)
        }

        score = 0

        if distance_km <= 10:
            score += 40
        elif 10 < distance_km <= 25:
            score += 30
        else:
            score += 10

        def extract_shelf_life(item):
            """Extracts shelf life as an integer, handling both string and integer cases."""
            if isinstance(item["shelf_life"], int):
                return item["shelf_life"]
            elif isinstance(item["shelf_life"], str):
                return int(item["shelf_life"].split()[0])  
            return 0 

        max_shelf_life = max(extract_shelf_life(item) for item in donor_items)

        if max_shelf_life <= 1:
            score += 30
        elif max_shelf_life <= 3:
            score += 20
        else:
            score += 10

        preferred_food_types = ["cooked", "raw", "fruits"]
        matching_foods = [item["food"] for item in donor_items if item["food"].lower() in preferred_food_types]
        if matching_foods:
            score += 20
        
        ngo_data["score"] = score
        matched_ngos.append(ngo_data)

    matched_ngos = sorted(matched_ngos, key=lambda x: x["score"], reverse=True)

    return {
        "matched_ngos": matched_ngos[:5]  # Return top 5 matches
    }

@app.route("/donate", methods=["POST"])
def donate_food():
    data = request.json
    data["date"] = datetime.utcnow().isoformat()  


    donor_id = donors_collection.insert_one(data).inserted_id

    matched_ngos = find_suitable_ngos(data)

    return jsonify({
        "message": "Donation request received!",
        "donor_id": str(donor_id),
        "matched_ngos": matched_ngos
    })


# Database Connection
def db_connection():
    mongo_uri = os.getenv("MONGO_URI")
    client = MongoClient(mongo_uri)
    db = client["test"]
    return db["donations"]

# Fetch and Preprocess Data
def fetch_and_preprocess_data():
    donations_collection = db_connection()
    data = list(donations_collection.find({}, {"_id": 0, "createdAt": 1, "quantity": 1}))
    df = pd.DataFrame(data)
    df["createdAt"] = pd.to_datetime(df["createdAt"])
    df["date"] = df["createdAt"].dt.date
    df.set_index("date", inplace=True)
    df.sort_index(inplace=True)
    
    scaler = MinMaxScaler(feature_range=(0, 1))
    df["quantity"] = scaler.fit_transform(df[["quantity"]])
    
    sequence_length = 40
    data_x, data_y = [], []
    data_values = df["quantity"].values

    for i in range(len(data_values) - sequence_length):
        data_x.append(data_values[i: i + sequence_length])
        data_y.append(data_values[i + sequence_length])
    
    data_x, data_y = np.array(data_x), np.array(data_y)
    data_x = np.reshape(data_x, (data_x.shape[0], data_x.shape[1], 1))

    return df, data_x, data_y, scaler

# Train and Predict
def train_and_predict(data_x, data_y, scaler, sequence_length=40, no_days=100):
    train_size = int(len(data_x) * 0.8)
    x_train, x_test = data_x[:train_size], data_x[train_size:]
    y_train, y_test = data_y[:train_size], data_y[train_size:]
    
    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=(sequence_length, 1)),
        LSTM(50, return_sequences=False),
        Dense(25),
        Dense(1)
    ])
    
    model.compile(optimizer="adam", loss="mean_squared_error")
    model.fit(x_train, y_train, batch_size=16, epochs=50, validation_data=(x_test, y_test), verbose=1)
    
    future_predictions = []
    last_sequence = data_x[-1].reshape(1, sequence_length, 1)
    
    for _ in range(no_days):
        next_prediction = model.predict(last_sequence)
        future_predictions.append(next_prediction[0, 0])
        last_sequence = np.roll(last_sequence, -1)
        last_sequence[0, -1, 0] = next_prediction[0, 0]
    
    future_predictions = scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1))
    return future_predictions

@app.route("/predict", methods=["GET"])
def predict():
    df, data_x, data_y, scaler = fetch_and_preprocess_data()
    future_predictions = train_and_predict(data_x, data_y, scaler, no_days=100)
    
    # Generate future dates for the predictions
    future_dates = pd.date_range(df.index[-1] + pd.Timedelta(days=1), periods=100)
    
    # Prepare the prediction result
    forecast_df = pd.DataFrame({
        "Date": future_dates.strftime('%Y-%m-%d'),
        "Predicted Quantity": future_predictions.flatten()
    })
    
    # Return the predictions as JSON
    return jsonify(forecast_df.to_dict(orient="records"))


# New route for sending image to mold detection API
@app.route("/detect_mold", methods=["POST"])
def detect_mold():
    try:
        # Check if the 'file' is part of the form data in the request
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        # Get the uploaded file from the request
        file = request.files["file"]
        
        # API Endpoint of the 2nd app.py (mold detection)
        url = "http://127.0.0.1:5002/predict"

        # Send the image to the mold detection API
        response = requests.post(url, files={"file": file})

        # Return the response from the 2nd app.py
        return jsonify(response.json())

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)
