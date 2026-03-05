const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors());

// ✅ Increased body size limit for base64 profile pictures
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Serve frontend root (index.html, css, js, etc.)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ✅ Serve frontend/pages/ at /pages/
app.use('/pages', express.static(path.join(__dirname, '..', 'frontend', 'pages')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Optional MongoDB connection
try {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gatepass', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.log('MongoDB connection failed, running without database');
    console.log('Error:', err.message);
  });
} catch (error) {
  console.log('MongoDB not available, continuing without database...');
}

// Import routes
const authRoutes = require('./routes/auth');
const { router: apiRoutes, authenticateToken } = require('./routes/api');

// Use routes
app.use('/api/auth', authRoutes);
const passRoutes = require('./routes/passes');
app.use('/api/passes', passRoutes);
app.use('/api', apiRoutes);

// Socket.io for real-time notifications
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('location-update', (data) => {
    socket.broadcast.emit('location-alert', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// API info route
app.get('/api', (req, res) => {
  res.json({
    message: 'Gate Pass Management System API',
    version: '2.0.0',
    features: [
      'Multi-method authentication',
      'QR Code verification',
      'OTP verification',
      'Face recognition',
      'Geolocation tracking',
      'Auto logout',
      'Account lockout',
      'Multi-language support'
    ]
  });
});

// ✅ Catch-all — any unknown route serves index.html
// Must be LAST, after all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend:           http://localhost:${PORT}`);
  console.log(`Student dashboard:  http://localhost:${PORT}/pages/student-dashboard.html`);
  console.log(`Admin dashboard:    http://localhost:${PORT}/pages/admin-dashboard.html`);
});