const express = require('express');
const db = require('./database/database');
const accountModule = require('./modules/account');
const questionModule = require('./modules/question');

const app = express();

// Initialize routes
// Example:
app.post('/accounts', async (req, res) => {
    try {
        const { username, password } = req.body;
        const accountId = await accountModule.addAccount(username, password);
        res.json({ accountId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
