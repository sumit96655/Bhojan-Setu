import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',  
        required: true
    },
    
    availability: {
        type: Boolean,
        default: true
    },
    
    assignedDonations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'donations'  
    }],
    
    currentLocation: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null }
    },
    // Rating system
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    // Number of completed trips
    totalTrips: {
        type: Number,
        default: 0
    }
}, { timestamps: true });  

const VolunteerModel = mongoose.model('volunteers', volunteerSchema);

export default VolunteerModel; 