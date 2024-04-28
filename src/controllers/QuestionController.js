const Question = require('../models/question');

class QuestionController {

        async createNewQuestion(req, res) {
                try {
                        const { text } = req.body;
                        const question = await Question.create({ text });
                        res.status(200).json(question);
                } catch (e) {
                        res.status(500).json({ message: 'internal error ' });
                }
        }

        async getAllQuestion(req, res) {
                try {
                        const question = await Question.findAll();;
                        res.status(200).json(question);
                }
                catch (e) {
                        res.status(500).json({ message: 'internal error' });
                }
        }
}

module.exports = new QuestionController();
// module.exports = new AnswerController();