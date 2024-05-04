const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('database/database.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = db;
