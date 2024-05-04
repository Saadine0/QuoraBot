const db = require('../database');

// Model functions
async function create({ username, password }) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO accounts (username, password) VALUES (?, ?)', [username, password], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, username, password });
            }
        });
    });
}

// Other model functions (getAccount, updateAccount, deleteAccount)...

module.exports = {
    create,
    // Export other model functions...
};
