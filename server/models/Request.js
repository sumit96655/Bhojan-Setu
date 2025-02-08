import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    _id: ObjectId,
    donationId: { type: ObjectId, ref: 'Donation', required: true },
    ngoId: { type: ObjectId, ref: 'User' },  // for NGO making the claim
    volunteerId: { type: ObjectId, ref: 'User' }, // if a volunteer is assigned
    requestStatus: { type: String, enum: ['requested', 'approved', 'in-transit', 'completed'], default: 'requested' },
}
    , { timestamps: true })

const RequestModel = mongoose.model('request', requestSchema)

export default RequestModel;