const express = require('express');
const router = express.Router();
const answerController = require('../controllers/AnswerContoller');
const questionController = require('../controllers/QuestionController');

router.post('/answers/store', answerController.createAnswer);
router.get('/answers/index', answerController.getAllAnswer);
router.get('/answers', answerController.getAnswersByQuestionId);

router.post('/question/store', questionController.createNewQuestion);
router.get('/question/.index', questionController.getAllQuestion);

module.exports = router;
