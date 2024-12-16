// server/routes/slots.js
const express = require('express');
const { requestSlot, getApprovedSchedules } = require('../controllers/slotController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/request', authMiddleware, requestSlot);
router.get('/approved', getApprovedSchedules);

module.exports = router;
