const { where } = require('sequelize');
const Answer = require('../models/answer');
const Question = require('../models/question');

class AnswerController {
        async createAnswer(req, res) {
                try {
                        const { questionDescription, answerText } = req.body;

                        // Create a new question with the provided description
                        const question = await Question.create({ description: questionDescription });

                        // Create a new answer associated with the created question and the provided answer text
                        const answer = await Answer.create({ text: answerText, questionId: question.id });

                        res.status(200).json({ answer, question });

                } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Internal server error' });
                }
        }

        async getAllAnswer(req, res) {
                try {
                        const answers = await Answer.findAll({
                                include: Question
                        });

                        //! Format the response data
                        const formattedAnswers = answers.map(answer => ({
                                id: answer.id,
                                answer: answer.text,
                                question: answer.Question ? answer.Question.description : null
                        }));

                        res.status(200).json(formattedAnswers);
                } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Internal server error' });
                }
        }

        async getAnswersByQuestionId(req, res) {
                try {
                        const { questionId } = req.query;
                        if (!questionId) {
                                return res.status(400).json({ message: "QuestionId parameter is required" });
                        }
                        const answers = await Answer.findAll({ where: { questionId: questionId } });
                        if (!answers || answers.length === 0) {
                                return res.status(200).json({ message: "No answers found for the provided QuestionId" });
                        }
                        res.status(200).json(answers);
                } catch (error) {
                        res.status(500).json({ message: 'internal server error' });
                }
        }

        async updateAnswer(req, res) {
                try {
                        const { id, text } = req.body;
                        const updareAnswer = await Answer.update({ text }, { where: { id: questionId } })
                        return res.status(200).json({
                                status: 'success',
                                message: 'is answer is updated'
                        });
                } catch (e) {
                        res.status(500).json({ message: 'internal server error' });
                }
        }
}

module.exports = new AnswerController();
