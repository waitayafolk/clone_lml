import React , {useState , useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Modal  from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2';
import { loadQuizGroup , loadQuizGroup10 , loadQuizDetail , saveQuizDetail , saveQuizDetail10 } from "../api_connection/Quiz";

export default function Quiz() {
    const [quizGroup , setQuizGroup] = useState([])
    const [quizGroup10 , setQuizGroup10] = useState([])
    const [quizDetail , setQuizDetail] = useState([])
    const [quizDetail10 , setQuizDetail10] = useState([])
    const [type , setType] = useState([
        "Realistic" , "Investigative" , "Artistic" , "Social" , "Enterprising" , "Conventional" , 
    ])

    const [type2 , setType2] = useState([
        "Achievement" , "Independence" , "Recognition" , "Relationships" , "Support" , "Working Conditions" ,  
    ])

    const [type3 , setType3] = useState([
        "Presence" , "Competing" , "Relating" , "Achieving" , "Future Thinker" , "Discoverer" , "Caring" , "Confidence" , "Dependability" , "Organizer" , 
    ])

    const [typeDetail , setTypeDetail] = useState([
        "i_like" , "i_can" , "i_am"
    ])
    
    const [quizDetailCgoose , setQuizDetailCgoose] = useState({
        id : 0,
        quiz_id : 0,
        status : '',
        title : 0,
        title_eng : '',
        type : '',
        type_detail : '',
    })

    const [quizDetailCgoose10 , setQuizDetailCgoose10] = useState({
        id : 0,
        name : '',
        name_eng : '',
        type : '',
        type_detail : '',
    })
    const [open , setOpen] = useState(false);
    const [open10 , setOpen10] = useState(false);
    const [detail_id , setDetail_id] = useState(false);
    useEffect(()=>{
        loadQuiz()
    },[])

    const loadQuiz = async() => {
        const res = await loadQuizGroup()
        setQuizGroup(res.data)
        const res10 = await loadQuizGroup10()
        setQuizGroup10(res10.data)
    }

    const loadDetail = (prop) => async(event) =>{
        setDetail_id(event.target.value)
        let res = await loadQuizDetail(event.target.value)
        setQuizDetail(res.data)
    }

    const handleChangeReserveData = (prop) => (event) => {
        setQuizDetailCgoose({ ...quizDetailCgoose, [prop]: event.target.value });
    };

    const handleChangeReserveData10 = (prop) => (event) => {
        setQuizDetailCgoose10({ ...quizDetailCgoose10, [prop]: event.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let data = await saveQuizDetail(quizDetailCgoose)
        if(data.status =='success'){
            setOpen(false)
            Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                text: data.message,
            })
            let res = await loadQuizDetail(detail_id)
            setQuizDetail(res.data)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
            })
        }
    }

    const handleSubmit10 = async(e) => {
        e.preventDefault();
        let data = await saveQuizDetail10(quizDetailCgoose10)
        if(data.status =='success'){
            setOpen10(false)
            Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                text: data.message,
            })
            const res10 = await loadQuizGroup10()
            setQuizGroup10(res10.data)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
            })
        }
    }

    const chooseQuizSpacial = async => { 
        setDetail_id(10)
        setQuizDetailCgoose({ ...quizDetailCgoose, title_eng: "" });
        setQuizDetail([])
    }

    const setTypeValue = () => async(event) =>{
        setQuizDetailCgoose({ ...quizDetailCgoose, type : event.target.value });
    }

    const setTypeValueDetail = () => async(event) =>{
        setQuizDetailCgoose({ ...quizDetailCgoose, type_detail : event.target.value });
    }

    const setType10Value = () => async(event) =>{
        setQuizDetailCgoose10({ ...quizDetailCgoose10, type : event.target.value });
    }

    const setType10ValueDetail = () => async(event) =>{
        setQuizDetailCgoose10({ ...quizDetailCgoose10, type_detail : event.target.value });
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
                                <h1 className="m-0">รายการแบบสอบถาม</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className='row' style={{padding : 30}}>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-12 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                    <div className='row'>
                                        <div className='col-12 col-sm-6 col-md-6 col-ml-8 col-lg-6'>
                                            <div className='form-group'>
                                                <label>ชุดแบบสอบถาม</label>
                                                <select id="inputState" onChange={loadDetail("student_sex")} name="education_years" className="form-control">
                                                    <option name="education_years"   value="0">
                                                        ----* เลือกชุดแบบสอบถาม *----
                                                    </option>
                                                    {quizGroup.length != 0 ? <>
                                                        {quizGroup.map((item , index)=>{
                                                            return(
                                                                <>
                                                                    <option name="education_years" value={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                </>
                                                            )
                                                        })}
                                                    </> : <></>}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-12 col-sm-6 col-md-6 col-ml-8 col-lg-6'>
                                            <div className='form-group'>
                                                <label>แบบสอบถามเพิ่มเติม</label>
                                                <button onClick={()=>{chooseQuizSpacial()}} type="button" className="btn btn-block btn-primary">แบบสอบถามเพิ่มเติม</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-12 col-sm-4 col-md-4 col-ml-4 col-lg-4'>
                                    {/* <form>
                                        <input
                                            type="file"
                                            name="upload"
                                            id="upload"
                                            onChange={readUploadFile}
                                        />
                                    </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className='row' style={{padding : 30}}> 
                        <div className='table-responsive' style={{borderWidth : 100}}>
                            {detail_id == 10 ? <>
                                <table className='table table-bordered' >
                                    <thead className='thead'>
                                        <tr>
                                            <th style={{textAlign : 'center' , width : 60}}>ลำดับ</th>
                                            <th style={{textAlign : 'center' , minWidth : 450}}>แบบสอบถาม</th>
                                            <th style={{textAlign : 'center' , minWidth : 450}}>แบบสอบถาม (ENG)</th>
                                            <th style={{textAlign : 'center' , minWidth : 100}}>แก้ไข</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {quizGroup10.map((item , index)=>{
                                                return(
                                                    <>
                                                        <tr key={index}>
                                                            <td style={{textAlign : 'center'}}>{index+1}</td>
                                                            <td style={{textAlign : 'left'}}>{item.name}</td>
                                                            <td style={{textAlign : 'left'}}>{item.name_eng}</td>
                                                            <td style={{textAlign : 'center' , minWidth : 100}}>
                                                                <div>
                                                                    <button onClick={()=>{setOpen10(true);setQuizDetailCgoose10(item)}} className='btn btn-primary' type='button'>
                                                                        <i className="fas fa-edit"></i>    
                                                                    </button>    
                                                                </div> 
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                </table>
                            </> : <>
                                <table className='table table-bordered' >
                                    <thead className='thead'>
                                        <tr>
                                            <th style={{textAlign : 'center' , width : 60}}>ลำดับ</th>
                                            <th style={{textAlign : 'center' , minWidth : 450}}>แบบสอบถาม</th>
                                            <th style={{textAlign : 'center' , minWidth : 450}}>แบบสอบถาม (ENG)</th>
                                            <th style={{textAlign : 'center' , minWidth : 200}}>ประเภทคะเเนน</th>
                                            <th style={{textAlign : 'center' , minWidth : 200}}>ประเภทคะเเนน เพิ่มเติม</th>
                                            <th style={{textAlign : 'center' , minWidth : 100}}>แก้ไข</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quizDetail.map((item , index)=>{
                                            // console.log(item)
                                            return(
                                                <>
                                                    <tr key={index}>
                                                        <td style={{textAlign : 'center'}}>{index+1}</td>
                                                        <td style={{textAlign : 'left'}}>{item.title}</td>
                                                        <td style={{textAlign : 'left'}}>{item.title_eng}</td>
                                                        <td style={{textAlign : 'center'}}>{item.type}</td>
                                                        <td style={{textAlign : 'center'}}>{item.type_detail}</td>
                                                        <td style={{textAlign : 'center' , minWidth : 100}}>
                                                            <div>
                                                                <button onClick={()=>{setOpen(true);setQuizDetailCgoose(item)}} className='btn btn-primary' type='button'>
                                                                    <i className="fas fa-edit"></i>    
                                                                </button>    
                                                            </div> 
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </>}
                            
                        </div>
                    </div>
                </section>
            </div>
            <Modal show={open}  size="lg" onHide={()=>setOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขแบบสอบถาม</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <form onSubmit={handleSubmit} className='col-12'>
                            <div className='row'>
                                <div className='col-12 col-sm-12 col-md-12 col-ml-12 col-lg-12'>
                                    <div className="form-group">
                                        <label>แบบสอบถาม</label>
                                        <textarea required type='text' name="title" onChange={handleChangeReserveData("title")} value={quizDetailCgoose.title} className='form-control' placeholder='ชื่อ'  />
                                    </div>
                                </div>
                                <div className='col-12 col-sm-12 col-md-12 col-ml-12 col-lg-12'>
                                    <div className="form-group">
                                        <label>แบบสอบถาม (ENG)</label>
                                        <textarea required type='text' name="title_eng" onChange={handleChangeReserveData("title_eng")} value={quizDetailCgoose.title_eng} className='form-control' placeholder='ชื่อ'  />
                                    </div>
                                </div>

                                <div className='col-6 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                    <div className="form-group">
                                        <label> ประเภทคะเเนน </label>
                                        <select disabled={quizDetailCgoose.type == undefined || null ? true : false } id="inputState"onChange={setTypeValue()} value={quizDetailCgoose.type} name="education_years" className="form-control">
                                            <option name="education_years"   value={''}>
                                                ----* เลือกชุดแบบสอบถาม *----
                                            </option>
                                            {quizDetailCgoose.quiz_id == 1 ? <>
                                            {type.length != 0 ? <>
                                                {type.map((item)=>{
                                                    return(
                                                        <>
                                                            <option name="education_years" value={item}>
                                                                {item}
                                                            </option>
                                                        </>
                                                    )
                                                })}
                                            </> : <></>}
                                            </> : <>
                                            
                                            </>}
                                            {quizDetailCgoose.quiz_id == 2 ? <>
                                                {type2.length != 0 ? <>
                                                {type2.map((item)=>{
                                                    return(
                                                        <>
                                                            <option name="education_years" value={item}>
                                                                {item}
                                                            </option>
                                                        </>
                                                    )
                                                })}
                                            </> : <></>}
                                            </> : <>
                                            
                                            </>}
                                            {quizDetailCgoose.quiz_id == 4 ? <>
                                                {type3.length != 0 ? <>
                                                {type3.map((item)=>{
                                                    return(
                                                        <>
                                                            <option name="education_years" value={item}>
                                                                {item}
                                                            </option>
                                                        </>
                                                    )
                                                })}
                                            </> : <></>}
                                            </> : <>
                                            
                                            </>}
                                            {/* quiz_id */}
                                           
                                        </select>
                                    </div>
                                </div>
                                <div className='col-6 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                    <div className="form-group">
                                        <label> ประเภทคะเเนน เพิ่มเติม{quizDetailCgoose.type_detail} </label>
                                        <select disabled={quizDetailCgoose.type_detail == undefined || null ? true : false } id="inputState"onChange={setTypeValueDetail()} value={quizDetailCgoose.type_detail} name="education_years" className="form-control">
                                            <option name="education_years"  value={''}>
                                                ----* เลือกชุดแบบสอบถาม *----
                                            </option>
                                            {typeDetail.length != 0 ? <>
                                                {typeDetail.map((item)=>{
                                                    return(
                                                        <>
                                                            <option name="education_years" value={item}>
                                                                {item}
                                                            </option>
                                                        </>
                                                    )
                                                })}
                                            </> : <></>}
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
            <Modal show={open10}  size="lg" onHide={()=>setOpen10(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขแบบสอบถามเพิ่มเติม</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <form onSubmit={handleSubmit10} className='col-12'>
                            <div className='row'>
                                <div className='col-12 col-sm-12 col-md-12 col-ml-12 col-lg-12'>
                                    <div className="form-group">
                                        <label>แบบสอบถาม</label>
                                        <textarea required type='text' name="name" onChange={handleChangeReserveData10("name")} value={quizDetailCgoose10.name} className='form-control' placeholder='ชื่อ'  />
                                    </div>
                                </div>
                                <div className='col-12 col-sm-12 col-md-12 col-ml-12 col-lg-12'>
                                    <div className="form-group">
                                        <label>แบบสอบถาม (ENG)</label>
                                        <textarea required type='text' name="name_eng" onChange={handleChangeReserveData10("name_eng")} value={quizDetailCgoose10.name_eng} className='form-control' placeholder='ชื่อ'  />
                                    </div>
                                </div>
                                {/* <div className='col-6 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                    <div className="form-group">
                                        <label> ประเภทคะเเนน </label>
                                        <select disabled={quizDetailCgoose10.type == undefined || null ? true : false } id="inputState"onChange={setType10Value()} value={quizDetailCgoose10.type} name="education_years" className="form-control">
                                            <option name="education_years"   value={''}>
                                                ----* เลือกชุดแบบสอบถาม *----
                                            </option>
                                            {type.length != 0 ? <>
                                                {type.map((item)=>{
                                                    return(
                                                        <>
                                                            <option name="education_years" value={item}>
                                                                {item}
                                                            </option>
                                                        </>
                                                    )
                                                })}
                                            </> : <></>}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-6 col-sm-6 col-md-6 col-ml-6 col-lg-6'>
                                    <div className="form-group">
                                        <label> ประเภทคะเเนน เพิ่มเติม </label>
                                        <select disabled={quizDetailCgoose10.type_detail == undefined || null ? true : false } id="inputState"onChange={setType10ValueDetail()} value={quizDetailCgoose10.type_detail} name="education_years" className="form-control">
                                            <option name="education_years"   value={''}>
                                                ----* เลือกชุดแบบสอบถาม *----
                                            </option>
                                            {typeDetail.length != 0 ? <>
                                                {typeDetail.map((item)=>{
                                                    return(
                                                        <>
                                                            <option name="education_years" value={item}>
                                                                {item}
                                                            </option>
                                                        </>
                                                    )
                                                })}
                                            </> : <></>}
                                        </select>
                                    </div>
                                </div> */}
                            </div>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={()=>setOpen10(false)}>
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
        </>
    )
}
