const db = require('../database');

// Model functions
async function create({ accountId, questionText }) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO questions (accountId, questionText) VALUES (?, ?)', [accountId, questionText], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, accountId, questionText });
            }
        });
    });
}

// Other model functions (getQuestion, updateQuestion, deleteQuestion)...

module.exports = {
    create,
    // Export other model functions...
};
