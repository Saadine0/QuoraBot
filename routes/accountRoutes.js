const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Account routes
router.post('/accounts', accountController.createAccount);
// Define other account routes...

module.exports = router;
