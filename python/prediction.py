import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

load_dotenv()

def db_connection():
    """Establishes a connection to the MongoDB database and returns the donations collection."""
    mongo_uri = os.getenv("MONGO_URI")
    client = MongoClient(mongo_uri)
    db = client["test"]
    return db["donations"]


def fetch_and_preprocess_data(donations_collection):
    """Fetches donation data from MongoDB, preprocesses it, and returns normalized data."""
    
    # Fetch records from MongoDB
    data = list(donations_collection.find({}, {"_id": 0, "createdAt": 1, "quantity": 1}))

    # Convert to DataFrame
    df = pd.DataFrame(data)
    df["createdAt"] = pd.to_datetime(df["createdAt"])
    df["date"] = df["createdAt"].dt.date
    df.set_index("date", inplace=True)
    df.sort_index(inplace=True)

    # Normalize quantity values
    scaler = MinMaxScaler(feature_range=(0, 1))
    df["quantity"] = scaler.fit_transform(df[["quantity"]])

    # Prepare data for LSTM
    sequence_length = 40
    data_x, data_y = [], []
    data_values = df["quantity"].values

    for i in range(len(data_values) - sequence_length):
        data_x.append(data_values[i : i + sequence_length])
        data_y.append(data_values[i + sequence_length])

    data_x, data_y = np.array(data_x), np.array(data_y)
    data_x = np.reshape(data_x, (data_x.shape[0], data_x.shape[1], 1))

    return df, data_x, data_y, scaler


def train_and_predict(data_x, data_y, scaler, sequence_length=40, no_days=100):
    """Trains an LSTM model and predicts future values."""

    # Split data into train & test sets
    train_size = int(len(data_x) * 0.8)
    x_train, x_test = data_x[:train_size], data_x[train_size:]
    y_train, y_test = data_y[:train_size], data_y[train_size:]

    # Build LSTM Model
    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=(sequence_length, 1)),
        LSTM(50, return_sequences=False),
        Dense(25),
        Dense(1)
    ])

    # Compile and train the model
    model.compile(optimizer="adam", loss="mean_squared_error")
    model.fit(x_train, y_train, batch_size=16, epochs=50, validation_data=(x_test, y_test), verbose=1)

    # Predict future values
    future_predictions = []
    last_sequence = data_x[-1].reshape(1, sequence_length, 1)

    for _ in range(no_days):
        next_prediction = model.predict(last_sequence)
        future_predictions.append(next_prediction[0, 0])
        last_sequence = np.roll(last_sequence, -1)
        last_sequence[0, -1, 0] = next_prediction[0, 0]

    future_predictions = scaler.inverse_transform(np.array(future_predictions).reshape(-1,1))

    return future_predictions


def generate_prediction_summary(forecast_df, historical_df):
    """Generates a summary of predictions and trends based on historical data."""
    
    summary = []

    # Identify trend (increasing, decreasing, stable)
    trend = "stable"
    if forecast_df["Predicted Quantity"].iloc[-1] > forecast_df["Predicted Quantity"].iloc[0]:
        trend = "increasing"
    elif forecast_df["Predicted Quantity"].iloc[-1] < forecast_df["Predicted Quantity"].iloc[0]:
        trend = "decreasing"

    summary.append(f"Based on predictions for the next {len(forecast_df)} days, demand is expected to be {trend}.")

    # Compare predictions with historical data
    avg_historical = historical_df["quantity"].mean()
    avg_predicted = forecast_df["Predicted Quantity"].mean()

    if avg_predicted > avg_historical:
        summary.append(f"The predicted daily demand ({avg_predicted:.2f}) is higher than the historical average ({avg_historical:.2f}).")
    elif avg_predicted < avg_historical:
        summary.append(f"The predicted daily demand ({avg_predicted:.2f}) is lower than the historical average ({avg_historical:.2f}).")
    else:
        summary.append(f"The predicted daily demand ({avg_predicted:.2f}) is similar to the historical average ({avg_historical:.2f}).")

    # Detect significant fluctuations
    max_increase = forecast_df["Predicted Quantity"].max() - forecast_df["Predicted Quantity"].min()
    if max_increase > 50:
        summary.append(f"Significant fluctuations detected: variation of {max_increase:.2f} units.")

    # Identify anomalous days
    anomalies = forecast_df[forecast_df["Predicted Quantity"] > 1.5 * avg_predicted]
    if not anomalies.empty:
        summary.append(f"High demand expected on: {', '.join(anomalies['Date'].dt.strftime('%Y-%m-%d'))}.")

    # Provide recommendations
    if trend == "increasing":
        summary.append("Consider increasing resources to handle growing demand.")
    elif trend == "decreasing":
        summary.append("Consider adjusting distribution plans due to reduced demand.")
    else:
        summary.append("Demand is stable. Continue current resource allocation.")

    return "\n".join(summary)


if __name__ == "__main__":
    donations_collection = db_connection()
    df, data_x, data_y, scaler = fetch_and_preprocess_data(donations_collection)
    
    # Train model & predict
    future_predictions = train_and_predict(data_x, data_y, scaler, no_days=100)

    # Create forecast DataFrame
    future_dates = pd.date_range(df.index[-1] + pd.Timedelta(days=1), periods=100)
    forecast_df = pd.DataFrame({"Date": future_dates, "Predicted Quantity": future_predictions.flatten()})

    # Plot results
    plt.figure(figsize=(12, 6))
    sns.lineplot(x=df.index, y=scaler.inverse_transform(df[["quantity"]]).flatten(), label="Historical Quantity")
    sns.lineplot(x=future_dates, y=forecast_df["Predicted Quantity"], label="LSTM Forecast", linestyle="dashed")
    plt.xlabel("Date")
    plt.ylabel("Quantity")
    plt.title("Quantity Prediction using LSTM")
    plt.legend()
    plt.show()

    # Generate and print summary
    forecast_summary = generate_prediction_summary(forecast_df, df)
    print(forecast_summary)
