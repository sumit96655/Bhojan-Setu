import mongoose from "mongoose";

const ngoSchema= new mongoose.Schema({
    _id: ObjectId,
    userId: { type: ObjectId, ref: 'User', required: true },
    registrationNumber: { type: String, required: true },
    verified: { type: Boolean, default: false },
    ngoAddress: { type: String },
    contactPerson: { type: String },
    additionalInfo: { type: String },
  }
  ,{timestamps:true})

const ngoModel= mongoose.model('NgoDetails',ngoSchema)

export default ngoModel