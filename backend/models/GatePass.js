const mongoose = require('mongoose');

const gatePassSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentName: { type: String, required: true },
    rollNumber:  { type: String, required: true },
    department:  { type: String, default: '' },
    reason:      { type: String, required: true },
    returnTime:  { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    adminNote:  { type: String, default: '' },
    reviewedBy: { type: String, default: '' },
    reviewedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('GatePass', gatePassSchema);