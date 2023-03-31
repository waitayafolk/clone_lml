const express = require("express");
const app = express();
const port = 4600;
const conpool = require("./Connect/db_connect");
var cors = require("cors");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const fileUpload = require("express-fileupload");
var bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      res.status(401).json({ status: err.message });
    } else {
      if (Date.now() >= payload.exp * 1000) {
      } else {
        req.payload = payload;
        next();
      }
    }
  });
};

const quiz = require("./Router/router_quiz");
const students = require("./Router/router_students");
// 
// const banks = require("./Router/router_banks");
// const villages = require("./Router/router_villages");
const admin = require("./Router/router_admins");

app.use("/upload", express.static("upload"));
app.use("/upload/logo", express.static("upload/logo"));

app.use(bodyParser.json());
app.use(cors());

app.use(fileUpload());

app.use("/admins", verifyToken , admin);
app.use("/students", verifyToken , students);
app.use("/quiz", verifyToken ,quiz);


app.get("/", function (req, res) {
  res.send("Api It Working !");
});
       
app.post("/import-excel", async function (req, res) {
  for(let i of req.body){
    await conpool.query(`INSERT INTO tb_jobs_abilitie( onet_code , title , element_id  , title_en , abilitie_en , abilitie , scale_id , scale_name , importan_score ) 
      VALUES($1 ,$2 , $3 , $4 , $5 , $6 , $7 ,$8 , $9  )  `, 
    [i.a , i.b , i.c ,  i.d , i.e , i.f , i.g , i.h , i.i ])
  }
  res.status(200).json({ status: "success" });
});

app.post("/send-email" ,async function (req, res) {
  try{
    let student = (await conpool.query(`SELECT * FROM tb_student WHERE username = $1 `, [req.body.email])).rows[0]
    if(student == undefined){
      res.status(200).json({
        status: "error",
        message : "Don't have text code !!"
      });
    }else{
      conpool.query(
        `SELECT * FROM tb_student WHERE username = $1 `,
        [req.body.email],
        async (err, result) => {
          if (err) {
              throw Error(err);
          } else {
              let student_login = result.rows[0]

              if (student_login != undefined) {

                if (student_login) {
                  let payload = {
                    id: student_login.id,
                    text_code: student_login.username,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                  };
                  let token = jwt.sign(payload, secretKey);
                  res.status(200).json({
                    token : token , 
                    status: "success",
                    text_code: student_login.username,
                    id: student_login.id,
                    email : student_login.email, 
                    name : `${student_login.student_name} ${student_login.student_surname}`,
                    school : student_login.school , 
                    mobile : student_login.mobile , 
                    education_years : student_login.education_years
                  });
                } else {
                  res.status(401).json({
                    status: "error",
                    message: "Username or Password is incorrect",
                  });
                }
              }else{
                res.status(401).json({
                  status: "error",
                  message: "Username or Password is invalid",
                });
              }
          }
        }
      )
    }
  }catch(error){
    res.status(400).json({ status: error.message });
  }
})

app.post("/check-code" ,async function (req, res) {
  try{
    let auth_code = await conpool.query(`SELECT * FROM email_auth WHERE email = $1 AND auth = $2 AND status = false `, [req.body.email , req.body.code])
    let now = new Date();
    let expire_time = new Date(auth_code.rows[0].created_date);
    if(now-expire_time > 5*60*1000){
      res.status(200).json({ status: "Code Expire" });
    }else{
      await conpool.query(`UPDATE email_auth SET status = true WHERE id = $1 `, [auth_code.rows[0].id]) 
      res.status(200).json({ status: "success" });
    }
  }catch(error){
    res.status(400).json({ status: error.message });
  }
})

app.post("/login", async function (req, res) {
  try{
    conpool.query(
      `SELECT * FROM tb_admin WHERE username = ($1)`,
      [req.body.username],
      async (err, result) => {
        if (err) {
            throw Error(err);
        } else {
            let admin = result.rows[0]
            if (admin) {
              let password = await bcrypt.compareSync(req.body.password, admin.password)
              if (password) {
                let payload = {
                  id: admin.id,
                  username: admin.username,
                  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                };
                let token = jwt.sign(payload, secretKey);
                res.status(200).json({
                  status: "success",
                  token: token,
                  data: admin,
                });
              } else {
                res.status(401).json({
                  status: "error",
                  message: "Username or Password is incorrect",
                });
              }
            }else{
              res.status(401).json({
                status: "error",
                message: "Username or Password is invalid",
            });
          }
        }
      }
    )
  }catch(error){
    res.status(400).json({ status: error.message });
  }
    
    // let password = await bcrypt.hashSync(req.body.password, 12)

    // let password2 = await bcrypt.hashSync(req.body.password, 12) 
    // console.log('password 1 :' + password)
    // console.log('password 2 :' + password2)
    // console.log(await bcrypt.hashSync(req.body.password, 12))
});

// app.post("/pictureService", verifyToken, (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" });
//   }

//   const file = req.files.file;
//   file.mv(`${__dirname}/upload/${req.payload.id}_${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//     res.json({ status: "success", fileName: `${req.payload.id}_${file.name}` });
//   });
// });

app.post("/upload", verifyToken, (req, res) => {
    // if (req.files === null || req.files === undefined) {
    //     return res.status(400).json({ msg: "No file uploaded" });
    // }

    // const file = req.files.file;
    console.log(req.body.fileName)
    // file.mv(`${__dirname}/upload/image/${file.name}`, (err) => {
    //     if (err) {
    //     console.error(err);
    //     return res.status(500).send(err);
    //     } else {
    //     conpool.query(
    //         `UPDATE tb_company SET image_logo = $1 
    //                         WHERE id = $2 `,
    //         [`${file.name}`, req.payload.id],
    //         async (err, result) => {
    //         if (err) {
    //             throw Error(err);
    //         } else {
    //             res.json({ status: `success` });
    //         }
    //         }
    //     );
    //     }
    // });
});

app.get('/download_csv',(req, res) => {
  res.download('data.csv');
});

app.listen(port, function () {
  // console.log(process.env.PORT)
  console.log(`App listening on port ${port}!`);
});