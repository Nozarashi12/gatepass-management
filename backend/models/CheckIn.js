const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentName: { type: String, required: true },
    rollNumber:  { type: String, required: true },
    department:  { type: String, default: '' },
    checkInTime:  { type: Date },
    checkOutTime: { type: Date },
    checkOutReason: {
        type: String,
        enum: ['manual', 'geofence', 'auto-end-of-day'],
        default: 'manual'
    },
    location: {
        latitude:  { type: Number },
        longitude: { type: Number }
    },
    isCheckedIn: { type: Boolean, default: false },
    checkInPhoto:  { type: String, default: '' },
    checkOutPhoto: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('CheckIn', checkInSchema);