import React , {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import img from '../assets/img/available.jpeg'
import { uploadFileImage , addMember } from '../api_connection/Member'
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'

import "react-datepicker/dist/react-datepicker.css"

export default function ModalAddUser(props) {
    let {open , value , onHide , saveSuccess } = props
    const [member , setMember] = useState({
        id : value.id,
        frist_name: value.frist_name,
        last_name: value.last_name,
        email: value.email,
        mobile: value.mobile,
        address: value.address,
        image : value.image,
        id_number : value.id_number,
        prefix : value.prefix,
        birthday : value.birthday,
    });

    console.log(member)
    console.log(value)
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const handleChangeReserveData = (prop) => (event) => {
        setMember({ ...member, [prop]: event.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let result = await addMember(member);
        if(result.status == 'success'){
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Success Add Member',
            })
            saveSuccess()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        } 
    }

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        let result = await uploadFileImage(formData);
    };

  return (
    <Modal
        show={open}
        onHide={onHide}
        size="lg"
        // backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
            <Modal.Title>เพิ่มสมาชิก </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
                <form onSubmit={handleSubmit} className='col-12'>
                    <div className='row'>
                        {/* <div className='col-12 col-md-12'>
                            <div className='text-center'>
                                <div style={{ padding: 20 }}>
                                    {member.image != "" ? (
                                    <>
                                        <img
                                        src={`${member.image}`}
                                        style={{ width: 150, width: 150 }}
                                        />
                                    </>
                                    ) : (
                                    <>
                                        <img
                                        style={{ width: 150, width: 150 }}
                                        src={img}
                                        />
                                    </>
                                    )}
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-ml-12 col-xl-12 text-center">
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input
                                                    onChange={saveFile}
                                                    type="file"
                                                    className="form-control-file"
                                                    id="exampleFormControlFile1"
                                                    autoComplete="off"
                                                    name="name"
                                                    placeholder="เลือกไฟล์ภาพ"
                                                />
                                            </div>
                                            <div className="input-group-append">
                                                <a
                                                    onClick={uploadFile}
                                                    type="button"
                                                    className="input-group-text"
                                                    style={{ backgroundColor: "white" , color : 'black'}}
                                                >
                                                    <h3 className="card-title">
                                                    <span>
                                                        <i className="icon fa fa-upload" />
                                                    </span>{" "}
                                                    UploadFile
                                                    </h3>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className='col-12 col-md-6 col-ld-6' style={{paddingTop : 20}}>
                            <div className='row'>
                                <div className='col-4 col-md-4 col-ld-4'>
                                    <div className='form-group'>
                                            <div className="form-check">
                                            <input className="form-check-input" onClick={()=>{setMember({ ...member, prefix: 'นาย' })}} type="radio" checked={member.prefix == 'นาย' ? true : false}/>
                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                                นาย
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4 col-md-4 col-ld-4'>
                                    <div className='form-group'>
                                            <div className="form-check">
                                            <input className="form-check-input" onClick={()=>{setMember({ ...member, prefix: 'นางสาว' })}} type="radio" checked={member.prefix == 'นางสาว' ? true : false}/>
                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                                นางสาว
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4 col-md-4 col-ld-4'>
                                    <div className='form-group'>
                                            <div className="form-check">
                                            <input className="form-check-input" onClick={()=>{setMember({ ...member, prefix: 'นาง' })}} type="radio" checked={member.prefix == 'นาง' ? true : false}/>
                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                                นาง
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-ld-6'>
                            <label>วันเกิด</label>
                            <DatePicker className='form-control' ateFormat="P" selected={startDate} onChange={(date) => {setStartDate(date) ; setMember({ ...member, birthday: date }) } } />
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='form-group'>
                                <label>ชื่อ</label>
                                <input type='text' required name="frist_name" onChange={handleChangeReserveData("frist_name")} value={member.frist_name} className='form-control' placeholder='ชื่อ' />
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='form-group'>
                                <label>นามสกุล</label>
                                <input type='text' required name="last_name" onChange={handleChangeReserveData("last_name")} value={member.last_name} className='form-control' placeholder='นามสกุล' />
                            </div>
                        </div>
                        <div className='col-12 col-md-12'>
                            <div className='form-group'>
                                <label>เลขบัตร</label>
                                <input type='number' required name="id_number" onChange={handleChangeReserveData("id_number")} value={member.id_number} className='form-control' placeholder='เลขบัตร' />
                            </div>
                        </div>
                        <div className='col-12 col-md-12'>
                            <div className='form-group'>
                                <label>ที่อยู่</label>
                                <input type='text' required name="address" onChange={handleChangeReserveData("address")} value={member.address} className='form-control' placeholder='ที่อยู่' />
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='form-group'>
                                <label>E-mail</label>
                                <input type='email' name="email" onChange={handleChangeReserveData("email")} value={member.email} className='form-control' placeholder='E-mail' />
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='form-group'>
                                <label>เบอร์โทร</label>
                                <input type='text' required name="mobile" onChange={handleChangeReserveData("mobile")} value={member.mobile} className='form-control' placeholder='เบอร์โทร' />
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
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
  )
}
