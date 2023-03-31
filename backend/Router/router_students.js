const express = require('express');
const app = express.Router();

const students = require('./Module_students/students')

app.get('/', students.get_student)
app.post('/add-student', students.addStudent)
app.post('/add-student-excel', students.addStudentExcel)

app.post('/send-test-code', students.send_test_code)

app.post('/student-point', students.student_point)

app.get('/interest', students.getInterest)

app.get('/job-knowlage', students.jobknowlage)
app.get('/job-task', students.jobtask)
  

app.get('/job-activities', students.jobactivities)
app.get('/job-skill', students.jobskill)
app.get('/job-abilitie', students.jobabilitie)

app.get('/report1', students.getReport1)


app.get('/report', students.getStudentReport)
app.get('/report4', students.getStudentReport4)

// app.delete('/delete-admin/:id', admins.deleteAdmin)


module.exports = app