from flask import Flask, request, jsonify
from pymongo import MongoClient
from geopy.distance import geodesic
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

# 🎯 Initialize Flask App
app = Flask(__name__)


# 🔗 Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["test"]

donors_collection = db["donors"]
ngos_collection = db["ngos"]
#accepted_donations_collection = db["accepted_donations"]

# 🧠 Enhanced AI-Based Matching Algorithm (with bug fix)
def find_suitable_ngos(donor):
    donor_coords = (donor["latitude"], donor["longitude"])
    donor_items = donor["donate_items_info"]
    
    ngos = list(ngos_collection.find())  # Fetch all NGOs
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

        # 🏆 Scoring System
        score = 0

        # 📌 Distance-Based Scoring
        if distance_km <= 10:
            score += 40
        elif 10 < distance_km <= 25:
            score += 30
        else:
            score += 10

        # ⏳ Shelf Life Consideration (Bug Fix Applied)
        def extract_shelf_life(item):
            """Extracts shelf life as an integer, handling both string and integer cases."""
            if isinstance(item["shelf_life"], int):
                return item["shelf_life"]
            elif isinstance(item["shelf_life"], str):
                return int(item["shelf_life"].split()[0])  # Extract numeric part from "3 days"
            return 0  # Default to 0 if format is unexpected

        max_shelf_life = max(extract_shelf_life(item) for item in donor_items)

        if max_shelf_life <= 1:
            score += 30
        elif max_shelf_life <= 3:
            score += 20
        else:
            score += 10

        # 🍲 Food Type Compatibility
        preferred_food_types = ["cooked", "raw", "fruits"]
        matching_foods = [item["food"] for item in donor_items if item["food"].lower() in preferred_food_types]
        if matching_foods:
            score += 20
        
        ngo_data["score"] = score
        matched_ngos.append(ngo_data)

    # Sort NGOs by highest score
    matched_ngos = sorted(matched_ngos, key=lambda x: x["score"], reverse=True)

    return {
        "matched_ngos": matched_ngos[:5]  # Return top 5 matches
    }


# 📌 API Route to Accept Donor Data & Find NGOs
@app.route("/donate", methods=["POST"])
def donate_food():
    data = request.json
    data["date"] = datetime.utcnow().isoformat()   # Store request time

    # Insert donor data into MongoDB
    donor_id = donors_collection.insert_one(data).inserted_id

    # 🔍 AI Search for Suitable NGOs
    matched_ngos = find_suitable_ngos(data)

    return jsonify({
        "message": "Donation request received!",
        "donor_id": str(donor_id),
        "matched_ngos": matched_ngos
    })

# 🔥 Run Flask App
if __name__ == "__main__":
    app.run(debug=True)
