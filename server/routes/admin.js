// server/routes/admin.js
const express = require('express');
const { approveSlot, rejectSlot } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Admin Middleware
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

router.put('/approve/:id', authMiddleware, adminMiddleware, approveSlot);
router.delete('/reject/:id', authMiddleware, adminMiddleware, rejectSlot);

module.exports = router;
