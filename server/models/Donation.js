// const mongoose = require("mongoose");
import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    foodType: { type: String, required: true },
    quantity: { type: Number, required: true },
    expiry: { type: Date, required: true },
    imageURL: { type: String },
    location: { 
        lat: { type: Number, required: true }, 
        lng: { type: Number, required: true } 
    },
    status: { 
        type: String, 
        enum: ["pending", "approved", "rejected", "collected", "requested"], 
        default: "pending" 
    },
    assignedNGO: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    requestedNGO: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    completedNGO: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

const DonationModel = mongoose.model('donations', DonationSchema)

export default DonationModel;