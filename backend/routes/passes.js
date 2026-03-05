// ─── routes/passes.js ─────────────────────────────────────────────────────────
// Mount in server.js:
//   const passRoutes = require('./routes/passes');
//   app.use('/api/passes', passRoutes);
// ─────────────────────────────────────────────────────────────────────────────

const express = require('express');
const jwt = require('jsonwebtoken');
const GatePass = require('../models/GatePass');
const CheckIn  = require('../models/CheckIn');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// ── Auth middleware ────────────────────────────────────────────────────────────
function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'No token' });
    const token = header.split(' ')[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}

function adminOnly(req, res, next) {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
    next();
}

// ═══════════════════════════════════════════════════════════════════════════════
//  GATE PASS ROUTES
//  IMPORTANT: specific static routes (/my, /all, /notifications, /checkin/*)
//  must come BEFORE the wildcard /:id/review route
// ═══════════════════════════════════════════════════════════════════════════════

// POST /api/passes/request  — student submits a new gate pass request
router.post('/request', auth, async (req, res) => {
    try {
        const { reason, returnTime, studentName, rollNumber, department } = req.body;
        if (!reason || !returnTime) {
            return res.status(400).json({ error: 'Reason and return time are required' });
        }
        const pass = new GatePass({
            student:     req.user.userId,
            studentName: studentName || 'Unknown',
            rollNumber:  rollNumber  || '',
            department:  department  || '',
            reason,
            returnTime,
            status: 'pending'
        });
        await pass.save();
        res.status(201).json({ message: 'Request submitted', pass });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit request: ' + err.message });
    }
});

// GET /api/passes/my  — student sees their own requests
router.get('/my', auth, async (req, res) => {
    try {
        const passes = await GatePass.find({ student: req.user.userId })
            .sort({ createdAt: -1 });
        res.json({ passes });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch passes' });
    }
});

// GET /api/passes/all  — admin sees all requests
router.get('/all', auth, adminOnly, async (req, res) => {
    try {
        const passes = await GatePass.find()
            .sort({ createdAt: -1 });
        res.json({ passes });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch passes' });
    }
});

// GET /api/passes/notifications/:studentId  — reviewed passes for a student
router.get('/notifications/:studentId', auth, async (req, res) => {
    try {
        const passes = await GatePass.find({
            student: req.params.studentId,
            status: { $in: ['approved', 'rejected'] }
        }).sort({ reviewedAt: -1 }).limit(10);
        res.json({ passes });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// ── Check-in routes — all static, must come before /:id ──────────────────────

// POST /api/passes/checkin
router.post('/checkin', auth, async (req, res) => {
    try {
        const { studentName, rollNumber, department, latitude, longitude, checkInPhoto } = req.body;
        const existing = await CheckIn.findOne({ student: req.user.userId, isCheckedIn: true });
        if (existing) {
            return res.status(400).json({ error: 'Already checked in' });
        }
        const record = new CheckIn({
            student:      req.user.userId,
            studentName:  studentName  || 'Unknown',
            rollNumber:   rollNumber   || '',
            department:   department   || '',
            checkInTime:  new Date(),
            isCheckedIn:  true,
            location:     { latitude, longitude },
            checkInPhoto: checkInPhoto || ''
        });
        await record.save();
        res.status(201).json({ message: 'Checked in successfully', record });
    } catch (err) {
        res.status(500).json({ error: 'Check-in failed: ' + err.message });
    }
});

// POST /api/passes/checkout
router.post('/checkout', auth, async (req, res) => {
    try {
        const { reason, latitude, longitude } = req.body;
        const record = await CheckIn.findOne({ student: req.user.userId, isCheckedIn: true });
        if (!record) {
            return res.status(400).json({ error: 'Not currently checked in' });
        }
        record.checkOutTime   = new Date();
        record.isCheckedIn    = false;
        record.checkOutReason = reason || 'manual';
        if (latitude && longitude) {
            record.location = { latitude, longitude };
        }
        await record.save();
        res.json({ message: 'Checked out successfully', record });
    } catch (err) {
        res.status(500).json({ error: 'Check-out failed: ' + err.message });
    }
});

// GET /api/passes/checkin/status
router.get('/checkin/status', auth, async (req, res) => {
    try {
        const record = await CheckIn.findOne({ student: req.user.userId, isCheckedIn: true });
        res.json({ isCheckedIn: !!record, record: record || null });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get status' });
    }
});

// GET /api/passes/checkin/history
router.get('/checkin/history', auth, async (req, res) => {
    try {
        const records = await CheckIn.find({ student: req.user.userId })
            .sort({ createdAt: -1 }).limit(30);
        res.json({ records });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// GET /api/passes/checkin/all
router.get('/checkin/all', auth, adminOnly, async (req, res) => {
    try {
        const records = await CheckIn.find()
            .sort({ createdAt: -1 }).limit(100);
        res.json({ records });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

// ── Wildcard route — MUST be last to avoid swallowing static routes above ─────

// PATCH /api/passes/:id/review  — admin approves or rejects
router.patch('/:id/review', auth, adminOnly, async (req, res) => {
    try {
        const { status, adminNote, reviewedBy } = req.body;
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Status must be approved or rejected' });
        }
        const pass = await GatePass.findByIdAndUpdate(
            req.params.id,
            {
                status,
                adminNote:  adminNote  || '',
                reviewedBy: reviewedBy || 'Admin',
                reviewedAt: new Date()
            },
            { new: true }
        );
        if (!pass) return res.status(404).json({ error: 'Pass not found' });
        res.json({ message: 'Pass ' + status, pass });
    } catch (err) {
        res.status(500).json({ error: 'Failed to review pass: ' + err.message });
    }
});

module.exports = router;