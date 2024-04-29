const express = require('express');
const router = express.Router();
const answerController = require('../controllers/AnswerContoller');
const questionController = require('../controllers/QuestionController');

router.post('/answers/store', answerController.createAnswer);
router.get('/answers/index', answerController.getAllAnswer);
router.get('/answers', answerController.getAnswersByQuestionId);
router.put('/answer/update', answerController.updateAnswer);

router.post('/question/store', questionController.createNewQuestion);
router.get('/question/index', questionController.getAllQuestion);
router.put('/question/update', questionController.updateQuestion);
router.delete('/question/destroy', questionController.deleteQuestion);

module.exports = router;
