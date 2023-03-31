import React , {useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import Logo from '../assets/img/logo-lml.png'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [invaliduser, setInvaliduser] = useState(false)
    const [invalipassword, setInvaliPassword] = useState(false)
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChangeReserveData = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
        if(prop === "username" ){
            if(event.target.value === ""){
                setInvaliduser(true)
            }else{
                setInvaliduser(false)
            }
        }

        if(prop === "password" ){
            if(event.target.value === ""){
                setInvaliPassword(true)
            }else{
                setInvaliPassword(false)
            }
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(user.username != "" && user.password != ""){
            axios.post(`${process.env.REACT_APP_API_URL}/login`, user).then(
                (response) => {
                    if(response.data.status === "success"){
                       Swal.fire({
                            icon: 'success',
                            title: 'Login Success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('admin', JSON.stringify(response.data.data));
                        navigate("/app/student")
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

    return (
        <>
            <div className='fixed-top' aria-hidden="false" style={{textAlign : 'center' , padding : 15 , backgroundColor : '#ffb74d'}}>
                <div style={{padding : 15}}>
                    {/* <span style={{fontWeight : 'bold'}}>ระบบหลังบ้าน LEARN MY LIFT จัดการข้อมููลนักเรียน 
                        <img 
                            src={`${Logo}`}
                            style={{height : 50}}
                        />
                    </span> */}
                </div>
            </div>
            <div className='hold-transition login-page' style={{backgroundImage: 'linear-gradient(135deg, rgba(0, 188, 212, 1) 0%, rgba(33, 150, 243, 1) 100%)'}}>
           
                <div className="login-box">
                    <div className="login-logo" style={{color : 'white' , fontWeight : 'bold' , textAlign : 'center' , fontSize : 25}}>
                        <b>ระบบจัดการข้อมูล LOL 360</b> 
                        {/* <img 
                            src={`${Logo}`}
                            style={{height : 50}}
                        /> */}
                    </div>
                    <div className="card" style={{backgroundColor : 'white'}}>
                        <div className="card-body login-card-body" style={{borderRadius: 35 , boxShadow: '-5px -10px 12px 6px rgba(0, 0, 0, 0.1)' ,  backgroundColor : 'white'}}>
                            <p className="login-box-msg" style={{color : 'black' , fontWeight : 'bold'}}>Sign in to start your session</p>
                            <form onSubmit={handleSubmit} >
                                <div className="input-group mb-4">
                                    <input  
                                        style={{ backgroundColor : 'white' , color : 'black'}}
                                        onChange={handleChangeReserveData("username")} 
                                        autoComplete="off" 
                                        value={user.username} 
                                        name="username" 
                                        type="text" 
                                        className={`form-control ${invaliduser == true ? "is-invalid" : ""}`} 
                                        placeholder="Username"
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-user" />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-4">
                                    <input 
                                        style={{ backgroundColor : 'white' , color : 'black'}}
                                        type="password"  
                                        onChange={handleChangeReserveData("password")} 
                                        className={`form-control ${invalipassword == true ? "is-invalid" : ""}`} 
                                        name="password" autoComplete="off" 
                                        value={user.password} 
                                        placeholder="Password" 
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        
                                    </div>
                                    <div className="col-4">
                                        <button type="submit"  style={{backgroundColor : '#2196f3' , borderColor : '#2196f3' , fontWeight : 'bold'}} className="btn btn-primary btn-block">Sign In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
