import React from 'react'
import Logo from '../assets/img/logo-lml.png'
import { useNavigate } from "react-router-dom";

export default function ThankPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className='fixed-top' aria-hidden="false" style={{ padding : 15 , backgroundColor : '#ffb74d'}}>
        <div className='row'>
          <div className='col-4'>
            <div style={{}}>
              {/* <i style={{fontSize : 20 , color : 'white' , fontWeight : 'bold'}} class={'nav-icon fa fa-caret-left'}></i> */}
            </div>
            
          </div>
          <div className='col-4' style={{textAlign : 'center' }}>
              <span style={{fontWeight : 'bold' }}>แบบสอบถาม
                  <img 
                      src={`${Logo}`}
                      style={{height : 50}}
                  />
              </span>
          </div>
          <div className='col-4'>
              
          </div>
        </div>
      </div>
      <div className='hold-transition login-page' style={{color : 'white' , backgroundImage: 'linear-gradient(135deg, rgba(0, 188, 212, 1) 0%, rgba(33, 150, 243, 1) 100%)'}}>
            <b style={{fontSize: 50 , fontWeight : 'bold'}}>LEARN MY LIFE</b> 
            <p style={{fontSize: 30 , fontWeight : 'bold'}}>ขอขอบคุณทุกท่านที่เข้ามาทำแบบสอบถาม</p>
            <b style={{fontSize: 50 , fontWeight : 'bold'}}>THANK YOU</b> 
            <div onClick={()=>{navigate("/student-page")}}>
              <button  className='btn btn-primary' type='button' style={{color : 'black' , fontSize : 22 , backgroundColor : '#ffca28' , borderColor : '#ffca28'}}>
                  กลับสู่หน้าหลัก
              </button>
            </div>
      </div>
    </>
  )
}
