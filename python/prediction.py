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
sns.lineplot(x=future_dates, y=forecast_df["Predicted Quantity"], label=f"LSTM Forecast (Next {noDays} Days)", linestyle="dashed")
plt.xlabel("Date")
plt.ylabel("Quantity")
plt.title("Quantity Prediction using LSTM")
plt.legend()
plt.show()

# Print first 10 predictions
print(forecast_df.head(noDays-40))
