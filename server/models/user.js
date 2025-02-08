import mongoose from "mongoose";

const userSechmea= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    role:{
        type:String,
        enum:['admin',"user","ngo","donor"],
        default:"user"
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        // required:true
    },
    address:{
        street:String,
        city:String,
        state:String,
        pincode:String,
        coordinates:{lat:Number,lng:Number},
    },
    donor_type:{
        type:String
    }
},{timestamps:true})


const UserModel= mongoose.model('users',userSechmea)

export default UserModel