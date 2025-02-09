import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'


const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ messsage: "'Unauthorized: No token provided'" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(decoded.userId)
        if (!user) {
            return res.status(401).json({ messsage: "'user not found'" })
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ messsage: 'Unauthorized: User is not an admin' })
        }
        req.user = user
        next()

    } catch (error) {
        console.log(error)
    }
}

const isNgo = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.role !== 'ngo') {
            return res.status(403).json({ message: "Unauthorized: User is not an NGO" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const isDonor = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.role !== 'donor') {
            return res.status(403).json({ message: "Unauthorized: User is not a Donor" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const isVolunteer = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(decoded.userId)
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        if (user.role !== 'volunteer') {
            return res.status(403).json({ message: "Unauthorized: User is not a Volunteer" })
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const IsUser = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ messsage: "'Unauthorized: No token provided'" })
        }

        const decoded = jwt.verify(token, process.env.JWT_secret)
        const user = await UserModel.findById(decoded.userId)
        if (!user) {
            return res.status(401).json({ messsage: "'user not found'" })
        }


        req.user = user
        next()

    } catch (error) {
        console.log(error)
    }
}


export { isAdmin, IsUser, isNgo, isDonor, isVolunteer }