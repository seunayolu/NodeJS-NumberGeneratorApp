const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  codes: { type: [String], default: [] }
});

// Define the model and specify the collection name
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;