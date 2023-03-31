var db = require("../../Connect/db_connect");
const nodemailer = require('nodemailer');
const fs = require('fs');

exports.send_test_code = async (req, res) => {
    try{
        // learnolife@ondemand.in.th yxkkudxaakimeckr
        const transporter = nodemailer.createTransport({
            auth: {
                user: 'learnolifeteam@gmail.com',
                pass: 'yxkkudxaakimeckr',
            },
            service : 'gmail'
        });

        transporter.sendMail({
            from: '"Your Name" learnolifeteam@gmail.com', 
            to: req.body.email,
            subject: "Subject : รหัสเข้าทำแบบทดสอบ LOL 360 ค้นหาตัวเองรอบด้าน สู่การตัดสินใจอาชีพที่ใช่", 
            text: `แบบทดสอบค้นหาอาชีพ LOL360 แบบทดสอบนี้จะแบ่งออกเป็น 4 ส่วนด้วยกัน`, 
            html: `
                    <div> แบบทดสอบค้นหาอาชีพ LOL360 แบบทดสอบนี้จะแบ่งออกเป็น 4 ส่วนด้วยกัน </div>
                    <div> -  ค้นหาสิ่งที่ชอบ และความสนใจ </div>
                    <div> -  ค้นหาจุดแข็งที่ซ่อนอยู่ </div>
                    <div> -  ค้นหาสิ่งที่อยากทำ </div>
                    <div> -  ค้นหาสิ่งที่ต้องการจากงาน </div>
                    <div> คำแนะนำ : เนื่องจากต้องใช้เวลาในการทำแบบทดสอบประมาณ 45 นาที ดังนั้นควรหาเวลาที่ท่านสะดวก และทำแบบ </div>
                    <div> ทดสอบในสถานที่ที่ไม่มีสิ่งรบกวน เพื่อให้ท่านสามารถใช้เวลาอยู่กับตัวเอง และตอบคำถามตรงกับตัวเองมากที่สุด </div>
                    <div> ลิงค์สำหรับทำข้อสอบ <a href="http://202.183.198.245:3388/student-login"> http://202.183.198.245:3388/student-login </a> </div>
                    <div> รหัส (Test Code) เข้าทำแบบทดสอบ : <ins> ${req.body.username} </ins> </div>
                    <div> หากมีข้อสงสัย สามารถสอบถามเพิ่มเติม ได้ที่ </div>
                    <div> Line: @Learnolife </div>
                    <div> ขอบคุณค่ะ </div>
                    <div> Learn O Life </div>
                    `, 
        }).then(info => {
            db.query(`UPDATE tb_student SET send_test_code = true WHERE id = $1`,  [req.body.id] , (err, result) => {
                if (err) {
                    throw Error(err);
                }
                res.status(200).json({
                    status : "success",
                    message : "Success full",
                });
            });

            
        }).catch(console.error);

    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.get_student = async (req, res) => {
    try{
        db.query(`SELECT tb_student.* , tb_answer_1.total_score AS score_1 
                    ,(SELECT tb_answer_2.total_score FROM tb_answer_2 WHERE tb_answer_2.student_id = tb_student.id AND tb_answer_2.quiz_id = 2 AND tb_answer_2.status != 'delete')  AS score_2
                    ,(SELECT tb_answer_3.total_score FROM tb_answer_3 WHERE tb_answer_3.student_id = tb_student.id AND tb_answer_3.quiz_id = 3 AND tb_answer_3.status != 'delete')  AS score_3
                    ,(SELECT tb_answer_4.total_score FROM tb_answer_4 WHERE tb_answer_4.student_id = tb_student.id AND tb_answer_4.quiz_id = 4 AND tb_answer_4.status != 'delete')  AS score_4
                    FROM tb_student 
                    LEFT JOIN tb_answer_1 ON tb_answer_1.student_id = tb_student.id AND tb_answer_1.status != 'delete'
                    WHERE tb_student.status != 'delete' 
                    Order by tb_student.id DESC `, async (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status : "success",
                    data : result.rows,
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.addStudent = async (req, res) => {
    try{
        if(req.body.id == 0 ){
                
            let student = await db.query(`SELECT * FROM tb_student WHERE student_name = $1 AND status = 'use' `, [req.body.student_name])

            if(student.rows.length != 0 ){
                res.status(200).json({
                    status: "error",
                    message: "ชื่อนี้มีอยู่ในระบบแล้ว",
                });
            }else{
                let setting = (await db.query(`SELECT * FROM tb_setting WHERE id = 1 `, [])).rows[0]
                let birthday = `${new Date(req.body.birthday).getFullYear()}-${new Date(req.body.birthday).getMonth()+1}-${new Date(req.body.birthday).getDate()}`
                var d = new Date();
                d.setMonth(d.getMonth()+ 1 + setting.set_expried);
                let expri_date = new Date(d)

                let sql = `INSERT INTO tb_student(email, student_name, student_surname, student_sex, birthday, mobile ,school ,education_years , education_semester , created_at , status ,expri_date) VALUES ($1, $2, $3, $4, $5, $6 , $7 , $8, $9 , $10 , $11 , $12)  RETURNING id`
                let data = [req.body.email, req.body.student_name, req.body.student_surname, req.body.student_sex, birthday , req.body.mobile , req.body.school , req.body.education_years , req.body.education_semester , new Date() , 'use' , expri_date]

                let student = (await (db.query(sql, data))).rows[0].id
                var result           = `${student}`;
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < 6; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                const transporter = nodemailer.createTransport({
                    auth: {
                        user: 'learnolifeteam@gmail.com',
                        pass: 'yxkkudxaakimeckr',
                    },
                    service : 'gmail'
                });

                transporter.sendMail({
                    from: '"Your Name" learnolifeteam@gmail.com', 
                    to: req.body.email,
                    subject: "Subject : รหัสเข้าทำแบบทดสอบ LOL 360 ค้นหาตัวเองรอบด้าน สู่การตัดสินใจอาชีพที่ใช่", 
                    text: `แบบทดสอบค้นหาอาชีพ LOL360 แบบทดสอบนี้จะแบ่งออกเป็น 4 ส่วนด้วยกัน`, 
                    html: `
                            <div> แบบทดสอบค้นหาอาชีพ LOL360 แบบทดสอบนี้จะแบ่งออกเป็น 4 ส่วนด้วยกัน </div>
                            <div> -  ค้นหาสิ่งที่ชอบ และความสนใจ </div>
                            <div> -  ค้นหาจุดแข็งที่ซ่อนอยู่ </div>
                            <div> -  ค้นหาสิ่งที่อยากทำ </div>
                            <div> -  ค้นหาสิ่งที่ต้องการจากงาน </div>
                            <div> คำแนะนำ : เนื่องจากต้องใช้เวลาในการทำแบบทดสอบประมาณ 45 นาที ดังนั้นควรหาเวลาที่ท่านสะดวก และทำแบบ </div>
                            <div> ทดสอบในสถานที่ที่ไม่มีสิ่งรบกวน เพื่อให้ท่านสามารถใช้เวลาอยู่กับตัวเอง และตอบคำถามตรงกับตัวเองมากที่สุด </div>
                            <div> ลิงค์สำหรับทำข้อสอบ <a href="http://202.183.198.245:3388/student-login"> http://202.183.198.245:3388/student-login </a> </div>
                            <div> รหัส (Test Code) เข้าทำแบบทดสอบ : <ins> ${result} </ins> </div>
                            <div> หากมีข้อสงสัย สามารถสอบถามเพิ่มเติม ได้ที่ </div>
                            <div> Line: @Learnolife </div>
                            <div> ขอบคุณค่ะ </div>
                            <div> Learn O Life </div>
                            `, 
                }).then(info => {
                }).catch(console.error);

                db.query(`UPDATE tb_student SET username = $1 , send_test_code = true WHERE id = $2`,  [result, student] , (err, result) => {
                    if (err) {
                        throw Error(err);
                    }
                    res.status(200).json({
                        status: "success",
                        message: "เพิ่มข้อมูลสำเร็จ",
                    });
                });
            }
        }else{
            db.query(`UPDATE tb_student SET email = $1, student_name = $2,  student_surname = $3, student_sex = $4, 
                        birthday = $5,  mobile = $6 , school = $7, education_years = $8  , education_semester = $9
            WHERE id = $10`,
            [req.body.email, req.body.student_name, req.body.student_surname, req.body.student_sex, req.body.birthday, req.body.mobile, req.body.school ,req.body.education_years ,req.body.education_semester , req.body.id ],
            (err, result) => {
                if (err) {
                    throw Error(err);
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "Update Success",
                    });
                }
            });
        }
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}


exports.addStudentExcel = async (req, res) => {
    try{
        let last_id = (await db.query(`SELECT id FROM tb_student WHERE status = 'use' ORDER BY id DESC LIMIT 1 `, [])).rows[0].id + 1

        let setting = (await db.query(`SELECT * FROM tb_setting WHERE id = 1 `, [])).rows[0]
        var d = new Date();
        d.setMonth(d.getMonth()+ 1 + setting.set_expried);
        let expri_date = new Date(d)

        
       
        for(let index in req.body){
            var result           = `${last_id++}`;
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 6; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            let birthday = `${new Date(req.body[index].birthday).getFullYear()}-${new Date(req.body[index].birthday).getMonth()+1}-${new Date(req.body[index].birthday).getDate()}`
            // console.log(req.body[index])
            if(req.body[index].email != null || req.body[index].email != undefined){
                
                const transporter = nodemailer.createTransport({
                    auth: {
                        user: 'learnolifeteam@gmail.com',
                        pass: 'yxkkudxaakimeckr',
                    },
                    service : 'gmail'
                });
                transporter.sendMail({
                    from: '"Your Name" learnolifeteam@gmail.com', 
                    to: req.body[index].email,
                    subject: "Subject : รหัสเข้าทำแบบทดสอบ LOL 360 ค้นหาตัวเองรอบด้าน สู่การตัดสินใจอาชีพที่ใช่", 
                    text: `แบบทดสอบค้นหาอาชีพ LOL360 แบบทดสอบนี้จะแบ่งออกเป็น 4 ส่วนด้วยกัน`, 
                    html: `
                            <div> แบบทดสอบค้นหาอาชีพ LOL360 แบบทดสอบนี้จะแบ่งออกเป็น 4 ส่วนด้วยกัน </div>
                            <div> -  ค้นหาสิ่งที่ชอบ และความสนใจ </div>
                            <div> -  ค้นหาจุดแข็งที่ซ่อนอยู่ </div>
                            <div> -  ค้นหาสิ่งที่อยากทำ </div>
                            <div> -  ค้นหาสิ่งที่ต้องการจากงาน </div>
                            <div> คำแนะนำ : เนื่องจากต้องใช้เวลาในการทำแบบทดสอบประมาณ 45 นาที ดังนั้นควรหาเวลาที่ท่านสะดวก และทำแบบ </div>
                            <div> ทดสอบในสถานที่ที่ไม่มีสิ่งรบกวน เพื่อให้ท่านสามารถใช้เวลาอยู่กับตัวเอง และตอบคำถามตรงกับตัวเองมากที่สุด </div>
                            <div> ลิงค์สำหรับทำข้อสอบ <a href="http://202.183.198.245:3388/student-login"> http://202.183.198.245:3388/student-login </a> </div>
                            <div> รหัส (Test Code) เข้าทำแบบทดสอบ : <ins> ${result} </ins> </div>
                            <div> หากมีข้อสงสัย สามารถสอบถามเพิ่มเติม ได้ที่ </div>
                            <div> Line: @Learnolife </div>
                            <div> ขอบคุณค่ะ </div>
                            <div> Learn O Life </div>
                            `, 
                }).then(async info => {
                    
                }).catch(console.error);
            }

            await db.query(`INSERT INTO tb_student(email, student_name, student_surname, student_sex, birthday, mobile ,school ,education_years , education_semester , created_at , username , status , expri_date , send_test_code) 
                VALUES ($1, $2, $3, $4, $5, $6 , $7 , $8, $9 , $10 , $11 , $12 , $13 , $14) `, 
            [   req.body[index].email , req.body[index].frist_name , req.body[index].last_name , req.body[index].sex , birthday , req.body[index].mobile , req.body[index].school ,
                req.body[index].education , req.body[index].semester , new Date() , result ,'use' , expri_date , true
            ])
            
        }

        res.status(200).json({
            status: "success",
            message: "เพิ่มข้อมูลสำเร็จ",
        });
        
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.getStudentReport = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_answer_1 WHERE status = 'use' AND student_id = $1 ORDER BY id DESC LIMIT 1` , [req.payload.id], (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data : result.rows[0],
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.getStudentReport4 = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_answer_4 WHERE status = 'use' AND student_id = $1 ORDER BY id DESC LIMIT 1` , [req.payload.id], (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data : result.rows[0],
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.getInterest = async (req, res) => {
    try{
        db.query(`SELECT * FROM interest ORDER BY id ASC ` , [], async (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                let job_bright_outlook = (await db.query(`SELECT * FROM tb_jobs ORDER BY id ASC `, [])).rows
                let job = (await db.query(`SELECT * FROM tb_jobs WHERE bright_outlook IS NOT NULL ORDER BY id ASC `, [])).rows
                let work_activities = (await db.query(`SELECT * FROM work_activitie ORDER BY id ASC  `, [])).rows
                let work_values = (await db.query(`SELECT * FROM work_value ORDER BY id ASC `, [])).rows
                res.status(200).json({
                    status: "success",
                    work_activities : work_activities ,
                    work_values : work_values,
                    data : result.rows,
                    job : job , 
                    job_bright_outlook : job_bright_outlook
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.jobtask = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_jobs_task ORDER BY id ASC ` , [], async (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data : result.rows,
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.jobknowlage = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_jobs_knowledge ORDER BY id ASC ` , [], async (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data : result.rows,
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.jobactivities = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_jobs_work_activities ORDER BY id ASC ` , [], async (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data : result.rows,
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.jobskill = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_jobs_skill ORDER BY id ASC ` , [], async (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data : result.rows,
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.jobabilitie = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_jobs_abilitie ORDER BY id ASC ` , [], async (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data : result.rows,
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.getReport1 = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_answer_1 WHERE status = 'use' AND student_id = $1 ORDER BY id DESC LIMIT 1` , [req.payload.id], async(err, result) => {
            if (err) {
                throw Error(err);
            } else {
                let answer_2 = (await db.query(`SELECT * FROM tb_answer_2 WHERE status = 'use' AND student_id = $1 ORDER BY id DESC LIMIT 1`, [req.payload.id])).rows
                let answer_3 = (await db.query(`SELECT * FROM tb_answer_3 WHERE status = 'use' AND student_id = $1 ORDER BY id DESC LIMIT 1`, [req.payload.id])).rows
                // let answer_4 = (await db.query(`SELECT * FROM tb_answer_4 WHERE status = 'use' AND student_id = $1 ORDER BY id DESC LIMIT 1`, [req.payload.id])).rows
                res.status(200).json({
                    status: "success",
                    point_interres : result.rows[0],
                    point_work_values : answer_2[0],
                    point_work_activities : answer_3[0] ,
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.student_point = async (req, res) => {
    try{

        let sql_studentt = `SELECT tb_student.* , tb_answer_1.total_score AS score_1 
                            ,(SELECT tb_answer_2.total_score FROM tb_answer_2 WHERE tb_answer_2.student_id = tb_student.id AND tb_answer_2.quiz_id = 2 AND tb_answer_2.status != 'delete')  AS score_2
                            ,(SELECT tb_answer_3.total_score FROM tb_answer_3 WHERE tb_answer_3.student_id = tb_student.id AND tb_answer_3.quiz_id = 3 AND tb_answer_3.status != 'delete')  AS score_3
                            ,(SELECT tb_answer_4.total_score FROM tb_answer_4 WHERE tb_answer_4.student_id = tb_student.id AND tb_answer_4.quiz_id = 4 AND tb_answer_4.status != 'delete')  AS score_4
                            FROM tb_student 
                            LEFT JOIN tb_answer_1 ON tb_answer_1.student_id = tb_student.id AND tb_answer_1.status != 'delete'
                            WHERE tb_student.status != 'delete' 
                            Order by tb_student.id DESC `
        let data_studentt = (await (db.query(sql_studentt, []))).rows

        let data = []
        for (let item of data_studentt) {
            if(item.score_1 != null && item.score_2 != null && item.score_3 != null && item.score_4 != null){
                item.anwser_1 = (await (db.query(`SELECT * FROM tb_answer_1 WHERE student_id = ${item.id} AND status != 'delete' ORDER BY id DESC LIMIT 1`, []))).rows[0]
                item.anwser_2 = (await (db.query(`SELECT * FROM tb_answer_2 WHERE student_id = ${item.id} AND status != 'delete' ORDER BY id DESC LIMIT 1`, []))).rows[0]
                item.anwser_3 = (await (db.query(`SELECT * FROM tb_answer_3 WHERE student_id = ${item.id} AND status != 'delete' ORDER BY id DESC LIMIT 1`, []))).rows[0]
                item.anwser_4 = (await (db.query(`SELECT * FROM tb_answer_4 WHERE student_id = ${item.id} AND status != 'delete' ORDER BY id DESC LIMIT 1`, []))).rows[0]
                data.push(item)
            }
        }
        for (let item of data) {
            // console.log(item.anwser_1)
            item.afteranswer_1 = (await (db.query(`SELECT * FROM tb_answer_detail WHERE answer_id = ${item.anwser_1.id} AND quiz_choice_id = ${item.anwser_1.quiz_id} ORDER BY id asc`, []))).rows
            item.afteranswer_2 = (await (db.query(`SELECT * FROM tb_answer_detail WHERE answer_id = ${item.anwser_2.id} AND quiz_choice_id = ${item.anwser_2.quiz_id} ORDER BY id asc`, []))).rows
            item.afteranswer_3 = (await (db.query(`SELECT * FROM tb_answer_detail WHERE answer_id = ${item.anwser_3.id} AND quiz_choice_id = ${item.anwser_3.quiz_id} ORDER BY id asc`, []))).rows
            item.afteranswer_4 = (await (db.query(`SELECT * FROM tb_answer_detail WHERE answer_id = ${item.anwser_4.id} AND quiz_choice_id = ${item.anwser_4.quiz_id} ORDER BY id asc`, []))).rows
           
        }
        let exportFile = [] 
        // console.log(data)
        for (let index of data) {
           console.log(index.afteranswer_2.length)
            exportFile.push(
                {
                    'testCode' : index.username ,
                    'ชื่อ' : `${index.student_name} ${index.student_surname}` ,
                    'โรงเรียน' : index.school ,
                    'artistic' : index.anwser_1.artistic ,
                    'investigative' : index.anwser_1.investigative , 
                    'realistic' : index.anwser_1.realistic ,
                    'enterprising' : index.anwser_1.enterprising ,
                    'social' : index.anwser_1.social ,
                    'conventional' : index.anwser_1.conventional ,
                    'a_i_like' : index.anwser_1.a_i_like ,
                    'a_i_can' : index.anwser_1.a_i_can ,
                    'a_i_am' : index.anwser_1.a_i_am ,
                    'i_i_like' : index.anwser_1.i_i_like ,
                    'i_i_can' : index.anwser_1.i_i_can ,
                    'i_i_am' : index.anwser_1.i_i_am ,
                    'r_i_like' : index.anwser_1.r_i_like ,
                    'r_i_can' : index.anwser_1.r_i_can ,
                    'r_i_am' : index.anwser_1.r_i_am ,
                    'e_i_like' : index.anwser_1.e_i_like ,
                    'e_i_can' : index.anwser_1.e_i_can ,
                    'e_i_am' : index.anwser_1.e_i_am ,
                    's_i_like' : index.anwser_1.s_i_like ,
                    's_i_can' : index.anwser_1.s_i_can ,
                    's_i_am' : index.anwser_1.s_i_am ,
                    'c_i_like' : index.anwser_1.c_i_like ,
                    'c_i_can' : index.anwser_1.c_i_can ,
                    'c_i_am' : index.anwser_1.c_i_am ,
        
                    'achievement' : index.anwser_2.achievement ,
                    'independence' : index.anwser_2.independence ,
                    'recognition' : index.anwser_2.recognition ,
                    'relationships' : index.anwser_2.relationships ,
                    'support' : index.anwser_2.support ,
                    'working_conditions' : index.anwser_2.working_conditions ,
        
                    'คะแนนรวมWorkActivities' : index.anwser_3.total_score ,
        
                    'presence' : index.anwser_4.presence ,
                    'competing' : index.anwser_4.competing ,
                    'relating' : index.anwser_4.relating ,
                    'achieving' : index.anwser_4.achieving ,
                    'future_thinker' : index.anwser_4.future_thinker ,
                    'discoverer' : index.anwser_4.discoverer ,
                    'caring' : index.anwser_4.caring ,
                    'confidence' : index.anwser_4.confidence ,
                    'dependability' : index.anwser_4.dependability ,
                    'organizer' : index.anwser_4.organizer ,

                    'ข้อสอบชุด 1' : "" ,

                    'ฉันชอบประดิษฐ์หรือสร้างสิ่งของใหม่ ๆ' : index.afteranswer_1[2].point ,
                    'ฉันถนัดการทำกิจกรรมที่ต้องใช้ร่างกาย เช่น เล่นกีฬา ซ่อมแซมสิ่งของต่าง ๆ เป็นต้น' : index.afteranswer_1[3].point ,
                    'ก่อนจะตัดสินอะไร ฉันจะวิเคราะห์อย่างละเอียดก่อนเสมอ' : index.afteranswer_1[4].point ,
                    'ฉันสนุกกับการพยายามแก้ไขปัญหาที่ซับซ้อน และต้องคิดวิเคราะห์อย่างลึกซึ้ง' : index.afteranswer_1[5].point ,
                    'เวลาที่เรียนไม่เข้าใจ ฉันรู้ว่าควรถามอะไร หรือจะหาคำตอบได้จากที่ไหน' : index.afteranswer_1[6].point ,
                    'ฉันทำงานได้ดีเมื่อได้ทำงานอย่างอิสระ' : index.afteranswer_1[7].point ,
                    'ฉันถนัดงานที่เกี่ยวกับศิลปะ เช่น วาดรูป ระบายสี เล่นดนตรี ร้องเพลง เต้น แต่งนิยาย เป็นต้น' : index.afteranswer_1[8].point ,
                    'ฉันชื่นชมคนที่นึกถึงคนอื่นก่อนตัวเอง' : index.afteranswer_1[9].point ,
                    'ฉันเป็นคนมุ่งมั่น ฉันตั้งเป้าหมายสำหรับตัวเองเสมอ' : index.afteranswer_1[10].point ,
                    'ฉันชอบโน้มน้าวคนอื่นให้เชื่อตามฉัน' : index.afteranswer_1[11].point ,
                    'ฉันเป็นคนใส่ใจในรายละเอียด' : index.afteranswer_1[12].point ,
                    'ฉันชอบจัดระเบียบสิ่งต่าง ๆ ให้เรียบร้อย' : index.afteranswer_1[13].point ,
                    'ฉันเก่งเรื่องการจดบันทึกข้อมูลต่าง ๆ เช่น สรุปบทเรียน จดบันทึกการบ้าน เป็นต้น' : index.afteranswer_1[14].point ,
                    'ฉันเรียนรู้ได้ดีจากการลงมือทำจริง มากกว่าการอ่านหนังสือ หรือบทความออนไลน์' : index.afteranswer_1[15].point ,
                    'คนอื่น ๆ มักบอกว่าฉันเป็นคนช่างจินตนาการ และมีความคิดสร้างสรรค์' : index.afteranswer_1[16].point ,
                    'ฉันมีเพื่อนหลายกลุ่ม และรู้จักผู้คนจำนวนมาก' : index.afteranswer_1[17].point ,
                    'ฉันชอบช่วยเหลือคนอื่น หรือทำงานอาสา' : index.afteranswer_1[18].point ,
                    'ฉันสามารถพูดนำเสนอสิ่งต่าง ๆ ต่อหน้าคนอื่นได้' : index.afteranswer_1[19].point ,
                    'ฉันให้ความสำคัญกับสิ่งที่จับต้องได้ มากกว่าสิ่งที่เป็นนามธรรม หรือจินตนาการ' : index.afteranswer_1[20].point ,
                    'ฉันชอบที่จะเอาของแต่ละอย่างมาผสมผสานกัน หรือเอาของมาประกอบกันเพื่อให้ได้สิ่งใหม่' : index.afteranswer_1[21].point ,
                    'ฉันสามารถเข้าใจกลไกการทำงานของอุปกรณ์ต่าง ๆ ได้อย่างง่ายดาย' : index.afteranswer_1[22].point ,
                    'ฉันเข้าใจเรื่องที่เกี่ยวกับวิทยาศาสตร์ หรือคณิตศาสตร์ได้อย่างรวดเร็ว' : index.afteranswer_1[23].point ,
                    'ฉันชอบออกแบบงานต่าง ๆ' : index.afteranswer_1[24].point ,
                    'เมื่อเพื่อนชวนไปพบปะสังสรรค์ ฉันตอบรับเข้าร่วมทุกครั้ง' : index.afteranswer_1[25].point ,
                    'ฉันสนุกกับการได้พบเจอผู้คนใหม่ ๆ' : index.afteranswer_1[26].point ,
                    'โดยธรรมชาติแล้ว ฉันรับรู้และเข้าใจความรู้สึกของผู้อื่นเป็นอย่างดี' : index.afteranswer_1[27].point ,
                    'ฉันเป็นคนไม่ยอมแพ้อะไรง่าย ๆ' : index.afteranswer_1[28].point ,
                    'ฉันชอบเป็นผู้นำมากกว่าผู้ตาม' : index.afteranswer_1[29].point ,
                    'ฉันสามารถโน้มน้าวคนอื่น ให้เชื่อในความคิดเห็นของฉัน' : index.afteranswer_1[30].point ,
                    'ฉันชอบทำงานที่เกี่ยวกับการจดบันทึก สถิติ หรือตัวเลข' : index.afteranswer_1[31].point ,
                    'ฉันเป็นคนช่างสังเกต และให้ความใส่ใจกับรายละเอียด' : index.afteranswer_1[32].point ,
                    'ฉันสนุกกับการพยายามหาคำตอบว่า สิ่งต่าง ๆ รอบตัวเกิดขึ้นได้อย่างไร' : index.afteranswer_1[33].point ,
                    'ฉันแก้ปัญหาที่มีความซับซ้อนได้ดี' : index.afteranswer_1[34].point ,
                    'ฉันไม่ชอบงานที่มีกฏระเบียบ หรืองานที่ต้องทำตามคำสั่ง' : index.afteranswer_1[35].point ,
                    'ฉันสามารถเข้าถึงอารมณ์ และความงดงามของศิลปะได้เป็นอย่างดี' : index.afteranswer_1[36].point ,
                    'ฉันพูดให้กำลังใจคนอื่นเก่ง' : index.afteranswer_1[37].point ,
                    'ฉันชอบออกไปพูดหน้าชั้นเรียน' : index.afteranswer_1[38].point ,
                    'ฉันสามารถตัดสินใจเรื่องต่าง ๆ ได้อย่างรวดเร็ว' : index.afteranswer_1[39].point ,
                    'ฉันมักตรวจสอบสิ่งต่าง ๆ ซ้ำเป็นครั้งที่สอง เพื่อความมั่นใจ' : index.afteranswer_1[40].point ,
                    'ฉันชอบทำงานเดิม ๆ ซ้ำ ๆ ได้แบบไม่เบื่อ' : index.afteranswer_1[41].point ,
                    'คนอื่น ๆ มักชื่นชนฉันว่าสามารถวางแผน จัดการสิ่งต่าง ๆ ได้ดีและชัดเจน' : index.afteranswer_1[42].point ,
                    'ฉันมีความสุขเวลาได้รื้อสิ่งของ ได้เห็นกลไกต่าง ๆ ของสิ่งที่ฉันรื้อ' : index.afteranswer_1[43].point ,
                    'ฉันชอบการลงมือปฏิบัติจริง' : index.afteranswer_1[44].point ,
                    'หากสิ่งของที่ฉันใช้พัง ฉันสามารถซ่อมเองได้ โดยใช้เวลาหาข้อมูลไม่นาน หรือทำเองได้เลยโดยไม่ต้องหาข้อมูล' : index.afteranswer_1[45].point ,
                    'คนอื่น ๆ มักบอกว่าฉันเป็นคนมีเหตุผล' : index.afteranswer_1[46].point ,
                    'ฉันชอบวิเคราะห์หาสาเหตุของสิ่งต่าง ๆ (ปัญหา / สถานการณ์)' : index.afteranswer_1[47].point ,
                    'ฉันมีความคิดใหม่ ๆ อยู่เสมอ ถึงแม้ว่าความคิดหลายอย่างจะนำไปปฏิบัติจริงได้ยาก' : index.afteranswer_1[48].point ,
                    'ฉันสนุกกับการได้ใช้จินตนาการ' : index.afteranswer_1[49].point ,
                    'ฉันเก่งเรื่องการถ่ายทอดอารมณ์ ความรู้สึก ผ่านการเขียน ภาพวาด เพลง หรือดนตรี' : index.afteranswer_1[50].point ,
                    'ฉันชอบทำกิจกรรมกลุ่ม มากกว่ากิจกรรมที่ต้องทำคนเดียว' : index.afteranswer_1[51].point ,
                    'คนอื่น ๆ มักบอกว่าฉันให้คำปรึกษา หรือให้คำแนะนำได้เป็นอย่างดี' : index.afteranswer_1[52].point ,
                    'ฉันเป็นคนกระตือรือร้น' : index.afteranswer_1[53].point ,
                    'ฉันเป็นคนมีความอดทนสูง' : index.afteranswer_1[54].point ,
                    'ฉันสามารถทำงานที่ต้องใช้ความละเอียดได้ดี เช่น ตรวจสอบเอกสาร ทำบัญชีรายรับรายจ่าย เป็นต้น' : index.afteranswer_1[55].point ,

                    'ข้อสอบชุด 2' : "" ,

                    'ฉันได้ใช้ความรู้ความสามารถของฉัน' : index.afteranswer_2[0].point ,
                    'ฉันสามารถรู้สึกได้ถึงความสำเร็จจากการทำงาน' : index.afteranswer_2[1].point ,
                    'ฉันสามารถลองใช้ไอเดียของตัวเองได้' : index.afteranswer_2[2].point ,
                    'ฉันสามารถตัดสินใจได้ด้วยตัวเอง' : index.afteranswer_2[3].point ,
                    'ฉันสามารถวางแผนการทำงานได้ โดยไม่ต้องถูกควบคุมหรือถูกจับตามอง' : index.afteranswer_2[4].point ,
                    'ฉันมีโอกาสเติบโตก้าวหน้าในงานของตัวเอง' : index.afteranswer_2[5].point ,
                    'ฉันสามารถออกคำสั่ง หรือสอนวิธีการทำงานให้กับคนอื่นได้' : index.afteranswer_2[6].point ,
                    'ฉันสามารถได้รับการยอมรับจากงานที่ทำ' : index.afteranswer_2[7].point ,
                    'เพื่อนร่วมงานเป็นมิตร และสามารถเข้ากับฉันได้ง่าย' : index.afteranswer_2[8].point ,
                    'ฉันจะไม่มีวันถูกกดดัน ให้ต้องทำในสิ่งที่ขัดกับความรู้สึกผิดชอบชั่วดี' : index.afteranswer_2[9].point ,
                    'ฉันสามารถทำประโยชน์เพื่อคนอื่นได้' : index.afteranswer_2[10].point ,
                    'ฉันจะได้รับการปฏิบัติที่ยุติธรรมจากบริษัท' : index.afteranswer_2[11].point ,
                    'หัวหน้าของฉันมีวิธีบริหารจัดการเพื่อสนับสนุนพนักงาน' : index.afteranswer_2[12].point ,
                    'ฉันมีหัวหน้าที่ช่วยสอนงานได้เป็นอย่างดี' : index.afteranswer_2[13].point ,
                    'ฉันจะได้ทำงานยุ่งตลอดเวลา' : index.afteranswer_2[14].point ,
                    'ค่าตอบแทนสูงเมื่อเทียบกับพนักงานคนอื่น ๆ' : index.afteranswer_2[15].point ,
                    'ฉันสามารถทำงานคนเดียวได้' : index.afteranswer_2[16].point ,
                    'งานที่ให้ความมั่นคงแก่ฉัน' : index.afteranswer_2[17].point ,
                    'ฉันได้ทำอะไรที่แตกต่างกันในทุก ๆ วัน ' : index.afteranswer_2[18].point ,
                    'งานที่มีสภาพแวดล้อมที่ปลอดภัย' : index.afteranswer_2[19].point ,

                    'ข้อสอบชุด 3' : "" , 

                    'เป็นคนคอยกะขนาดของสิ่งของ ระยะทาง และปริมาณของสิ่งต่าง ๆ หรือ กำหนดเวลา ต้นทุน อุปกรณ์ที่ต้องใช้ในการทำกิจกรรม เช่น จะไปซื้อของมาทำกิจกรรม ต้องกะว่าจะซื้อกระดาษกี่แผ่น สีกี่ขวด กาวกี่กระป๋อง หรือ จะขายลูกชิ้นปิ้งในกิจกรรมวันเด็กของโรงเรียน ต้องเป็นคนกะว่าจะซื้อลูกชิ้นกี่แพ็ค ไม้เสียบลูกชิ้นกี่ไม้ เป็นต้น' : index.afteranswer_3[0].point ,
                    'จัดกลุ่มข้อมูลที่เหมือนกันหรือคล้ายกัน หรือเป็นคนคอยแยกความแตกต่างระหว่างสิ่งของ หรือในสถานการณ์ต่าง ๆ เช่น คอยบอกว่าถ้าเปลี่ยนจากใช้กระดาษสีเหลืองจัดบอร์ด เป็นใช้กระดาษสีส้ม แบบไหนดีกว่ากัน แตกต่างกันอย่างไร หรือ เวลามีเพื่อนแสดงความคิดเห็นในกลุ่ม จะเป็นคนที่คอยหาจุดร่วมว่าแต่ละความคิดเห็นมีความเหมือนหรือแตกต่างกันอย่างไร' : index.afteranswer_3[1].point ,
                    'คอยตรวจสอบวัสดุอุปกรณ์ต่าง ๆ เพื่อหาว่ามีข้อบกพร่องหรือปัญหาตรงไหนบ้าง เช่น เวลาจัดบอร์ด จะคอยเช็คว่ากระดาษสีครบไหม มีรอยขาดตรงไหนหรือเปล่า หรือตรวจสอบว่า ถ้าใช้ผ้าแบบนี้ในการแสดงละคร จะมีปัญหาอะไรเกิดขึ้นบ้าง เป็นต้น' : index.afteranswer_3[2].point ,
                    'เก็บรวบรวมข้อมูลจากแหล่งต่าง ๆ ทั้งจากการสังเกต การถาม การค้นหาข้อมูลในอินเทอร์เน็ต เช่น เวลาทำรายงาน จะเป็นคนรวบรวมข้อมูลทั้งสังเกตสถานการณ์จริง ไปถามคนอื่น ๆ และลองค้นหาข้อมูลในอินเทอร์เน็ต/หนังสือ แทนที่จะคิดขึ้นเอง เป็นต้น' : index.afteranswer_3[3].point ,
                    'คอยติดตาม และตรวจสอบปัญหาจากเหตุการณ์ สิ่งแวดล้อม หรือสิ่งของที่ใช้งานต่าง ๆ เช่น คอยตรวจสอบความผิดปกติของคอมพิวเตอร์ในโรงเรียนระหว่างใช้งาน หรือในกิจกรรมกีฬาสี จะคอยเช็คว่าอุปกรณ์การแข่ง หรือสภาพร่างกายของเพื่อนร่วมทีมพร้อมแข่งหรือไม่ หรือติดตามเรื่องอุปกรณ์ในโรงเรียนที่พัง ว่าได้รับการซ่อมแซมหรือยัง เป็นต้น' : index.afteranswer_3[4].point ,
                    'ควบคุมดูแลเรื่องการใช้เงิน หรือวัสดุอุปกรณ์อื่น ๆ เวลาทำงานกลุ่ม' : index.afteranswer_3[5].point ,
                    'ทำงานที่เกี่ยวกับเอกสารทั่ว ๆ ไป เช่น จัดเก็บเอกสารของเพื่อน ๆ เข้าแฟ้ม หรือ จดบันทึกรายงานประจำวันให้คุณครู' : index.afteranswer_3[6].point ,
                    'ช่วยคุณครูรับสมัคร คัดเลือก และสัมภาษณ์นักเรียน รวมไปถึงการคัดเลือกว่าใครควรเป็นตัวแทนโรงเรียนในกิจกรรมต่าง ๆ ด้วย' : index.afteranswer_3[7].point ,
                    'คอยช่วยเหลือคนอื่น ๆ ไม่ว่าจะเป็นเพื่อน ครู หรือบุคลากรในโรงเรียน เช่น ช่วยดูแลเพื่อนเวลาไม่สบาย คอยปลอบใจเพื่อน ช่วยคุณครูถือของ คอยบอกทางในโรงเรียนให้นักเรียนใหม่ เป็นต้น' : index.afteranswer_3[8].point ,
                    'สื่อสารกับบุคคลภายนอกโรงเรียน เป็นตัวแทนของโรงเรียนในการออกไปทำกิจกรรม ประสานงานกับหน่วยงานอื่น ๆ นอกโรงเรียน ไม่ว่าจะผ่านการพูดคุยต่อหน้า เขียนจดหมาย โทรศัพท์ หรือติดต่อทางอีเมล' : index.afteranswer_3[9].point ,
                    'สื่อสารแลกเปลี่ยนข้อมูลกับคุณครู เพื่อน หรือรุ่นน้องในโรงเรียน โดยพูดคุยผ่านทางโทรศัพท์ เขียนจดหมาย อีเมล หรือการพูดคุยแบบต่อหน้า' : index.afteranswer_3[10].point ,
                    'สานสัมพันธ์ในการทำงานกับคนอื่น ๆ ไม่ว่าจะกับเพื่อน ๆ ทั้งในและนอกโรงเรียน คุณครู บุคลากร และพยายามรักษาความสัมพันธ์อันดีนั้นไว้' : index.afteranswer_3[11].point ,
                    'เป็นคนอธิบายข้อมูลต่าง ๆ ให้คนอื่นเข้าใจง่ายขึ้น เช่น พยายามแปลสิ่งที่เพื่อนคนหนึ่งพูด ให้เพื่อนอีกคนหนึ่งที่ไม่เข้าใจฟัง หรืออธิบายสิ่งที่ครูพูด ให้เพื่อนเข้าใจง่าย ๆ หรือ อธิบายเนื้อหาในหนังสือออกมาเป็นคำพูดง่าย ๆ ให้เพื่อนเข้าใจ' : index.afteranswer_3[12].point ,
                    'ทำกิจกรรมเพื่อสาธารณะ หรือทำงานเพื่อช่วยเหลือบุคคลจากภายนอกโดยตรง เช่น ไปทำค่ายอาสาที่หมู่บ้านบนดอย หรือช่วยต้อนรับแขกในงานเลี้ยงเกษียณของคุณครู เป็นต้น' : index.afteranswer_3[13].point ,
                    'จัดการความขัดแย้งต่าง ๆ ที่เกิดขึ้น และพยายามเจรจาต่อรองกับคนอื่น ๆ เช่น เป็นคนกลางเจรจาระหว่างเพื่อน 2 คนที่ทะเลาะกัน หรือช่วยระงับข้อพิพาทเรื่องคนแซงคิวในโรงอาหาร เป็นต้น' : index.afteranswer_3[14].point ,
                    'โน้มน้าวให้ผู้อื่นซื้อสินค้า/บริการ หรือเปลี่ยนใจ/เปลี่ยนความคิด เช่น ช่วยคุณครูขายตั๋วละครเวทีของโรงเรียน พยายามพูดให้คุณครูให้การบ้านน้อยลง หรือโน้มน้าวให้ครูเลื่อนวันส่งการบ้าน เป็นต้น' : index.afteranswer_3[15].point ,
                    'ให้คำปรึกษา หรือช่วยเหลือผู้อื่นเพื่อพัฒนาทักษะของพวกเขา โดยสังเกตว่าอะไรคือสิ่งที่พวกเขาควรพัฒนา หรืออยากพัฒนาบ้าง เช่น ให้คำปรึกษารุ่นน้องที่อยากกล้าแสดงออกมากขึ้น หรือ ช่วยพัฒนาทักษะการพูดหน้าชั้นเรียนให้เพื่อน เป็นต้น' : index.afteranswer_3[16].point ,
                    'เป็นคนกลางที่คอยประสานงานต่าง ๆ ให้เพื่อนในกลุ่มสามารถทำงานด้วยกันได้จนเสร็จ' : index.afteranswer_3[17].point ,
                    'สร้างบรรยากาศในกลุ่มให้ทุกคนเข้าใจซึ่งกันและกัน รวมถึงไว้ใจและเคารพกันมากขึ้น' : index.afteranswer_3[18].point ,
                    'ให้คำแนะนำหรือชี้แนะแนวทางให้กับรุ่นน้องในโรงเรียน เกี่ยวกับกฎระเบียบในโรงเรียน เทคนิคการเรียนแต่ละวิชา หรือแนวทางการเข้าคณะต่าง ๆ รวมถึงติดตามผลการเรียนหรือพัฒนาการของคนอื่น ๆ ด้วย เช่น ติดตามผลว่า รุ่นน้องที่เข้าติวกับเราก่อนสอบ มีคะแนนดีขึ้นหรือไม่ อย่างไร' : index.afteranswer_3[19].point ,
                    'ให้คำแนะนำกับเพื่อนกลุ่มอื่น ๆ เวลาที่เพื่อนไม่เข้าใจคำอธิบายการบ้าน หรือคอยให้คำแนะนำคุณครูที่ไม่ถนัดการใช้เทคโนโลยี' : index.afteranswer_3[20].point ,
                    'คอยวิเคราะห์ว่าวิชาไหน หรือบทเรียนไหนที่เพื่อน หรือรุ่นน้องควรพัฒนาเพิ่มเติม และช่วยสอนพวกเขา เช่น สังเกตว่าเพื่อนคนนี้ยังไม่เก่งคณิตศาสตร์บทไหน แล้วจึงสอนเพื่อนในบทนั้น พร้อมเตรียมแบบฝึกหัดให้ หรือเป็นคนติววิชาต่าง ๆ ให้รุ่นน้องก่อนสอบ โดยเลือกว่ารุ่นน้องห้องนี้ ระดับชั้นนี้ ควรติวเรื่องอะไร เป็นต้น' : index.afteranswer_3[21].point ,
                    'ระบุหลักการ เหตุผล หรือข้อเท็จจริงของข้อมูล โดยแยกข้อมูลออกเป็นส่วน ๆ เช่น ในการทำรายงาน หลังจากรวบรวมข้อมูลมาได้แล้ว จะต้องมานั่งแยกว่ามีข้อมูลเกี่ยวกับอะไรบ้าง' : index.afteranswer_3[22].point ,
                    'ใช้ข้อมูลและวิจารณญาณส่วนตัว เพื่อพิจารณาว่าเหตุการณ์ หรือกระบวนการนั้นเป็นไปตามมาตรฐาน หรือกฎระเบียบ หรือไม่ เช่น เวลาเห็นเพื่อนนำขนมขึ้นมาทานในห้องเรียน ก็จะคิดพิจารณาว่าเพื่อนทำผิดกฎหรือไม่ หรือเวลาทำงานกลุ่ม จะคอยตรวจงานที่เพื่อนทำส่งมาว่างานได้มาตรฐานหรือเปล่า' : index.afteranswer_3[23].point ,
                    'ประเมินคุณค่า ความสำคัญ หรือคุณภาพของสิ่งของหรือบุคคล เช่น ถ้าต้องเลือกสมาชิกเข้ากลุ่มเพื่อทำงานด้วยกัน จะคอยประเมินว่าใครมีคุณสมบัติอย่างไร หรือ ประเมินว่าควรทำการบ้านวิชาไหนก่อน ตามความสำคัญ' : index.afteranswer_3[24].point ,
                    'รวบรวมข้อมูล คำนวณ จัดระเบียบ หรือตรวจสอบความถูกต้องของข้อมูล เช่น ทำตารางสถิติในการบ้านวิชาคณิตศาสตร์ หรือตรวจสอบว่าผลลัพธ์ตัวเลขที่เพื่อนคำนวณมา ในผลการทดลองทางวิทยาศาสตร์ถูกต้องหรือเปล่า เป็นต้น' : index.afteranswer_3[25].point ,
                    'กำหนดวัตถุประสงค์ระยะยาว และวางกลยุทธ์ในการทำงาน เพื่อให้บรรลุเป้าหมาย เช่น เวลาทำงานกลุ่ม จะเป็นคนวางแผนว่างานนี้ต้องทำอะไรบ้าง และจะมีวิธีทำให้สำเร็จได้อย่างไร โดยจะวางแผนแบบกว้าง ๆ' : index.afteranswer_3[26].point ,
                    'วิเคราะห์ข้อมูล และประเมินผลลัพธ์ เพื่อเลือกวิธีแก้ไขปัญหาที่ดีที่สุด เช่น เวลาเจอปัญหาในการทำงานกลุ่ม จะคิดว่ามีทางออกอะไรบ้าง แล้วทางเลือกไหนมีข้อดีหรือข้อเสียเป็นอย่างไร และเลือกทางที่ดีที่สุด' : index.afteranswer_3[27].point ,
                    'ตั้งเป้าหมายที่เฉพาะเจาะจง วางแผนการเรียนของตนเอง เพื่อจัดลำดับความสำคัญ จัดระเบียบ และทำงานให้สำเร็จ เช่น ตั้งเป้าหมายว่าวันนี้จะต้องทำอะไรบ้าง โดยเรียงลำดับความสำคัญก่อนหลัง เป็นต้น' : index.afteranswer_3[28].point ,
                    'จัดตารางกิจกรรม และสิ่งที่ต้องทำ ทั้งของตัวเองและคนอื่นด้วย เช่น เวลาทำงานกลุ่ม จะเป็นคนกำหนดว่าใครต้องทำอะไร ตอนไหนบ้าง เป็นต้น' : index.afteranswer_3[29].point ,
                    'นำเสนอกิจกรรม หรือแนวทางแก้ปัญหาโรงเรียนใหม่ ๆ นำเสนอไอเดียงานกลุ่มแบบใหม่ ๆ หรือทำงานอื่น ๆ ที่เกี่ยวกับการใช้ความคิดสร้างสรรค์ เช่น ออกแบบผลงานศิลปะ เป็นต้น' : index.afteranswer_3[30].point ,
                    'อัพเดทความรู้ใหม่ ๆ ในวิชาต่าง ๆ อยู่เสมอ และนำมาใช้กับการเรียนหรือการทำโปรเจ็คของตัวเอง' : index.afteranswer_3[31].point ,
                    'พิมพ์ข้อความหรือเอกสาร ถอดเทปเสียง จัดเก็บข้อมูล ในคอมพิวเตอร์ โน๊ตบุ๊ค ไอแพด หรือโทรศัพท์มือถือ เช่น นำสรุปที่เพื่อนเขียนในวิชาวิทยาศาสตร์ มาพิมพ์ลงในคอมพิวเตอร์ หรือ ถอดเทปเสียงที่คุณครูบรรยายในคาบ แล้วมาเขียนสรุปในไอแพด เป็นต้น' : index.afteranswer_3[32].point ,
                    'จัดทำคู่มือหรือคำแนะนำ เกี่ยวกับการใช้งาน การประกอบ หรือการดูแลรักษาอุปกรณ์ เครื่องมือ หรือชิ้นส่วนต่าง ๆ ให้คนอื่นเข้าใจ เช่น เขียนคำแนะนำการใช้เครื่องปริ้นท์ให้ครูประจำชั้น หรือจัดทำคู่มือการใช้ตู้กดน้ำที่ถูกวิธีให้กับนักเรียนในโรงเรียน' : index.afteranswer_3[33].point ,
                    'คอยซ่อมแซม ควบคุม ปรับแต่ง หรือทดสอบอุปกรณ์เครื่องใช้ไฟฟ้า หรืออิเล็กทรอนิกส์ เช่น ช่วยครูซ่อมหลอดไฟ ซ่อมตู้เย็น หรือทดสอบความดังของลำโพง ควบคุมเสียงของไมโครโฟน ในงานกิจกรรมของโรงเรียน เป็นต้น' : index.afteranswer_3[34].point ,
                    'คอยซ่อมแซม ควบคุม ปรับแต่ง หรือทดสอบอุปกรณ์ที่เกี่ยวกับเครื่องจักรกล เช่น ซ่อมตู้กดน้ำของโรงเรียน ควบคุมเครื่องบีบอัดพลาสติกในชุมนุมสิ่งแวดล้อม เป็นต้น' : index.afteranswer_3[35].point ,
                    'เขียนโปรแกรมคอมพิวเตอร์ ตั้งค่าฟังก์ชันต่าง ๆ หรือประมวลผลข้อมูลในคอมพิวเตอร์' : index.afteranswer_3[36].point ,
                    'ควบคุมหรือทำงานกับเครื่องจักร เช่น ใช้สว่าน ควบคุมเครื่องถ่ายเอกสาร ใช้เครื่องตัดหญ้า เป็นต้น (ไม่รวมถึงการใช้คอมพิวเตอร์ หรือยานพาหนะ)' : index.afteranswer_3[37].point ,
                    'ทำกิจกรรมที่ต้องใช้มือและแขนเป็นหลัก เช่น จัดบอร์ด จัดกระถางต้นไม้ ยกโต๊ะเก้าอี้ จัดเอกสารต่าง ๆ เป็นต้น' : index.afteranswer_3[38].point ,
                    'ควบคุมอุปกรณ์ หรือทำอะไรที่เกี่ยวกับการบังคับทิศทาง ควบคุมทิศทาง เช่น ควบคุมโดรน หรือเครื่องบินบังคับ หรือขับขี่ยานพาหนะ เช่น จักรยาน มอเตอร์ไซค์ รถยนต์ เป็นต้น' : index.afteranswer_3[39].point ,
                    'ทำกิจกรรมที่ต้องใช้แขนและขาอย่างมาก และขยับร่างกายทั้งหมด เช่น ทำความสะอาดห้องเรียน ยกสมุดการบ้านของเพื่อนทั้งห้องไปส่งที่โต๊ะครู ปีนขึ้นไปตกแต่งซุ้มในงานกิจกรรมของโรงเรียน เดินแจกดอกไม้ให้รุ่นพี่ทั้งโรงเรียน ในวันปัจฉิมนิเทศ เป็นต้น' : index.afteranswer_3[40].point ,


                    'ข้อสอบชุด 3' : "" , 

                    
                    'ฉันชอบเป็นตัวแทนของกลุ่ม' : index.afteranswer_4[0].point ,
                    'ฉันใฝ่ฝันถึงการเป็นคนที่เก่งที่สุด' : index.afteranswer_4[1].point ,
                    'ฉันชอบเอาชนะในการถกเถียง' : index.afteranswer_4[2].point ,
                    'เพื่อนๆ มักเล่าปัญหาของเขาให้ฉันฟัง' : index.afteranswer_4[3].point ,
                    'ฉันเป็นคนทำงานหนักมาก' : index.afteranswer_4[4].point ,
                    'ฉันทำให้คนอื่นรู้สึกตื่นเต้นได้' : index.afteranswer_4[5].point ,
                    'ฉันชอบจินตนาการว่าอนาคตจะเป็นอย่างไร' : index.afteranswer_4[6].point ,
                    'ความคิดใหม่ๆ ทำให้ฉันตื่นเต้น' : index.afteranswer_4[7].point ,
                    'เมื่อฉันเห็นใครอยู่นอกวงฉันมักจะให้เขามาเข้าร่วมวงด้วย' : index.afteranswer_4[8].point ,
                    'ฉันชอบทำให้คนอื่นรู้สึกว่าเขาเป็นที่ต้อนรับ' : index.afteranswer_4[9].point ,
                    'ฉันเรียนรู้สิ่งต่างๆ นอกเหนือจากตำราด้วยตัวเองเพราะว่าฉันสนใจสิ่งเหล่านั้น' : index.afteranswer_4[10].point ,
                    'ฉันชอบพูดคุยเกี่ยวกับชีวิต' : index.afteranswer_4[11].point ,
                    'ฉันทำให้คนอื่นชอบฉันได้' : index.afteranswer_4[12].point ,
                    'ฉันเป็นคนใจกว้างชอบแบ่งปัน' : index.afteranswer_4[13].point ,
                    'ฉันชอบพูดคุย' : index.afteranswer_4[14].point ,
                    'ฉันชอบเป็นกระบอกเสียงให้กลุ่ม' : index.afteranswer_4[15].point ,
                    'ฉันทำงานให้เสร็จได้มากกว่าคนอื่น' : index.afteranswer_4[16].point ,
                    'ฉันสามารถเริ่มงานใหม่ได้อย่างง่ายดาย' : index.afteranswer_4[17].point ,
                    'เมื่อฉันมีเวลาว่างฉันชอบที่จะช่วยเหลือคนอื่น' : index.afteranswer_4[18].point ,
                    'ฉันทำให้เด็กคนอื่นหัวเราะได้' : index.afteranswer_4[19].point ,
                    'ฉันทำทุกอย่างได้เพื่อให้ชนะ' : index.afteranswer_4[20].point ,
                    'ฉันคาดหวังว่าจะได้ทำสิ่งที่ยิ่งใหญ่' : index.afteranswer_4[21].point ,
                    'ฉันยืนหยัดเพื่อสิ่งที่ถูกต้อง แม้ว่าจะต้องขัดแย้งกับเพื่อนก็ตาม' : index.afteranswer_4[22].point ,
                    'คนอื่นพึ่งพาฉันได้' : index.afteranswer_4[23].point ,
                    'ฉันชอบเล่าเรื่อง' : index.afteranswer_4[24].point ,
                    'ฉันมีความสุขมากกว่าความจริงจัง' : index.afteranswer_4[25].point ,
                    'ฉันมีความฝันยิ่งใหญ่เกี่ยวกับอนาคต' : index.afteranswer_4[26].point ,
                    'ความเป็นระเบียบสำคัญมากสำหรับฉัน' : index.afteranswer_4[27].point ,
                    'ฉันรักที่จะค้นพบสิ่งใหม่ๆ' : index.afteranswer_4[28].point ,
                    'ฉันเกลียดที่จะต้องแพ้' : index.afteranswer_4[29].point ,
                    'ฉันชอบวางแผนและจัดระเบียบสิ่งต่างๆ' : index.afteranswer_4[30].point ,
                    'ฉันรู้สึกผิดเวลาที่ไม่ได้ทำสิ่งที่ถูกต้อง' : index.afteranswer_4[31].point ,
                    'ฉันกำลังเรียนรู้สิ่งที่จะช่วยฉันได้ในอนาคต' : index.afteranswer_4[32].point ,
                    'ฉันตัดสินใจโดยการคิดทบทวนทุกสิ่งอย่างรอบคอบ' : index.afteranswer_4[33].point ,
                    'ฉันรู้สึกดีเมื่อได้ช่วยเหลือผู้อื่น' : index.afteranswer_4[34].point ,
                    'ฉันเป็นคนมีความรับผิดชอบ' : index.afteranswer_4[35].point ,
                    'คนอื่นชอบอยู่กับฉัน' : index.afteranswer_4[36].point ,
                    'ฉันมีพลังเยอะกว่าคนอื่น' : index.afteranswer_4[37].point ,
                    'คำพูดที่ฉันใช้ทำให้ฉันดูฉลาด' : index.afteranswer_4[38].point ,
                    'ฉันต้องการให้งานออกมาไร้ที่ติ' : index.afteranswer_4[39].point ,
                    'ฉันยินดีเวลาที่คนอื่นมาคุยกับฉันเรื่องปัญหาต่างๆ' : index.afteranswer_4[40].point ,
                    'ฉันชอบช่วยให้คนอื่นเรียนรู้' : index.afteranswer_4[41].point ,
                    'ฉันเป็นคนรักษาคำพูด' : index.afteranswer_4[42].point ,
                    'ฉันชอบวิชาที่ท้าทาย' : index.afteranswer_4[43].point ,
                    'ฉันผูกมิตรได้ง่าย' : index.afteranswer_4[44].point ,
                    'ฉันชอบที่จะทำให้เด็กใหม่ที่โรงเรียนรู้สึกว่าเขาเป็นที่ชื่นชอบ' : index.afteranswer_4[45].point ,
                    'การพูดในที่สาธรณะเป็นเรื่องง่ายสำหรับฉันเมื่อเปรียบเทียบกับเพื่อนคนอื่นๆ' : index.afteranswer_4[46].point ,
                    'ฉันชอบการแข่งขันเพราะฉันชอบที่ชนะ' : index.afteranswer_4[47].point ,
                    'ฉันชอบช่วยเหลือผู้อื่น' : index.afteranswer_4[48].point ,
                    'ฉันมักคิดถึงสาเหตุของสิ่งต่างๆ' : index.afteranswer_4[49].point ,
                    'สำหรับฉันทุกๆอย่างต้องถูกวางแผน' : index.afteranswer_4[50].point ,
                    'ฉันมักพยายามที่จะทำทุกอย่างให้ดีกว่าคนอื่นอยู่เสมอ' : index.afteranswer_4[51].point ,
                    'ฉันมักนึกถึงว่าฉันจะโตไปเป็นผู้ใหญ่แบบไหน' : index.afteranswer_4[52].point ,
                    'ฉันจะทำสิ่งที่ฉันคิดว่าถูกต้องไม่ว่าคนอื่นจะเห็นด้วยหรือไม่' : index.afteranswer_4[53].point ,
                    'ฉันมีชื่อเสียงด้านการทำงานหนักและยาวนานกว่าคนอื่น' : index.afteranswer_4[54].point ,
                    'ฉันต้องเป็นที่หนึ่ง' : index.afteranswer_4[55].point ,
                    'ฉันกล้าโต้แย้งเพื่อความเห็นของตัวเอง' : index.afteranswer_4[56].point ,
                    'ฉันชอบแยกชิ้นส่วนสิ่งต่างๆ ออกมาเพื่อดูว่ามันทำงานอย่างไร' : index.afteranswer_4[57].point ,
                    'คนอื่นมักบอกว่าฉันเป็นคนกล้าหาญ' : index.afteranswer_4[58].point ,
                    'ฉันชอบสร้างความสนุกให้คนอื่น' : index.afteranswer_4[59].point ,
                    'ฉันชอบกฎระเบียบ' : index.afteranswer_4[60].point ,
                    'ฉันมักพยายามที่จะทำทุกอย่างให้ดีกว่าคนอื่นอยู่เสมอ' : index.afteranswer_4[61].point ,
                    'ฉันชอบทำสิ่งต่างๆ ด้วยวิธีใหม่ๆ' : index.afteranswer_4[62].point ,
                    'ฉันชอบลองสิ่งใหม่ๆ' : index.afteranswer_4[63].point ,
                    'ฉันมักนึกถึงความหมายของชีวิต' : index.afteranswer_4[64].point ,
                    'คนอื่นมักถามหาความคิดใหม่ๆ จากฉัน' : index.afteranswer_4[65].point ,
                    'ฉันชอบเก็บข้อมูลและสิ่งของที่ฉันสนใจ' : index.afteranswer_4[66].point ,
                    'ฉันมีความคิดเห็นของตัวเอง' : index.afteranswer_4[67].point ,
                    'ฉันชอบเป็นจุดสนใจ' : index.afteranswer_4[68].point ,
                    'ฉันชอบทำให้คนอื่นมีความสุข' : index.afteranswer_4[69].point ,
                    'การถูกมองว่าเป็นคนที่ประสบความสำเร็จเป็นสิ่งสำคัญสำหรับฉัน' : index.afteranswer_4[70].point ,
                    'ฉันมักคิดถึงอนาคตมากกว่าปัจจุบัน' : index.afteranswer_4[71].point ,
                    'ฉันสามารถเรียนรู้สิ่งที่ปกติแล้วคนอื่นต้องใช้เวลานานในการเรียนรู้ได้' : index.afteranswer_4[72].point ,
                    'ฉันรู้สึกดีเมื่อคนอื่นไว้ใจฉัน' : index.afteranswer_4[73].point ,
                }
            )
                
        }

        return res.status(200).json({status : "success" , dataExport : exportFile});

    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}