import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from "@mui/x-data-grid";
import fileSaver from 'file-saver';
import Box from "@mui/material/Box";
import CustomToolbar from "../Toolbar";
import React , {useState , useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Modal  from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2';
import {getStudents, addStudents , sendStudents , sendStudentsTestCode , getPointStudents} from '../api_connection/Student'
const XLSX = require("xlsx");

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open , setOpen] = useState(false);
    const [openDetail , setOpenDetail] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [page, setPage] = useState(10);
    const [file , setFile ] = useState(null)
    const [student , setStudent] = useState({
        id: 0,
        email: "",
        student_name: "",
        student_surname: "",
        student_sex: "",
        birthday: new Date(),
        mobile: "",
        school: "",
        education_years: "",
        education_semester: "",
    })

    useEffect(()=>{
        loadStudents()
        // export_point()
    },[])

    const loadStudents = async () => {
        let res = await getStudents()
        for(let index in res.data){
            if(res.data[index].score_1 == null){
                res.data[index].score_1 = 0
            }
            if(res.data[index].score_2 == null){
                res.data[index].score_2 = 0
            }
            if(res.data[index].score_3 == null){
                res.data[index].score_3 = 0
            }
            if(res.data[index].score_4 == null){
                res.data[index].score_4 = 0
            }
            res.data[index].no = Number(index)+1
            res.data[index].name_student = `${res.data[index].student_name} ${res.data[index].student_surname}`
        }
        setStudents(res.data);
        setLoading(false);
    }

    const handleOpen = async ()=>{
        setOpen(true)
        setStudent({
            id: 0,
            email: "",
            student_name: "",
            student_surname: "",
            student_sex: "",
            birthday: new Date(),
            mobile: "",
            school: "",
            education_years: "",
            education_semester: "",
        })
    }

    const handleChangeReserveData = (prop) => (event) => {
        setStudent({ ...student, [prop]: event.target.value });
    };

    const sendTestCode = async (val)=>{
        let res = await sendStudentsTestCode(val)
        if(res.status == 'success'){
            Swal.fire({
                icon: 'success',
                title: 'ส่ง Test Code สำเร็จ',
                text: res.message,
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.message,
            })
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let data = await addStudents(student)
        if(data.status =='success'){
            loadStudents()
            setOpen(false)
            Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                text: data.message,
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
            })
        }
    }

    const readUploadFile = async (e) => {
        e.preventDefault();
        setFile(e)
    }

    const UploadFileExcel = async ()=>{
        Swal.fire({
            title: 'ยืนยันการทำรายการ?',
            text: "ยืนยันการรับเข้ารายการ excel!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, import now!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                if (file.target.files != null) {
                    let reader = new FileReader();
                    reader.onload = async(e) => {
                        const data = e.target.result;
                        const workbook = XLSX.read(data, { type: "array" });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const data_insert = XLSX.utils.sheet_to_json(worksheet);
                        let val = []
                        let count = data_insert.length/12|0+1
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
                            let res = await sendStudents(val)
                            if(res.status == 'success'){
                                total++
                                val = []
                                loadStudents()
                            }
                        }
                        Swal.fire({
                            icon: 'success',
                            title: 'บันทึกข้อมูลสำเร็จ',
                            text: "เพิ่มข้อมูลสำเร็จ",
                        })
                        setOpenDetail(false)
                    };
                    reader.readAsArrayBuffer(file.target.files[0]);
                }
            }
        })
    }

    const headerTable = [
        { field: "no", headerName: "ลำดับ", minWidth: 30, headerAlign: "center", align: "center",},
        { field: "username", headerName: "Test Code",  minWidth: 200, headerAlign: "center", align: "center",},
        { field: "name_student", headerName: "ชื่อ-สกุล",  minWidth: 200, headerAlign: "center", align: "center",},
        { field: "school", headerName: "โรงเรียน",  minWidth: 200, headerAlign: "center", align: "center",},
        { field: "education_years", headerName: "ระดับชั้น",  minWidth: 150, headerAlign: "center", align: "center",},
        { field: "education_semester", headerName: "ปีการศึกษา",  minWidth: 300, headerAlign: "center", align: "center",},
        { field: "mobile", headerName: "เบอร์โทร",  minWidth: 150, headerAlign: "center", align: "center",},
        { field: "score_1", headerName: "แบบทดสอบ 1",  minWidth: 100, headerAlign: "center", align: "center",
        renderCell: (params) => (
            <>
                {params.row.score_1 > null ? <div style={{color : '#81c784' , fontWeight : 'bold'}}>{params.row.score_1}</div> : <div style={{color : '#d32f2f' , fontWeight : 'bold'}}> 0 </div>}
            </>
            ),
        },
        { field: "score_2", headerName: "แบบทดสอบ 2",  minWidth: 100, headerAlign: "center", align: "center",
        renderCell: (params) => (
            <>
                {params.row.score_2 > null ? <div style={{color : '#81c784' , fontWeight : 'bold'}}>{params.row.score_2}</div> : <div style={{color : '#d32f2f' , fontWeight : 'bold'}}> 0 </div>}
            </>
            ),
        },
        { field: "score_3", headerName: "แบบทดสอบ 3",  minWidth: 100, headerAlign: "center", align: "center",
        renderCell: (params) => (
            <>
                {params.row.score_3 > null ? <div style={{color : '#81c784' , fontWeight : 'bold'}}>{params.row.score_3}</div> : <div style={{color : '#d32f2f' , fontWeight : 'bold'}}> 0 </div>}
            </>
            ),
        },
        { field: "score_4", headerName: "แบบทดสอบ 4",  minWidth: 100, headerAlign: "center", align: "center",
        renderCell: (params) => (
            <>
                {params.row.score_4 > null ? <div style={{color : '#81c784' , fontWeight : 'bold'}}>{params.row.score_4}</div> : <div style={{color : '#d32f2f' , fontWeight : 'bold'}}> 0 </div>}
            </>
            ),
        },
        { field: "", headerName: "แก้ไข",  minWidth: 200, headerAlign: "center", align: "center",
          renderCell: (params) => (
            <>
                <td style={{textAlign : 'center'}}>
                    <button type='button' className='btn btn-warning' style={{color : 'white' , fontWeight : 'bold'}} onClick={()=>{setStudent(params.row);setOpen(true)}}>
                        แก้ไข
                    </button>
                </td>
            </>
          ),
        },
        { field: "sendtestcode", headerName: "ส่ง Test Code",  minWidth: 200, headerAlign: "center", align: "center",
            renderCell: (params) => (
                <>
                    <td style={{textAlign : 'center'}}>
                        {params.row.send_test_code == true ? <><div style={{color : '#81c784' , fontWeight : 'bold'}}>ส่ง Test Code เเล้ว</div></> : <><div style={{color : '#d32f2f' , fontWeight : 'bold'}}>ยังไม่ส่ง Test Code</div></>}
                        <button type='button' className='btn btn-warning' style={{backgroundColor : '#3f51b5' , borderColor : '#3f51b5'  ,  color : 'white' , fontWeight : 'bold'}} onClick={()=>{sendTestCode(params.row)}}>
                            ส่ง Test Code
                        </button>
                    </td>
                </>
            ),
        },
    ];

    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(students);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, "รายชื่อนักเรียน.xlsx");
    }

    const export_point = async() => {
        let res = await getPointStudents()
        const ws = XLSX.utils.json_to_sheet(res.dataExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, "ตารางคะเเนน.xlsx");
    }
    // export_point("data:text/html,HelloWorld!", "helloWorld.txt");
    return (    
        <>
            <Header />
            <Menu />
            <div className='content-wrapper' style={{backgroundColor : 'white'}}>
                <div className="content-header">
                    <div className="container-fluid">   
                        <div className="row mb-2">
                            <div className="col-sm-6" style={{textAlign : 'left'}}>
                                <h1 className="m-0">รายการนักเรียน</h1>
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
                                            <button onClick={()=>{handleOpen()}} type="button" className="btn btn-block btn-primary" style={{color : 'white' , fontWeight : 'bold'}}>เพิ่มข้อมูลนักเรียน</button>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                    <div style={{textAlign : 'right'}}> 
                                        <div> 
                                            <button onClick={()=>{setOpenDetail(true)}} type="button" className="btn btn-block" style={{backgroundColor : '#ff5722' , color : 'white' , fontWeight : 'bold'}}>การเพิ่มนักเรียนแบบ excel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className='row' style={{padding : 30}}>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                    {/* <div className='row'>
                                        <div className='col-12 col-sm-12 col-md-12 col-ml-8 col-lg-12'>
                                            <button onClick={()=>{handleOpen()}} type="button" className="btn btn-block btn-primary">เพิ่มข้อมูลนักเรียน</button>
                                        </div>
                                    </div> */}
                                </div>  
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-12 col-sm-4 col-md-4 col-ml-4 col-lg-4'></div>
                                <div className='col-12 col-sm-4 col-md-4 col-ml-4 col-lg-4'></div>
                                <div className='col-12 col-sm-4 col-md-4 col-ml-4 col-lg-4'>
                                    {/* <div style={{textAlign :'center'}}>
                                        คำเเนะนำการเพิ่มนักเรียน เข้าระบบแบบ Excel
                                    </div> */}
                                    {/* <div style={{textAlign : 'right'}}> 
                                        <div> 
                                            <button onClick={()=>{setOpenDetail(true)}} type="button" className="btn btn-block" style={{backgroundColor : '#ff5722' , color : 'white' , fontWeight : 'bold'}}>การเพิ่มนักเรีนยแบบ excel</button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='row' style={{paddingLeft : 30}}>
                    <div className='col-6 text-left p-3'>
                   {/* <a href={`${process.env.REACT_APP_API_URL}/data.csv`} target="_blank" download="file">
                        <button >
                            Export Point
                        </button>
                    </a> */}

                     
                        <button onClick={()=>{export_point()}} className='btn btn-warning' style={{fontWeight : 'bold' , color : 'black' }}>
                            Export Point
                        </button>

                        
                    </div>
                    <div className='col-6 text-right p-3'>
                        <button onClick={()=>{exportExcel()}} className='btn btn-warning' style={{ fontWeight : 'bold' , color : 'black' }}>
                            Export Excel
                        </button>
                    </div>
                </div>
                <section className="content">
                    <div className='row' style={{padding : 30}}> 
                        <div className='table-responsive' style={{borderWidth : 100}}>

                        <Box style={{ width: "100%" ,  backgroundColor : 'white'}}>
                            <DataGrid
                            sx={{
                                "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                                py: "13px",
                                },
                                "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                                py: "13px",
                                },
                                "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                                py: "13px",
                                },
                            }}
                            autoHeight={true}
                            rows={students}
                            getRowId={(row) => row.id}
                            showCellRightBorder
                            getRowHeight={() => "auto"}
                            showColumnRightBorder
                            columns={headerTable}
                            pageSize={page}
                            onPageSizeChange={(newPageSize) => setPage(newPageSize)}
                            rowsPerPageOptions={[10, 20, 50, 100, 200]}
                            disableSelectionOnClick
                            components={{
                                Toolbar:CustomToolbar
                            }}
                            />
                        </Box>
                        {/* <button onClick={()=>exportToExcel()}>
                            ส่งออก excel 
                        </button> */}

                            {/* <table className='table table-bordered' >
                                <thead className='thead'>
                                    <tr>
                                        <th style={{textAlign : 'center' , width : 60}}>ลำดับ</th>
                                        <th style={{textAlign : 'center' , minWidth : 100}}>Test Code</th>
                                        <th style={{textAlign : 'center' , minWidth : 150}}>ชื่อ-สกุล</th>
                                        <th style={{textAlign : 'center' , minWidth : 150}}>โรงเรียน</th>
                                        <th style={{textAlign : 'center' , width : 90}}>ระดับชั้น</th>
                                        <th style={{textAlign : 'center' , Width : 70}}>ปีการศึกษา</th>
                                        <th style={{textAlign : 'center' , minWidth : 100}}>เบอร์โทร</th>
                                        <th style={{textAlign : 'center' , minWidth : 50}}>แบบทดสอบ 1</th>
                                        <th style={{textAlign : 'center' , minWidth : 50}}>แบบทดสอบ 2</th>
                                        <th style={{textAlign : 'center' , minWidth : 50}}>แบบทดสอบ 3</th>
                                        <th style={{textAlign : 'center' , minWidth : 50}}>แบบทดสอบ 4</th>
                                        <th style={{textAlign : 'center' , minWidth : 50}}>แก้ไข</th>
                                        <th style={{textAlign : 'center' , minWidth : 100}}>ส่ง Test Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student , index)=>{
                                        return(
                                            <>
                                                <tr key={index}>
                                                    <td style={{textAlign : 'center'}}>{index+1}</td>
                                                    <td style={{textAlign : 'left'}}>{student.username}</td>
                                                    <td style={{textAlign : 'left'}}>{student.student_name} {student.student_surname}</td>
                                                    <td style={{textAlign : 'center'}}>{student.school}</td>
                                                    <td style={{textAlign : 'center'}}>{student.education_years}</td>
                                                    <td style={{textAlign : 'center'}}>{student.education_semester}</td>
                                                    <td style={{textAlign : 'left'}}>{student.mobile}</td>
                                                    <td style={{textAlign : 'center'}}>
                                                        {student.score_1 > null ? <div style={{color : '#81c784' , fontWeight : 'bold'}}>{student.score_1}</div> : <div style={{color : '#d32f2f' , fontWeight : 'bold' }}> 0 </div>}
                                                    </td>
                                                    <td style={{textAlign : 'center'}}>
                                                        {student.score_2 > null ? <div style={{color : '#81c784' , fontWeight : 'bold'}}>{student.score_2}</div> : <div style={{color : '#d32f2f' , fontWeight : 'bold'}}> 0 </div>}
                                                    </td>
                                                    <td style={{textAlign : 'center'}}>
                                                        {student.score_3 > null ? <div style={{color : '#81c784' , fontWeight : 'bold'}}>{student.score_3}</div> : <div style={{color : '#d32f2f' , fontWeight : 'bold'}}> 0 </div>}
                                                    </td>
                                                    <td style={{textAlign : 'center'}}>
                                                        {student.score_4 > null ? <div style={{color : '#81c784' , fontWeight : 'bold'}}>{student.score_4}</div> : <div style={{color : '#d32f2f' , fontWeight : 'bold'}}> 0 </div>}
                                                    </td>
                                                    <td style={{textAlign : 'center'}}>
                                                        <button type='button' className='btn btn-warning' style={{color : 'white' , fontWeight : 'bold'}} onClick={()=>{setStudent(student);setOpen(true)}}>
                                                            แก้ไข
                                                        </button>
                                                    </td>
                                                    <td style={{textAlign : 'center'}}>
                                                        
                                                            {student.send_test_code == true ? <><div style={{color : '#81c784' , fontWeight : 'bold'}}>ส่ง Test Code เเล้ว</div></> : <><div style={{color : '#d32f2f' , fontWeight : 'bold'}}>ยังไม่ส่ง Test Code</div></>}
                                                        
                                                        <div>
                                                            <button type='button' className='btn btn-warning' style={{backgroundColor : '#3f51b5' , borderColor : '#3f51b5'  ,  color : 'white' , fontWeight : 'bold'}} onClick={()=>{sendTestCode(student)}}>
                                                                ส่ง Test Code
                                                            </button>
                                                        </div>
                                                        
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </section>
            </div>
            <Modal show={open}  size="lg" onHide={()=>setOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มข้อมูลนักเรียน</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <form onSubmit={handleSubmit} className='col-12'>
                            <div className='row'>
                                <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                    <div className="form-group">
                                        <label>ชื่อ</label>
                                        <input required type='text' name="student_name" onChange={handleChangeReserveData("student_name")} value={student.student_name} className='form-control' placeholder='ชื่อ'  />
                                    </div>
                                </div>  
                                <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                    <div className="form-group">
                                        <label>นามสกุล</label>
                                        <input required type='text' name="student_surname" onChange={handleChangeReserveData("student_surname")} value={student.student_surname} className='form-control' placeholder='นามสกุล'  />
                                    </div>
                                </div>  
                                <div className='col-12 col-sm-4 col-md-4 col-ml-4 col-lg-4'>
                                    <div className="form-group">
                                        <label>E-mail</label>
                                        <input required type='email' name="email" onChange={handleChangeReserveData("email")} value={student.email} className='form-control' placeholder='E-mail'  />
                                    </div>
                                </div>  
                                <div className='col-12 col-sm-4 col-md-4 col-ml-4 col-lg-4'>
                                    <div className="form-group">
                                        <label>เบอร์โทร</label>
                                        <input required type='text' name="mobile" onChange={handleChangeReserveData("mobile")} value={student.mobile} className='form-control' placeholder='เบอร์โทร'  />
                                    </div>
                                </div>  

                                <div className='col-12 col-sm-4 col-md-4 col-ml-4 col-lg-4'>
                                    <label>วันเกิด</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Basic example"
                                            value={startDate}
                                            onChange={(newValue) => {
                                            setStartDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    {/* <DatePicker className='form-control' ateFormat="P" selected={startDate} onChange={(date) => {setStartDate(date) ; setStudent({ ...student, birthday: date }) } } /> */}
                                </div>

                                <div className='col-12 col-sm-12 col-md-12 col-ml-12 col-lg-12'>
                                    <div className="form-group">
                                        <label>โรงเรียน</label>
                                        <input required type='text' name="school" onChange={handleChangeReserveData("school")} value={student.school} className='form-control' placeholder='โรงเรียน'  />
                                    </div>
                                </div>  

                                <div className='col-12 col-sm-4 col-md-4 col-ml-4 col-lg-4'>
                                    <div className="form-group">
                                        <label>ปีการศึกษา</label>
                                        <input required type='text' name="education_semester" onChange={handleChangeReserveData("education_semester")} value={student.education_semester} className='form-control' placeholder='ปีการศึกษา'  />
                                    </div>
                                </div>  

                                <div className='col-12 col-md-4 col-ml-4 col-lg-4'>
                                    <div className='form-group'>
                                        <label>ระดับชั้น</label>
                                        <select id="inputState" name="education_years" onChange={handleChangeReserveData("education_years")} value={student.education_years} className="form-control">
                                            <option name="education_years" value="">
                                                ----* เลือกระดับชั้น *----
                                            </option>
                                            <option name="education_years" value="ม.1">
                                                ม.1
                                            </option>
                                            <option name="education_years" value="ม.2">
                                                ม.2
                                            </option>
                                            <option name="education_years" value="ม.3">
                                                ม.3
                                            </option>
                                            <option name="education_years" value="ม.4">
                                                ม.4
                                            </option>
                                            <option name="education_years" value=" ม.5">
                                                ม.5
                                            </option>
                                            <option name="education_years" value="ม.6">
                                                ม.6
                                            </option>
                                            <option name="education_years" value=" อื่นๆ">
                                                อื่นๆ
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className='col-12 col-md-4 col-ml-4 col-lg-4'>
                                    <div className='form-group'>
                                        <label>เพศ</label>
                                        <select id="inputState" name="student_sex" onChange={handleChangeReserveData("student_sex")} value={student.student_sex} className="form-control">
                                            <option name="student_sex" value="">
                                                ----* เลือกเพศ *----
                                            </option>
                                            <option name="student_sex" value="male">
                                                ชาย
                                            </option>
                                            <option name="student_sex" value="female">
                                                หญิง
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
            <Modal show={openDetail}  size="xl" onHide={()=>setOpenDetail(false)}>
                <Modal.Header closeButton>
                    <Modal.Title><span style={{color : '#3f51b5' , fontWeight : 'bold'}}>การเพิ่มข้อมูลแบบ excel ต้องเพิ่มรูปแบบนี้</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div style={{color : 'red' , fontWeight : 'bold'}}>
                            <p> 1. ต้องนำเข้าเป็นไฟล์ excel เท่านั้น </p>
                            <p> 2. สร้างส่วนหัวของตารางดังนี้ </p>
                        </div>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>frist_name</th>
                                        <th>last_name</th>
                                        <th>school</th>
                                        <th>education</th>
                                        <th>email</th>
                                        <th>mobile</th>
                                        <th>sex</th>
                                        <th>birthday</th>
                                        <th>semester</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div style={{color : 'red' , fontWeight : 'bold'}}>
                            <p> 3. ตัวอย่างข้อมูล </p>
                        </div>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>frist_name</th>
                                        <th>last_name</th>
                                        <th>school</th>
                                        <th>education</th>
                                        <th>email</th>
                                        <th>mobile</th>
                                        <th>sex</th>
                                        <th>birthday</th>
                                        <th>semester</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ไวทยา</td>
                                        <td>วันฤกษ์</td>
                                        <td>บ้านสามเเยก</td>
                                        <td>ม.6</td>
                                        <td>test@gmail.com</td>
                                        <td>0999789974</td>
                                        <td>male</td>
                                        <td>18/02/1997</td>
                                        <td>2022</td>
                                    </tr>
                                    <tr>
                                        <td>ยามค่ำ</td>
                                        <td>สนทยา</td>
                                        <td>บ้านหนองสวน</td>
                                        <td>ม.6</td>
                                        <td>test1@gmail.com</td>
                                        <td>0999789924</td>
                                        <td>female</td>
                                        <td>25/02/1997</td>
                                        <td>2022</td>
                                    </tr>
                                    <tr style={{fontWeight : 'bold'}}>
                                        <td>....</td>
                                        <td>....</td>
                                        <td>....</td>
                                        <td>....</td>
                                        <td>....</td>
                                        <td>....</td>
                                        <td>....</td>
                                        <td>....</td>
                                        <td>....</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{color : 'red' , fontWeight : 'bold'}}>
                            <p> 4. นำเข้าข้อมูลทีละไม่เกิน 250 รายการ </p>
                        </div>

                        <div style={{textAlign : 'center'}}>
                            <div className='text-center'>
                                <form className='text-center'>
                                    <div>
                                        <span style={{color : '#00796b' , fontSize : 20 , fontWeight : 'bold'}}>เลือกไฟล์รับเข้า (Excel)</span>
                                        <a
                                            type="button"
                                            className="input-group-text"
                                            style={{ backgroundColor: "white" }}
                                        >
                                            <input
                                                onChange={readUploadFile}
                                                type="file"
                                                className="form-control-file"
                                                id="exampleFormControlFile1"
                                                autoComplete="off"
                                                name="name"
                                                placeholder="เลือกไฟล์ภาพ"
                                            />
                                            <h3 className="card-title">
                                                <span  onClick={()=>{UploadFileExcel()}}>
                                                  ยืนยันการ Upload  <i className="icon fa fa-upload" />
                                                </span>{" "}
                                            </h3>
                                        </a>    
                                    </div>
                                </form>
                            </div>
                        </div>


                        
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setOpenDetail(false)}>
                            ปิด
                        </Button>
                        {/* <Button type="submit" variant="primary">
                            บันทึก
                        </Button> */}
                    </Modal.Footer>
                </Modal.Body>   
            </Modal>

        </>
  )
}
