const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/results', quizController.submitResult);
router.get('/results/:userId', quizController.getUserResults);
router.get('/history/:userId', quizController.getUserHistory);


module.exports = router;
