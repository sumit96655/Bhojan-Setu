import LogModel from '../models/Log.js';
import mongoose from 'mongoose';


const createLog = async (req, res) => {
    try {
        const { action, details } = req.body;

        const newLog = new LogModel({
            action,
            performedBy: req.user._id, 
            details
        });

        await newLog.save();

        res.status(201).json({
            success: true,
            message: "Log created successfully",
            log: newLog
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getLogs = async (req, res) => {
    try {
        const { startDate, endDate, action } = req.query;

        let query = {};

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        if (action) {
            query.action = action;
        }

        const logs = await LogModel.find(query)
            .populate('performedBy', 'name email role')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            logs
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getUserLogs = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to view these logs" });
        }

        const logs = await LogModel.find({ performedBy: userId })
            .populate('performedBy', 'name email role')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            logs
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export {
    createLog,
    getLogs,
    getUserLogs
};
