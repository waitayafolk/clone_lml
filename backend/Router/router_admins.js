const express = require('express');
const app = express.Router();

const admin = require('./Module_admin/admin')

app.get('/', admin.getAdmin)
app.post('/save-admin', admin.saveAdmin)
app.get('/company', admin.getCompany)
app.post('/save-setting', admin.saveSetting)
app.delete('/:id', admin.deleteAdmin)

// app.delete('/delete-admin/:id', admins.deleteAdmin)


module.exports = app