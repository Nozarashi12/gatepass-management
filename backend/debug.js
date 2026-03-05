const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gatepass');

mongoose.connection.once('open', async () => {
  const User = require('./models/User');
  const user = await User.findOne({ email: 'test@example.com' });

  if (!user) {
    console.log('NO USER FOUND - register first then run this');
    return mongoose.disconnect();
  }

  console.log('Stored hash:', user.password);
  console.log('Salt rounds:', user.password.split('$')[2]);

  const test = await bcrypt.compare('test123', user.password); // ← change this
  console.log('Manual compare result:', test);

  mongoose.disconnect();
});