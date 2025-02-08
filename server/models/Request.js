import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'donations', required: true },
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // for NGO making the claim
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // if a volunteer is assigned
    requestStatus: { type: String, enum: ['requested', 'approved', 'in-transit', 'completed'], default: 'requested' },
}, { timestamps: true });

const RequestModel = mongoose.model('request', requestSchema);

export default RequestModel;