// server/controllers/slotController.js
const SlotRequest = require('../models/SlotRequest');

// Request a Slot
exports.requestSlot = async (req, res) => {
  try {
    const { hall, date, startTime, endTime } = req.body;
    const existingSlot = await SlotRequest.findOne({
      hall, date, 
      $or: [
        { startTime: { $lte: endTime }, endTime: { $gte: startTime } }
      ]
    });

    if (existingSlot) {
      return res.status(400).json({ error: "Slot overlap detected" });
    }

    const slotRequest = new SlotRequest({
      userId: req.user.userId,
      hall,
      date,
      startTime,
      endTime
    });
    await slotRequest.save();
    res.status(201).json({ message: "Slot request created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View Approved Schedules
exports.getApprovedSchedules = async (req, res) => {
  try {
    const slots = await SlotRequest.find({ status: 'approved' });
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
