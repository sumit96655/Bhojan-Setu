import mongoose from 'mongoose'

const AuditLogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    action: { type: String, required: true },
    details: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }
}, { timestamps: true })

const AuditLogModel = mongoose.model('AuditLog', AuditLogSchema)
export default AuditLogModel 