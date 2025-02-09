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

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["test"]
donations_collection = db["donations"]

# Fetch records from MongoDB
data = list(donations_collection.find({}, {"_id": 0, "createdAt": 1, "quantity": 1}))

# Convert to DataFrame
df = pd.DataFrame(data)

# Convert createdAt to datetime and sort by date
df["createdAt"] = pd.to_datetime(df["createdAt"])
df["date"] = df["createdAt"].dt.date
df.set_index("date", inplace=True)
df.sort_index(inplace=True)

# Normalize quantity values
scaler = MinMaxScaler(feature_range=(0, 1))
df["quantity"] = scaler.fit_transform(df[["quantity"]])

print(df.shape)
print(df["quantity"].shape)

# Prepare data for LSTM
sequence_length = 40  # Use last 40 days to predict the next day
data_x, data_y = [], []
data_values = df["quantity"].values

for i in range(len(data_values) - sequence_length):
    data_x.append(data_values[i : i + sequence_length])
    data_y.append(data_values[i + sequence_length])

data_x, data_y = np.array(data_x), np.array(data_y)
data_x = np.reshape(data_x, (data_x.shape[0], data_x.shape[1], 1))  # Reshape for LSTM

# Split into train & test sets (80-20 split)
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

# Compile Model
model.compile(optimizer="adam", loss="mean_squared_error")

# Train Model
model.fit(x_train, y_train, batch_size=16, epochs=50, validation_data=(x_test, y_test), verbose=1)

# Predict future n days
future_predictions = []
last_sequence = data_values[-sequence_length:].reshape(1, sequence_length, 1)
noDays=100

for _ in range(noDays):
    next_prediction = model.predict(last_sequence)
    future_predictions.append(next_prediction[0, 0])
    last_sequence = np.roll(last_sequence, -1)
    last_sequence[0, -1, 0] = next_prediction[0, 0]

# Convert predictions back to original scale
future_predictions = scaler.inverse_transform(np.array(future_predictions).reshape(-1,1))

print(np.array(future_predictions).shape)

# Create prediction dates
future_dates = pd.date_range(df.index[-1] + pd.Timedelta(days=1), periods=noDays)
forecast_df = pd.DataFrame({"Date": future_dates, "Predicted Quantity": future_predictions.flatten()})

# Plot results
plt.figure(figsize=(12, 6))
sns.lineplot(x=df.index, y=scaler.inverse_transform(df[["quantity"]]).flatten(), label="Historical Quantity")
sns.lineplot(x=future_dates, y=forecast_df["Predicted Quantity"], label=f"LSTM Forecast (Next {noDays-40} Days)", linestyle="dashed")
plt.xlabel("Date")
plt.ylabel("Quantity")
plt.title("Quantity Prediction using LSTM")
plt.legend()
plt.show()

# Print first 10 predictions
print(forecast_df.head(noDays-40))

# Fetch historical data from MongoDB
historical_data = list(donations_collection.find({}, {"_id": 0, "createdAt": 1, "quantity": 1}))

# Convert to DataFrame
df = pd.DataFrame(historical_data)

# Convert 'createdAt' to datetime and sort by date
df["createdAt"] = pd.to_datetime(df["createdAt"])
df["date"] = df["createdAt"].dt.date
df.set_index("date", inplace=True)
df.sort_index(inplace=True)

# Normalize quantity values
scaler = MinMaxScaler(feature_range=(0, 1))
df["quantity"] = scaler.fit_transform(df[["quantity"]])


def generate_prediction_summary(forecast_df, historical_data):
    summary = []
    
    # Analyze the trend in predictions (increasing, decreasing, or stable)
    trend = "stable"
    if forecast_df["Predicted Quantity"].iloc[-1] > forecast_df["Predicted Quantity"].iloc[0]:
        trend = "increasing"
    elif forecast_df["Predicted Quantity"].iloc[-1] < forecast_df["Predicted Quantity"].iloc[0]:
        trend = "decreasing"
    
    # First, summarize the overall trend
    summary.append(f"Based on the predictions for the next {len(forecast_df)} days, the demand for food is expected to be {trend}.")
    
    # Compare predictions with historical data (optional: compare to last month's average)
    avg_historical_quantity = historical_data["quantity"].mean()
    avg_predicted_quantity = forecast_df["Predicted Quantity"].mean()
    
    if avg_predicted_quantity > avg_historical_quantity:
        summary.append(f"The predicted average demand of {avg_predicted_quantity:.2f} units per day is higher than the historical average of {avg_historical_quantity:.2f} units per day.")
    elif avg_predicted_quantity < avg_historical_quantity:
        summary.append(f"The predicted average demand of {avg_predicted_quantity:.2f} units per day is lower than the historical average of {avg_historical_quantity:.2f} units per day.")
    else:
        summary.append(f"The predicted average demand of {avg_predicted_quantity:.2f} units per day is similar to the historical average of {avg_historical_quantity:.2f} units per day.")
    
    # Detect any significant fluctuations (e.g., sudden increases)
    max_increase = forecast_df["Predicted Quantity"].max() - forecast_df["Predicted Quantity"].min()
    if max_increase > 50:  # Arbitrary threshold, you can adjust it as needed
        summary.append(f"There's a significant fluctuation in predicted demand, with a variation of {max_increase:.2f} units between the highest and lowest predicted values.")
    
    # Mention any anomalous days (if applicable, based on prediction)
    anomalies = forecast_df[forecast_df["Predicted Quantity"] > 1.5 * avg_predicted_quantity]  # Example anomaly condition
    if not anomalies.empty:
        summary.append(f"Attention: The following days have unusually high predicted demand: {', '.join(anomalies['Date'].dt.strftime('%Y-%m-%d'))}.")
    
    # Provide an overall actionable recommendation
    if trend == "increasing":
        summary.append(f"Since the predicted demand is expected to increase, it is recommended to prepare additional resources to handle the growing need.")
    elif trend == "decreasing":
        summary.append(f"Since the predicted demand is expected to decrease, you might consider adjusting your food distribution plans accordingly.")
    else:
        summary.append(f"As the demand is stable, it is advisable to continue with current resource allocation.")
    
    # Return the summarized output
    return "\n".join(summary)

# Example of how to call the function with the forecast_df (predictions for next days) and historical data
forecast_summary = generate_prediction_summary(forecast_df, df)
print(forecast_summary)
