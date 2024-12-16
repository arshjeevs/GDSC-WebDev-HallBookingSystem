// server/models/SlotRequest.js
const mongoose = require('mongoose');

const SlotRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hall: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { type: String, default: 'pending' },  // pending, approved, rejected
});

module.exports = mongoose.model('SlotRequest', SlotRequestSchema);
