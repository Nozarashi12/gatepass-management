const express = require('express');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const mongoose = require('mongoose');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function isMongoConnected() {
    return mongoose.connection.readyState === 1;
}

// ─── Register ─────────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
    try {
        const { name, rollNumber, email, password, phone, department, year, role, profilePicture } = req.body;

        if (!name || !rollNumber || !email || !password || !phone || !department || !year) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (parseInt(year) < 2026) {
            return res.status(400).json({ error: 'Year must be 2026 or above' });
        }

        // Check duplicates
        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ error: 'Email already registered' });

        const existingRoll = await User.findOne({ rollNumber });
        if (existingRoll) return res.status(400).json({ error: 'Roll number already registered' });

        // Auto-generate passId
        const passId = 'GP' + Date.now().toString().slice(-6);

        const user = new User({
            name,
            rollNumber,
            passId,
            email,
            password,           // pre('save') hook hashes this
            phone,
            department,
            year: parseInt(year),
            role: role || 'student',
            profilePicture: profilePicture || '',
            authenticationMethods: {
                password: true, qrCode: false, otp: false, faceRecognition: false
            },
            loginAttempts: 0,
            lockUntil: null,
            isActive: true
        });

        await user.save();

        console.log('✅ New user registered:', name, '| Roll:', rollNumber, '| PassID:', passId);

        res.status(201).json({
            message: 'Registration successful',
            passId: user.passId,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                rollNumber: user.rollNumber,
                department: user.department,
                year: user.year,
                email: user.email,
                phone: user.phone,
                passId: user.passId,
                profilePicture: user.profilePicture || '',
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed: ' + error.message });
    }
});

// ─── Login ────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ error: 'Identifier and password are required' });
        }

        const cleanIdentifier = identifier.trim();
        const cleanPassword = password.trim();

        // ── Hardcoded admin shortcut ──
        if (cleanIdentifier === 'admin' && cleanPassword === 'admin123') {
            const token = jwt.sign(
                { userId: 'admin', role: 'admin' },
                JWT_SECRET,
                { expiresIn: '8h' }
            );
            return res.json({
                message: 'Login successful',
                token,
                user: {
                    _id: 'admin',
                    name: 'Administrator',
                    role: 'admin',
                    rollNumber: 'ADMIN',
                    department: 'Administration',
                    year: 2026,
                    email: 'admin@gatepass.com',
                    phone: '',
                    passId: 'ADMIN',
                    profilePicture: '',
                    createdAt: new Date().toISOString()
                }
            });
        }

        // ── Find user by roll, email or passId ──
        const user = await User.findOne({
            $or: [
                { rollNumber: cleanIdentifier },
                { email: cleanIdentifier },
                { passId: cleanIdentifier }
            ]
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if account is locked
        if (user.lockUntil && user.lockUntil > Date.now()) {
            const remaining = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
            return res.status(401).json({
                error: 'Account locked. Try again in ' + remaining + ' minute(s).'
            });
        }

        const isMatch = await user.comparePassword(cleanPassword);
        console.log('Login attempt:', cleanIdentifier, '| Match:', isMatch);
        console.log('🔍 Identifier:', cleanIdentifier);
console.log('🔍 User found:', user ? user.email + ' | role: ' + user.role : 'NOT FOUND');
console.log('🔍 Password match:', isMatch);

        if (!isMatch) {
            // Increment attempts in DB
            await user.incLoginAttempts();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // ── Success — reset attempts ──
        await User.updateOne(
            { _id: user._id },
            { $set: { loginAttempts: 0, lockUntil: null, lastLogin: new Date() } }
        );

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        console.log('✅ Login successful:', user.name);

        res.json({
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                rollNumber: user.rollNumber,
                department: user.department,
                year: user.year,
                email: user.email,
                phone: user.phone,
                passId: user.passId,
                profilePicture: user.profilePicture || '',
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// ─── Generate QR ──────────────────────────────────────────────────────────────
router.post('/generate-qr', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const qrData = JSON.stringify({
            userId: user._id,
            name: user.name,
            roll: user.rollNumber,
            passId: user.passId,
            timestamp: new Date().toISOString()
        });
        const qrCodeUrl = await qrcode.toDataURL(qrData);
        res.json({ message: 'QR Code generated', qrCode: qrCodeUrl });
    } catch (error) {
        res.status(500).json({ error: 'QR Code generation failed' });
    }
});

// ─── Send OTP ─────────────────────────────────────────────────────────────────
router.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const otp = speakeasy.totp({
            secret: process.env.OTP_SECRET || 'otp-secret-key',
            encoding: 'base32'
        });
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code - Gate Pass System',
            text: 'Your OTP code is: ' + otp + '\n\nValid for 5 minutes.'
        });
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'OTP sending failed' });
    }
});

// ─── Forgot Password ──────────────────────────────────────────────────────────
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'No account found with that email' });

        const resetToken = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const resetLink = 'http://localhost:5000/reset-password.html?token=' + resetToken;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || '',
                pass: process.env.EMAIL_PASS || ''
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER || 'noreply@gatepass.com',
            to: email,
            subject: 'Password Reset - Gate Pass System',
            html: `
                <div style="max-width:600px;margin:0 auto;padding:20px;font-family:Arial,sans-serif;">
                    <h2 style="color:#1a1a2e;">Password Reset Request</h2>
                    <p>Hello <strong>${user.name}</strong>,</p>
                    <p>Click the button below to reset your password:</p>
                    <a href="${resetLink}"
                        style="background:#0f3460;color:white;padding:12px 24px;
                        text-decoration:none;border-radius:8px;display:inline-block;margin:16px 0;">
                        Reset Password
                    </a>
                    <p>Or copy this link: <code>${resetLink}</code></p>
                    <p><strong>This link expires in 1 hour.</strong></p>
                    <p>If you did not request this, ignore this email.</p>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('✅ Reset email sent to:', email);
            res.json({ message: 'Password reset email sent successfully' });
        } catch (emailError) {
            console.error('Email error:', emailError.message);
            // Dev fallback — return token directly
            res.json({
                message: 'Email not configured. Use this token for testing.',
                resetToken,
                note: 'Development mode — configure EMAIL_USER and EMAIL_PASS in .env for real emails'
            });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Password reset failed' });
    }
});

// ─── Reset Password ───────────────────────────────────────────────────────────
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (jwtError) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.password = newPassword; // pre('save') hook hashes it
        await user.save();

        console.log('\x1b[32m%s\x1b[0m', '✅ Password reset successful for: ' + user.email);
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Password reset failed' });
    }
});

module.exports = router;