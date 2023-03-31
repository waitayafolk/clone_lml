const express = require('express');
const app = express.Router();

const quiz = require('./Module_quiz/quiz')

app.get('/quiz1', quiz.get_quiz1)
app.get('/quiz2', quiz.get_quiz2)
app.get('/quiz3', quiz.get_quiz3)
app.get('/quiz4', quiz.get_quiz4)
app.get('/quiz-group', quiz.get_group)
app.get('/quiz-group10', quiz.get_group10)

app.get('/quiz-group-detail/:id', quiz.get_group_detail)
app.get('/quiz-strong-point', quiz.get_strong_point)

app.post('/save-quiz-detail', quiz.save_quiz_detail)
app.post('/save-quiz-detail10', quiz.save_quiz_detail10)

app.get('/list', quiz.getList)

app.post('/send_answer', quiz.sendAnswer)
app.post('/send_answer_2', quiz.sendAnswer2)
app.post('/send_answer_3', quiz.sendAnswer3)
app.post('/send_answer_4', quiz.sendAnswer4)

app.get('/get-str', quiz.getStr)
app.get('/get-raisec', quiz.getRaisec)

// app.post('/save-admin', admins.saveAdmin)
// app.delete('/delete-admin/:id', admins.deleteAdmin)


module.exports = app