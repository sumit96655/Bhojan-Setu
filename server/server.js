import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import DbCon from './utlis/db.js'
import AuthRoutes from './routes/Auth.js'
import AdminRoutes from './routes/AdminRoutes.js'
import donationRoutes from './routes/donationRoutes.js'
import ngoRoutes from './routes/ngoRoutes.js'
import logRoutes from './routes/logRoutes.js'
import volunteerRoutes from './routes/volunteerRoutes.js';
import UserModel from './models/user.js'
import mongoose from 'mongoose'


dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

// mongo db 
DbCon()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// Register User model if not already registered
try {
    mongoose.model('User')
} catch (error) {
    mongoose.model('User', UserModel.schema)
}

app.use('/api/auth', AuthRoutes)
app.use('/api/admin', AdminRoutes)
app.use("/api/donations", donationRoutes)
app.use("/api/ngo", ngoRoutes)
app.use('/api/logs', logRoutes);
app.use('/api/volunteer', volunteerRoutes);


app.get('/', (req, res) => {
    res.send('test')
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})





