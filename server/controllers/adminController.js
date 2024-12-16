// server/controllers/adminController.js
const SlotRequest = require('../models/SlotRequest');

// Approve Slot Request
exports.approveSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const slotRequest = await SlotRequest.findById(id);
    if (!slotRequest) return res.status(404).json({ error: "Request not found" });

    slotRequest.status = 'approved';
    await slotRequest.save();
    res.status(200).json({ message: "Slot request approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject Slot Request
exports.rejectSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const slotRequest = await SlotRequest.findById(id);
    if (!slotRequest) return res.status(404).json({ error: "Request not found" });

    slotRequest.status = 'rejected';
    await slotRequest.save();
    res.status(200).json({ message: "Slot request rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
