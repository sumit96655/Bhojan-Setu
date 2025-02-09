import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    details: { type: String },
}, { timestamps: true });

const LogModel = mongoose.model('logs', logSchema);

export default LogModel;