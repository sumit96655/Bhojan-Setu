import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    _id: ObjectId,
    action: { type: String, required: true },
    performedBy: { type: ObjectId, ref: 'User', required: true },
    details: { type: String },
}
    , { timestamps: true })

const LogModel = mongoose.model('logs', logSchema)

export default LogModel;