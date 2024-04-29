const Answer = require('../models/answer');
const Question = require('../models/question');

class QuestionController {

        async getAllQuestion(req, res) {
                try {
                        const question = await Question.findAll();;
                        res.status(200).json(question);
                }
                catch (e) {
                        res.status(500).json({ message: 'intenal server error' });
                }
        }

        async createNewQuestion(req, res) {
                try {
                        const { text } = req.body;
                        const question = await Question.create({ text });
                        res.status(200).json(question);
                } catch (e) {
                        res.status(500).json({ message: 'intenal server error' });
                }
        }

        async updateQuestion(req, res) {
                try {
                        const { id, text } = req.body;
                        const updatedQuestion = await Question.update({ text }, { where: { id: id } });
                        return res.status(200).json({ status: 'success', message: 'the questions is updated' });
                } catch (e) {
                        res.status(500).json({ message: 'intenal server error' });
                }
        }

        async deleteQuestion(req, res) {
                try {
                        const { id } = req.query;
                        if (!id) {
                                return res.status(400).json({ message: 'the question not founded' });
                        } else {
                                const question = await Question.destroy({ where: { id: id } })
                                const answer = await Answer.destroy({ where: { id: id } })
                                res.status(200).json({ status: 'success', message: 'the question is deleted' })
                        }
                } catch (e) {
                        res.status(500).json({ message: 'intenal server error' });
                }
        }
}

module.exports = new QuestionController();