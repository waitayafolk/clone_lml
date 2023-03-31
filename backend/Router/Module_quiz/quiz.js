var db = require("../../Connect/db_connect");

exports.get_strong_point = (req, res) => {
    try{
        db.query(`SELECT * FROM tb_quiz_choice_stang10  Order by id ASC `, [] ,  (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.save_quiz_detail = (req, res) => {
    try{
        db.query(`UPDATE tb_quiz_choice SET title = $1 , title_eng = $2 , type = $3 , type_detail = $4 WHERE id = $5 `, [req.body.title , req.body.title_eng , req.body.type , req.body.type_detail , req.body.id ] ,  (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.save_quiz_detail10 = (req, res) => {
    try{
        db.query(`UPDATE tb_quiz_choice_stang10 SET name = $1 , name_eng = $2  WHERE id = $3 `, [req.body.title , req.body.title_eng , req.body.id ] ,  (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.get_group_detail = (req, res) => {
    try{
        db.query(`SELECT * FROM tb_quiz_choice WHERE status != 'delete' AND quiz_id = $1 Order by id ASC `, [req.params.id] ,  (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.get_group = (req, res) => {
    try{
        db.query(`SELECT * FROM tb_quiz WHERE status != 'delete' Order by id ASC `, (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.get_group10 = (req, res) => {
    try{
        db.query(`SELECT * FROM tb_quiz_choice_stang10 Order by id ASC `, (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.get_quiz1 = (req, res) => {
    try{
        db.query(`SELECT * FROM tb_quiz_choice WHERE quiz_id = 1 AND status != 'delete' Order by id ASC `, (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.get_quiz2 = (req, res) => {
    try{
        db.query(`SELECT * FROM tb_quiz_choice WHERE quiz_id = 2 AND status != 'delete' Order by id ASC `, (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.get_quiz3 = (req, res) => {
    try{
        db.query(`SELECT * FROM tb_quiz_choice WHERE quiz_id = 3 AND status != 'delete' Order by id ASC `, (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.get_quiz4 = (req, res) => {
    try{
        db.query(`SELECT * FROM tb_quiz_choice WHERE quiz_id = 4 AND status != 'delete' Order by id ASC `, (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.sendAnswer = async(req, res) => {
    try{
        let sql_answers = `SELECT * FROM tb_answer_1 WHERE student_id = $1 AND quiz_id = $2 AND status != 'delete'`
        let data_answers = (await (db.query(sql_answers, [req.payload.id , req.body.quiz_id ]))).rows

            if(data_answers.length > 0){
                for(let data of data_answers){
                    let sql_update = `UPDATE tb_answer_1 SET status = 'delete' WHERE id = $1`
                    await db.query(sql_update, [data.id])
                }   
            }
            
            let sql = `INSERT INTO tb_answer_1
                        ( student_id , total_score , quiz_id , created_date , status , artistic , investigative , realistic , enterprising , social , conventional 
                        , a_i_like , a_i_can , a_i_am , i_i_like , i_i_can , i_i_am , r_i_like , r_i_can , r_i_am , e_i_like , e_i_can , e_i_am , s_i_like , s_i_can , s_i_am , c_i_like , c_i_can , c_i_am) 
                        VALUES ($1 , $2 ,$3 ,$4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , $15 , $16 , $17 , $18 , $19 , $20 , $21 , $22 , $23 , $24 , $25 , $26 , $27 , $28 , $29 )  RETURNING id`

            let data = [ req.payload.id , req.body.score.total_score , req.body.quiz_id ,  new Date() , 'use' , req.body.score.artistic_point , req.body.score.investigative_point ,  
                        req.body.score.realistic_point , req.body.score.enterprising_point , req.body.score.social_point , req.body.score.conventional_point , req.body.score.A_i_like , req.body.score.A_i_can , 
                        req.body.score.A_i_am , req.body.score.I_i_like , req.body.score.I_i_can , req.body.score.I_i_am , req.body.score.R_i_like , req.body.score.R_i_can , 
                        req.body.score.R_i_am , req.body.score.E_i_like , req.body.score.E_i_can , req.body.score.E_i_am , req.body.score.S_i_like , req.body.score.S_i_can , 
                        req.body.score.S_i_am , req.body.score.C_i_like , req.body.score.C_i_can , req.body.score.C_i_am]
            let answer = (await (db.query(sql, data))).rows[0].id
    
            let sql_detail = `INSERT INTO tb_answer_detail( answer_id , quiz_choice_id , answer , point) VALUES ($1 , $2 ,$3 ,$4)`
            for(let index of req.body.quiz){
                await (db.query(sql_detail, [answer , index.quiz_id , index.answer , index.point ]))
            }
    
            res.status(200).json({
                status: "success",
                message: "success",
            });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.getList = async (req, res) => {
    try{
        let sql_answer1 = `SELECT * FROM tb_answer_1 WHERE student_id = $1 AND quiz_id = 1 AND status != 'delete'`
        let answer1 = (await (db.query(sql_answer1, [req.payload.id ]))).rows

        let sql_answer2 = `SELECT * FROM tb_answer_2 WHERE student_id = $1 AND quiz_id = 2 AND status != 'delete'`
        let answer2 = (await (db.query(sql_answer2, [req.payload.id ]))).rows

        let sql_answer3 = `SELECT * FROM tb_answer_3 WHERE student_id = $1 AND quiz_id = 3 AND status != 'delete'`
        let answer3 = (await (db.query(sql_answer3, [req.payload.id ]))).rows

        let sql_answer4 = `SELECT * FROM tb_answer_4 WHERE student_id = $1 AND quiz_id = 4 AND status != 'delete'`
        let answer4 = (await (db.query(sql_answer4, [req.payload.id ]))).rows

        db.query(`SELECT * FROM tb_answer_1 WHERE status = 'use' AND student_id = $1 ORDER BY id DESC LIMIT 1` , [req.payload.id], (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                let data = [
                    {id : 1 , text : "Interest" , status : answer1.length > 0 ? true : false } , 
                    {id : 2 , text : "Value" , status :  answer2.length > 0 ? true : false},
                    {id : 3 , text : "Activities" , status :  answer3.length > 0 ? true : false},
                    {id : 4 , text : "Strength" , status :  answer4.length > 0 ? true : false},
                ]

                res.status(200).json({
                    status: "success",
                    data : data,
                });
            }
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.getRaisec = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_raisec_difinition` , [], (err, result) => {
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

exports.getStr = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_strength` , [], (err, result) => {
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

exports.sendAnswer2 = async(req, res) => {
    try{
        let sql_answers = `SELECT * FROM tb_answer_2 WHERE student_id = $1 AND quiz_id = $2 AND status != 'delete'`
        let data_answers = (await (db.query(sql_answers, [req.payload.id , req.body.quiz_id ]))).rows

        if(data_answers.length > 0){
            for(let data of data_answers){
                let sql_update = `UPDATE tb_answer_2 SET status = 'delete' WHERE id = $1`
                await db.query(sql_update, [data.id])
            }   
        }
        
        let sql = `INSERT INTO tb_answer_2 ( student_id , total_score , quiz_id , created_date , status , achievement , independence , recognition , relationships , support , working_conditions)
                VALUES ($1 , $2 ,$3 ,$4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 )  RETURNING id`

        let data = [ req.payload.id , req.body.score.total_score , req.body.quiz_id ,  new Date() , 'use' , req.body.score.achievement , 
                        req.body.score.independence , req.body.score.recognition , req.body.score.relationships , req.body.score.support , req.body.score.working_conditions  ]
        let answer = (await (db.query(sql, data))).rows[0].id

        let sql_detail = `INSERT INTO tb_answer_detail( answer_id , quiz_choice_id , answer , point) VALUES ($1 , $2 ,$3 ,$4)`
        for(let index of req.body.quiz){
            await (db.query(sql_detail, [answer , index.quiz_id , index.answer , index.point ]))
        }

        res.status(200).json({
            status: "success",
            message: "success",
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.sendAnswer3 = async(req, res) => {
    try{
        let sql_answers = `SELECT * FROM tb_answer_3 WHERE student_id = $1 AND quiz_id = $2 AND status != 'delete'`
        let data_answers = (await (db.query(sql_answers, [req.payload.id , req.body.quiz_id ]))).rows

        if(data_answers.length > 0){
            for(let data of data_answers){
                let sql_update = `UPDATE tb_answer_3 SET status = 'delete' WHERE id = $1`
                await db.query(sql_update, [data.id])
            }   
        }
        
        let sql = `INSERT INTO tb_answer_3 ( student_id , total_score , quiz_id , created_date , status )
                VALUES ($1 , $2 ,$3 ,$4 , $5 )  RETURNING id`

        let data = [ req.payload.id , req.body.total_score , req.body.quiz_id ,  new Date() , 'use' ]
        let answer = (await (db.query(sql, data))).rows[0].id

        let sql_detail = `INSERT INTO tb_answer_detail( answer_id , quiz_choice_id , answer , point) VALUES ($1 , $2 ,$3 ,$4)`
        for(let index of req.body.quiz){
            await (db.query(sql_detail, [answer , index.quiz_id , index.answer , index.point ]))
        }

        res.status(200).json({
            status: "success",
            message: "success",
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}

exports.sendAnswer4 = async(req, res) => {
    try{
        let sql_answers = `SELECT * FROM tb_answer_4 WHERE student_id = $1 AND quiz_id = $2 AND status != 'delete'`
        let data_answers = (await (db.query(sql_answers, [req.payload.id , req.body.quiz_id ]))).rows

        if(data_answers.length > 0){
            for(let data of data_answers){
                let sql_update = `UPDATE tb_answer_4 SET status = 'delete' WHERE id = $1`
                await db.query(sql_update, [data.id])
            }   
        }

        let sql = `INSERT INTO tb_answer_4 ( student_id , total_score , quiz_id , created_date , status , presence , competing , relating , achieving  , future_thinker , discoverer , caring , confidence , dependability , organizer )
                VALUES ($1 , $2 ,$3 ,$4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , $15 )  RETURNING id`

        let data = [ req.payload.id , req.body.score.total_score , req.body.quiz_id ,  new Date() , 'use' , req.body.score.presence, req.body.score.competing, req.body.score.relating, req.body.score.achieving ,req.body.score.future_thinker , req.body.score.discoverer , req.body.score.caring
        , req.body.score.confidence , req.body.score.dependability , req.body.score.organizer]
        let answer = (await (db.query(sql, data))).rows[0].id

        let sql_detail = `INSERT INTO tb_answer_detail( answer_id , quiz_choice_id , answer , point) VALUES ($1 , $2 ,$3 ,$4)`
        for(let index of req.body.quiz){
            await (db.query(sql_detail, [answer , index.quiz_id , index.answer , index.point ]))
        }

        let sql_spacial = `INSERT INTO tb_answer_spacial( answer_id , text) VALUES ($1 , $2 )`
        for(let item of req.body.right){
            await (db.query(sql_spacial, [answer , item]))
        }

        res.status(200).json({
            status: "success",
            message: "success",
        });
    }catch(err){
        res.status(400).json({status: "error", message : err.message, });
    }
}