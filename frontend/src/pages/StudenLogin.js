import React , {useState} from 'react'
import Logo from '../assets/img/logo-lml.png'
import axios from 'axios'
import Swal from 'sweetalert2'
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";

export default function StudenLogin() {
    const navigate = useNavigate();
    const [invalidemail, setInvalidemail] = useState(false)
    const [invalidecode, setInvalidecode] = useState(false)
    const [email , setEmail] = useState("")
    const [wait_auth , setWait_auth] = useState(false)
    const [code , setCode] = useState("")
    const [loading , setLoading] = useState(false)

    const handleChangeReserveData = (prop) => (event) => {
        if(event.target.value === ""){
            setInvalidemail(true)
        }else{
            setInvalidemail(false)
        }
        setEmail(event.target.value);
    };

    const handleChangeReserveDataCode = (prop) => (event) => {
        if(event.target.value === ""){
            setInvalidecode(true)
        }else{
            setInvalidecode(false)
        }
        setCode(event.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(email != ""){
            setLoading(true)
            axios.post(`${process.env.REACT_APP_API_URL}/send-email`, {email : email}).then(
                (response) => {
                    if(response.data.status === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Login Success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        localStorage.setItem('token-studebts', response.data.token);
                        localStorage.setItem('students', JSON.stringify(response.data));
                        navigate("/student-page")
                        
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'ไม่มี Text Code นี้ในระบบ !',
                        })
                        setLoading(false)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error.response)
                    setLoading(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            )
        }else{
            setInvalidemail(true)
            axios.post(`${process.env.REACT_APP_API_URL}/send-email`, {email : email}).then(
                (response) => {
                    if(response.data.status === "success"){
                        setWait_auth(true)
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Send Success !!',
                            text: 'ตรวจสอบ Email !',
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    }
                }
            ).catch(
                (error) => {
                    console.log(error.response)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            )
        }
    }

    // const confirmCode = async() => {
    //     if(code == ""){
    //         setInvalidecode(true)
    //     }else{
    //         axios.post(`${process.env.REACT_APP_API_URL}/check-code`, {code : code , email : email}).then(
    //             (response) => {
    //                 if(response.data.status === "success"){
    //                     setWait_auth(true)
    //                     setLoading(false)
    //                     Swal.fire({
    //                         icon: 'success',
    //                         title: 'Send Success !!',
    //                         text: 'ตรวจสอบ Email !',
    //                     })
    //                 }else{
    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Oops...',
    //                         text: 'Something went wrong!',
    //                     })
    //                 }
    //             }
    //         ).catch(
    //             (error) => {
    //                 console.log(error.response)
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Oops...',
    //                     text: 'Something went wrong!',
    //                 })
    //             }
    //         )
    //     }
    // }

  return (
    <>
        <div className='fixed-top' aria-hidden="false" style={{textAlign : 'center' , padding : 15 , backgroundColor : '#ffb74d'}}>
            <div >
                <span style={{fontWeight : 'bold' }}>ระบบเข้าทำแบบสอบถาม
                    <img 
                        src={`${Logo}`}
                        style={{height : 50}}
                    />
                </span>
            </div>
        </div>
        <div className='hold-transition login-page' style={{backgroundImage: 'linear-gradient(135deg, rgba(0, 188, 212, 1) 0%, rgba(33, 150, 243, 1) 100%)'}}>
            <div className="login-box">
                <div className="login-logo" style={{color : 'white' , fontWeight : 'bold'}}>
                    <b>Career Test 360</b> 
                </div>
                <div className="card" style={{backgroundColor : 'white'}}>
                    <div className="card-body login-card-body" style={{borderRadius: 35 , boxShadow: '-5px -10px 12px 6px rgba(0, 0, 0, 0.1)' ,  backgroundColor : 'white'}}>
                        <p className="login-box-msg" style={{color : 'black' , fontWeight : 'bold'}}>กรอกรหัสที่ได้รับจากทาง Email<br/>(Fill in Test Code)</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-4">
                                <input  
                                    style={{ backgroundColor : 'white' , color : 'black'}}
                                    onChange={handleChangeReserveData("email")} 
                                    autoComplete="off" 
                                    name="email" 
                                    type="text" 
                                    className={`form-control ${invalidemail == true ? "is-invalid" : ""}`} 
                                    placeholder="Test Code"
                                    
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                                {invalidemail == true ? <>
                                    <div id="validationServer03Feedback" className="invalid-feedback">
                                        Please enter test code !.
                                    </div>
                                </> : <></>}
                                
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    
                                </div>
                                <div className="col-8">
                                    <LoadingButton loading={loading==true ? true : false} type="submit"  style={{backgroundColor : '#2196f3' , borderColor : '#2196f3' , fontWeight : 'bold', color: 'white'}} className="btn btn-primary btn-block">
                                        Submit
                                    </LoadingButton>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* {wait_auth == true ? <>
                        <div className="card-body login-card-body" style={{borderRadius: 35 , boxShadow: '-5px -10px 12px 6px rgba(0, 0, 0, 0.1)' ,  backgroundColor : 'white'}}>
                            <p className="login-box-msg" style={{color : 'black' , fontWeight : 'bold'}}>ป้อนรหัสจาก Email เพื่อเข้าระบบ</p>
                                <div className="input-group mb-4">
                                    <input  
                                        style={{ backgroundColor : 'white' , color : 'black'}}
                                        onChange={handleChangeReserveDataCode("code")} 
                                        value={code}
                                        autoComplete="off" 
                                        name="code" 
                                        type="text" 
                                        className={`form-control ${invalidecode == true ? "is-invalid" : ""}`} 
                                        placeholder="Your Code !"
                                        
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                    {invalidecode == true ? <>
                                        <div id="validationServer03Feedback" class="invalid-feedback">
                                            Please enter your code !.
                                        </div>
                                    </> : <></>}
                                    
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <LoadingButton onClick={()=>{setWait_auth(false)}} style={{ color: 'white' , backgroundColor : '#e53935' , borderColor : '#e53935' , fontWeight : 'bold'}} className="btn btn-primary btn-block">ยกเลิก</LoadingButton>
                                    </div>
                                    <div className="col-8">
                                        <LoadingButton onClick={()=>{confirmCode()}} style={{color: 'white' , backgroundColor : '#2196f3' , borderColor : '#2196f3' , fontWeight : 'bold'}} className="btn btn-primary btn-block">
                                            ยืนยันรหัส
                                        </LoadingButton>
                                    </div>
                                </div>
                        </div>
                    </> : <>
                        
                    </>} */}
                </div>
            </div>
        </div>
        <footer className="fixed-bottom" aria-hidden="false" style={{textAlign : 'center' , padding : 10 , backgroundColor : 'white'}}>
            <div className="d-none">
                <b>Version</b> 1.0.0
            </div>
            <strong>Copyright © 2022 <a href="#">LEARN MY LIFE</a>.</strong> All rights reserved.
        </footer>
    </>
  )
}
