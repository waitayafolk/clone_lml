var db = require("../../Connect/db_connect");
var bcrypt = require("bcrypt");

exports.deleteAdmin = async (req, res) => {
    try{
        db.query(`UPDATE tb_admin SET status = 'delete' WHERE id = $1 `,
        [req.params.id] ,
        (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                    message: "success",
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.saveSetting = async (req, res) => {
    try{
        db.query(`UPDATE tb_setting SET name = $1 , name_eng = $2 , set_expried = $3 , address = $4 , phone = $5 , tex_code = $6 WHERE id = $7 `,
        [req.body.name , req.body.name_eng , req.body.set_expried , req.body.address , req.body.phone , req.body.tex_code , req.body.id] ,
        (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                res.status(200).json({
                    status: "success",
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}

exports.getCompany = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_setting WHERE id = 1`, (err, result) => {
            if (err) {
                throw Error(err);
            } else {
                // console.log()
                res.status(200).json({
                    status: "success",
                    data: result.rows[0],
                });
            }
        });
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}


exports.getAdmin = async (req, res) => {
    try{
        db.query(`SELECT * FROM tb_admin WHERE status != 'delete' Order by id DESC `, (err, result) => {
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

exports.saveAdmin = async (req, res) => {
    try{
        if(req.body.id == 0 ){
            db.query(`INSERT INTO tb_admin (name, username, password , role  , status) VALUES ($1 , $2 , $3  , $4 ,$5 ) ` , [req.body.name , req.body.username , await bcrypt.hashSync(req.body.password, 12),  req.body.role , 'use'], (err, result) => {
                if (err) {
                    throw Error(err);
                } else {
                    res.status(200).json({
                        status: "success",
                        message : 'เพิ่มข้อมูลสำเร็จ'
                    });
                }
            });
        }else{
            if(req.body.cheangpassword == true){
                db.query(`UPDATE tb_admin SET name = $1 , username = $2 , password = $3 , role = $4 WHERE id = $5 ` , [req.body.name , req.body.username , await bcrypt.hashSync(req.body.password, 12) , req.body.role, req.body.id], (err, result) => {
                    if (err) {
                        throw Error(err);
                    } else {
                        res.status(200).json({
                            status: "success",
                            message : 'แก้ไขข้อมูลสำเร็จ'
                        });
                    }
                });
            }else{
                db.query(`UPDATE tb_admin SET name = $1 , username = $2 , role = $3 WHERE id = $4` , [req.body.name , req.body.username , req.body.role , req.body.id], (err, result) => {
                    if (err) {
                        throw Error(err);
                    } else {
                        res.status(200).json({
                            status: "success",
                            message : 'แก้ไขข้อมูลสำเร็จ'
                        });
                    }
                });
            }
            
        }
    }catch(err){
         res.status(400).json({status: "error", message : err.message, });
    }
}