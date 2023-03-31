import React , {useState , useEffect} from 'react'
import Header from '../components/Header'
import Menu from '../components/Menu'
import axios from 'axios'
import { loadCompany , saveSetting } from '../api_connection/Admin'
import Swal from 'sweetalert2'
var XLSX = require("xlsx");

export default function Setting() {
    const [company , setCompany] = React.useState({
        id : 0,
        name : '' ,
        name_eng : '' ,
        set_expried :0 ,
        address : '',
        logo : '',
        phone : '',
        tex_code : '',
    })

    useEffect(()=>{
        getCompany()
    },[])

    const getCompany = async () => {
        let res = await loadCompany()
        setCompany(res.data)
    }

    const readUploadFile = async (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = async(e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data_insert = XLSX.utils.sheet_to_json(worksheet);
                let val = []
                let count = data_insert.length/12
                let total = 1

                for(let index = 1 ; index <= count ; index++){
                    for(let index in data_insert){
                        if(total <= count){
                            if(total == 1 ){
                                if(index < total * 12){
                                    val.push(data_insert[index])
                                }
                            }else{
                                if(index > total*12-13 && index < total * 12){
                                    val.push(data_insert[index])
                                }
                            }
                        }            
                    }
                    let res = await axios.post('http://localhost:4600/import-excel', val)
                    if(res.data.status == "success" ){
                        total++
                        val = []
                    }
                }
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }

    const handleChangeReserveData  = (prop) => (event) => {
        setCompany({...company , [event.target.name] : event.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(Number(company.set_expried) > 12 ){
            Swal.fire({
                title: 'Error!',
                text: 'กรูณาตั้งค่าวันหมดอายุไม่เกิน 12 เดือน',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }else{
            let res = await saveSetting(company)
            if(res.status == 'success'){
              Swal.fire({
                title: 'Success!',
                text: res.message,
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              getCompany()
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

    return (
        <>
            <Header />
            <Menu />
            <div className='content-wrapper' style={{backgroundColor : 'white'}}>
                <div className="content-header">
                    <div className="container-fluid">   
                        <div className="row mb-2">
                            <div className="col-sm-6" style={{textAlign : 'left'}}>
                                <h1 className="m-0">ตั้งค่าระบบ</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <input
                    onChange={readUploadFile}
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    autoComplete="off"
                    name="name"
                    placeholder="เลือกไฟล์ภาพ"
                /> */}
                <section className="content" style={{padding : 30}}>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                <div className="form-group">
                                    <label>ชื่อบริษัท</label>
                                    <input required type='text' name="name" onChange={handleChangeReserveData("name")} value={company.name} className='form-control' placeholder='ชื่อบริษัท'  />
                                </div>
                            </div>  
                            <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                <div className="form-group">
                                    <label>ชื่อบริษัท(ENG)</label>
                                    <input required type='text' name="name_eng" onChange={handleChangeReserveData("name_eng")} value={company.name_eng} className='form-control' placeholder='ชื่อบริษัท(ENG)'  />
                                </div>
                            </div>  
                            <div className='col-12 col-sm-12 col-md-12 col-ml-12 col-lg-12'>
                                <div className="form-group">
                                    <label>ที่อยู่</label>
                                    <textarea required type='text' name="address" onChange={handleChangeReserveData("address")} value={company.address} className='form-control' placeholder='ที่อยู่'  />
                                </div>
                            </div> 
                            <div className='col-12 col-sm-12 col-md-4 col-ml-4 col-lg-4'>
                                <div className="form-group">
                                    <label>เบอร์โทร</label>
                                    <input type='text' name="phone" onChange={handleChangeReserveData("phone")} value={company.phone} className='form-control' placeholder='เบอร์โทร'  />
                                </div>
                            </div>  
                            <div className='col-12 col-sm-12 col-md-4 col-ml-4 col-lg-4'>
                                <div className="form-group">
                                    <label>เลขผู้เสีบภาษี</label>
                                    <input required type='text' name="tex_code" onChange={handleChangeReserveData("tex_code")} value={company.tex_code} className='form-control' placeholder='เลขผู้เสีบภาษี'  />
                                </div>
                            </div>  
                            <div className='col-12 col-sm-12 col-md-4 col-ml-4 col-lg-4'>
                                <div className="form-group">
                                    <label>กำหนดวันหมดอายุ test code (เดือน)</label>
                                    <input required type='text' name="set_expried" onChange={handleChangeReserveData("set_expried")} value={company.set_expried} className='form-control' placeholder='กำหนดวันหมดอายุ'  />
                                </div>
                            </div> 
                        </div>
                        <div className='col-12 text-center'>
                            <button className='btn btn-primary' type='submit'>
                                บันทึก    
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}
