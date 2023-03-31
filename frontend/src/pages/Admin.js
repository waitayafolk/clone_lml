import React , {useState , useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Modal  from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2';
import {addAdmin , getAdmins , deleteAdminchoose} from '../api_connection/Admin'

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function Admin() {
  const [open , setOpen] = useState(false)
  const [admins , setAdmins] = useState([])
  const [admin , setAdmin] = useState({
    id : 0,
    username : "",
    password : "",
    name : '',
    cheangpassword : false ,
    role : ''
  })

  useEffect(()=>{
    getAdmin()
  },[])

  const getAdmin = async () => {
    const res = await getAdmins()
    setAdmins(res.data)
  }

  const handleOpen = async ()=>{
    setOpen(true)
    setAdmin({
      id : 0,
      username : "",
      password : "",
      name : '' ,
      cheangpassword : false , 
      role : ''
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(admin.role == '' || admin.role == null || admin.role == undefined){
      Swal.fire({
        title: 'Error!',
        text: 'กรุณาเลือกระดับแอดมิน',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }else{
      let res = await addAdmin(admin)
      if(res.status == 'success'){
         getAdmin()
        Swal.fire({
          title: 'Success!',
          text: res.message,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        setOpen(false)
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'เกิดข้อผิดพลาด',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    }
  }

  const handleChangeReserveData  = (prop) => (event) => {
    setAdmin({...admin , [event.target.name] : event.target.value})
  }

  const handleChange2 = (event) => {
    setAdmin({...admin , cheangpassword : event.target.checked})
  };

  const deleteAdmin = async (id) => {
    Swal.fire({
      title: 'ยืนยันการทำรายการ?',
      text: "ยืนยันการลบจริงหรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
      if (result.isConfirmed) {
        let res = await deleteAdminchoose(id) 
        if(res.message == "success"){
          getAdmin()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
       
      }
    })
  }

  return (
    <div>
        <Header />
        <Menu />
          <div className='content-wrapper' style={{backgroundColor : 'white'}}>
            <div className="content-header">
              <div className="container-fluid">   
                  <div className="row mb-2">
                      <div className="col-sm-6" style={{textAlign : 'left'}}>
                          <h1 className="m-0">รายการแอดมิน</h1>
                      </div>
                  </div>
              </div>
            </div>
            <section className="content">
              <div className='row' style={{padding : 30}}>
                <div className='col-6'>
                  <div className='row'>
                    <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                      <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-ml-8 col-lg-12'>
                          <button onClick={()=>{handleOpen()}} type="button" className="btn btn-block btn-primary">เพิ่มข้อมูลแอดมิน</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="content">
              <div className='table-responsive'>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th style={{width : 50 , textAlign : 'center'}}>ลำดับ</th>
                      <th>ชื่อผู้ใช้</th>
                      <th>ชื่อ</th>
                      <th>ระดับ</th>
                      <th style={{width : 400 , textAlign : 'center'}}>จัดการ</th>
                      {/* <th>ลบ</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((item , index)=>{
                      item.cheangpassword = false
                      return(
                        <tr>
                          <td style={{textAlign : 'center'}}>{index+1}</td>
                          <td>{item.username}</td>
                          <td>{item.name}</td>
                          <td>{item.role}</td>
                          <td>
                            <div className="row">
                              <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6 p-2'>
                                <button onClick={()=>{setOpen(true) ; console.log(item) ; setAdmin(item)}} type="button" className="btn btn-block btn-warning">แก้ไข</button>  
                              </div>
                              <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6 p-2'>
                                <button onClick={()=>{deleteAdmin(item.id)}} type="button" className="btn btn-block btn-danger">ลบ</button>  
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    }
                    )}
                  </tbody>
                </table>
              </div>
            </section>
            {/* admins */}
          </div>
          <Modal size='ml' show={open} onHide={()=>{setOpen(false)}}>
            <Modal.Header closeButton>
              <Modal.Title>เพิ่มข้อมูลแอดมิน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-ml-12 col-lg-12'>
                      <div className="form-group">
                        <label>ชื่อ</label>
                        <input required type='text' name="name" onChange={handleChangeReserveData("name")} value={admin.name} className='form-control' placeholder='ชื่อ'  />
                      </div>
                    </div>  
                    <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                      <div className="form-group">
                        <label>Username</label>{" "}
                        <input required type='text' name="username" onChange={handleChangeReserveData("username")} value={admin.username} className='form-control' placeholder='Username'  />
                      </div>
                    </div>  
                    <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                      <div className="form-group">
                        <label>Password</label> {" "}
                        <input type='checkbox' onChange={handleChange2}  />
                        {/* <Checkbox  onChange={handleChange2} /> */}
                        <input disabled={admin.cheangpassword != true ? true : false} required type='password' name="password" onChange={handleChangeReserveData("password")} value={admin.password} className='form-control' placeholder='Password'  />
                      </div>
                    </div>  
                    <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                      <div className="form-group">
                      <label> เลือกระดับแอดมิน</label>{" "}
                        <select id="inputState" name="role" onChange={handleChangeReserveData("role")} value={admin.role} className="form-control">
                          <option name="role" value="">
                              ----* ระดับ *----  {admin.role}
                          </option>
                          <option name="role" value="admin">
                              admin
                          </option>
                          <option name="role" value="super admin">
                            super admin
                          </option>
                        </select>
                      </div>
                    </div>  
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setOpen(false)}>
                        ปิด
                    </Button>
                    <Button type="submit" variant="primary">
                        บันทึก
                    </Button>
                  </Modal.Footer>
                </form>
              </div> 
            </Modal.Body>
          </Modal>
              
    </div>
    
  )
}
