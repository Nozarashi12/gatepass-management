const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const u = await User.findOne({ email: 'adithyan.p@kalvium.commuity' });
    if (!u) { console.log('❌ USER NOT FOUND'); mongoose.disconnect(); return; }
    
    console.log('📧 Email:', u.email);
    console.log('🔑 Hash:', u.password);
    console.log('✅ Test match "Admin@123":', await u.comparePassword('Admin@123'));
    console.log('🔒 Locked?', u.isLocked());
    console.log('👤 Role:', u.role);
    
    mongoose.disconnect();
});