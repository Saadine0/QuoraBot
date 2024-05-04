const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Question routes
router.post('/questions', questionController.createQuestion);
// Define other question routes...

module.exports = router;
