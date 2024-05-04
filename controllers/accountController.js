const Account = require('../models/accountModel');

// Controller functions
async function createAccount(req, res) {
    try {
        const { username, password } = req.body;
        const newAccount = await Account.create({ username, password });
        res.status(201).json(newAccount);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Other controller functions (getAccount, updateAccount, deleteAccount)...

module.exports = {
    createAccount,
    // Export other controller functions...
};
