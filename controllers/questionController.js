const Question = require('../models/questionModel');

// Controller functions
async function createQuestion(req, res) {
    try {
        const { accountId, questionText } = req.body;
        const newQuestion = await Question.create({ accountId, questionText });
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Other controller functions (getQuestion, updateQuestion, deleteQuestion)...

module.exports = {
    createQuestion,
    // Export other controller functions...
};
