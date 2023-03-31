import React, {useState , useEffect , useContext} from 'react'
import Logo from '../assets/img/logo-lml.png'
import from1 from '../assets/img/from1.png'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { getQuiz1 , sendAnswer , countScore } from '../api_connection/Quiz';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../LangaugeContext";
import th from '../assets/img/th.jpg'
import en from '../assets/img/en.jpg'

const faculty_data = [
  {id : 1 , value : 'ไม่แน่ใจ' , value_en : 'Not sure'},
  {id : 2 , value : 'คณะแพทยศาสตร์' , value_en : 'Faculty of Medicine'},
  {id : 3 , value : 'คณะทันตแพทยศาสตร์' , value_en : 'Faculty of Dentistry'},
  {id : 4 , value : 'คณะเภสัชศาสตร์' , value_en : 'Faculty of Pharmacy'},
  {id : 5 , value : 'คณะสัตวแพทยศาสตร์' , value_en : 'Faculty of Veterinary Medicine'},
  {id : 6 , value : 'คณะเทคนิคการแพทย์' , value_en : 'Faculty of Medical Technology'},
  {id : 7 , value : 'คณะกายภาพบำบัด' , value_en : 'Faculty of Physical Therapy'},
  {id : 8 , value : 'คณะพยาบาลศาสตร์' , value_en : 'Faculty of Nursing'},
  {id : 9 , value : 'คณะวิศวกรรมศาสตร์' , value_en : 'Faculty of Engineering'},
  {id : 10 , value : 'คณะวิศวกรรมศาสตร์ สาขาวิชาวิศวกรรมคอมพิวเตอร์' , value_en : 'Faculty of Engineering Computer Engineering'},
  {id : 11 , value : 'คณะสถาปัตยกรรมศาสตร์' , value_en : 'Faculty of Architecture'},
  {id : 12 , value : 'คณะวิทยาศาสตร์' , value_en : 'Faculty of Science'},
  {id : 13 , value : 'คณะพาณิชยศาสตร์และการบัญชี' , value_en : 'Faculty of Commerce and Accountancy'},
  {id : 14 , value : 'คณะเศรษฐศาสตร์' , value_en : 'Faculty of Economics'},
  {id : 15 , value : 'คณะนิติศาสตร์' , value_en : 'Faculty of Law'},
  {id : 16 , value : 'คณะรัฐศาสตร์' , value_en : 'Faculty of Political Science'},
  {id : 17 , value : 'คณะจิตวิทยา' , value_en : 'Faculty of Psychology'},
  {id : 18 , value : 'คณะอักษรศาสตร์' , value_en : 'Faculty of Arts'},
  {id : 19 , value : 'คณะนิเทศศาสตร์' , value_en : 'Faculty of Mass Communication'},
  {id : 20 , value : 'คณะครุศาสตร์' , value_en : 'Faculty of Education'},
]

export default function QuizFrom1() {
  const navigate = useNavigate();
  const [page , setPage] = useState(0)
  // const [width, setWidth] = useState(0)
  const [quiz1 , setQuiz1] = useState([])
  const [faculty, setFaculty] = useState({
    faculty : "" , 
    agreement : 'false' , 
    agreement2 : '' ,
  })
  const [checkAll , setCheckAll] = useState(false)
  const { language, setLanguage } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  const [checkAnswer, setCheckAnswer] = useState([]);
  const [questionCount, setQuestionCount] = useState(0)

  useEffect(()=>{
    i18n.changeLanguage(language);
    loadQuiz1()
  },[language])

  const loadQuiz1 = async()=>{
    const res = await getQuiz1();
    let result = [];
    let count = await res.data.length
    for(let index of res.data){
      index.answer = ""
      result.push(index)
    }
    setQuiz1(result)
    setQuestionCount(count);
  }

  const nextPage1 = async ()=>{
    if(faculty.faculty == "" || faculty.agreement == "false" || faculty.agreement2 == "" ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      })
    }else{
      setPage(page+1)
    }
  }
  
  const handleChangeReserveData = (prop) => (event) => {
    if(prop == 'agreement'){
      if(event.target.value == 'false'){
        event.target.value = true
      }else{
        event.target.value = false
      }
    }
    setFaculty({ ...faculty, [prop]: event.target.value });
  };

  const handleChangeLanguage = (prop) => (event) => {
    setLanguage(event.target.value)
    setCheckAnswer([])
  };

  const confirmAnswer = async ()=>{
    let index = quiz1.findIndex((e) => e.id === 1);
    if (index === -1) {

    } else {
      quiz1[index].answer = faculty.agreement
    }

    let item = quiz1.findIndex((e) => e.id === 2);
    if (item === -1) {

    } else {
      quiz1[item].answer = faculty.agreement2
    }

    let invalid = true;
    let data = [];

    for(let answer of quiz1){
      if(answer.answer === ''){
        invalid = false
      }
      data.push(answer.answer)
      setCheckAnswer(data)
    }
    
    if(invalid == false){
      Swal.fire({
        icon: 'error',
        title: 'กรุณาตอบคำถามให้ครบ',
        showConfirmButton: false,
        timer: 1500
      })
      setCheckAll(true)
    }else{
      
      let val = await countScore(quiz1)
      
      let data = {
        quiz : quiz1,
        quiz_id : 1,
        score : val,
      }
      let res = await sendAnswer(data)
      if(res.message == 'success'){
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/thankyou-page')
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'เกิดข้อผิดพลาด',
        })
      }
    }
  }

  const updataAnswer = async (answer , item)=>{
    let response = item
    let data = checkAnswer
    const index = quiz1.findIndex((e) => e.id === response.id);
    if (index === -1) {

    } else {
      quiz1[index].answer = answer
    }
    setQuiz1((quiz1) => [...quiz1,])

    data[index] = item.answer
    let CH = false
    for(let index of data){
      if(index == ""){
        CH = true
      }
    }
    setCheckAll(CH)
    if (data.length > 0) {
      setCheckAnswer(data)
    }
   
  }

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

        <div style={{paddingTop : 50 , paddingBottom : 50}}>
        
          <div className='album py-5' style={{height : '100%' , backgroundColor : '#F3F3FE'}}>
            <div style={{width : '100%'}}>
              <div style={{display : 'flex', justifyContent: 'space-between', margin: '0 auto', width : 1150}}>
                <div style={{width: '33%'}}></div>
                <div style={{width: '34%'}}>
                  <img src={Logo} alt='Logo' style={{width : '300px' , marginLeft : 'auto' , marginRight : 'auto' , display : 'block'}}/>
                </div>
                <div style={{width: '33%', wordWrap: 'break-word'}}>
                  {/* {checkAnswer.length === questionCount ?
                      <>
                        <span style={{color : 'red', fontSize: 20}}>
                          {language === 'th' ? <>ข้อที่ยังไม่ได้ทำ</> : <>Unfinished Question</>}
                          <br/>
                        </span>
                        {checkAnswer.map((check, index)=>{
                            if(check==='') {
                                return(
                                    <>
                                        {`${index-1} `}
                                    </>
                                )
                            }
                        })}
                      </>
                    : <></>
                  } */}
                </div>
              </div>
            </div>
              {page == 0 ? <>
                <div className='container hold-transition' style={{backgroundColor : 'white' , borderRadius : 5}}>
                  <div className='row'>
                    <div className='col-4' style={{padding : 20}}>
                      <div className='col-6' style={{textAlign : 'left'}}>
                          <button onClick={()=>{window.history.back()}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                              {language == 'th' ? 'ย้อนกลับ หน้าหลัก':'Back main page'}
                          </button>
                      </div>
                    </div>
                    <div className='col-4'>
                      
                    </div>
                    <div className='col-4' style={{padding : 20}}>
                      <div style={{textAlign : 'right'}}>
                        <select id="inputState"  name="language" onChange={handleChangeLanguage("faculty")} value={language}  className="form-control">
                
                          <option name="language" value="th">
                              Thai
                          </option>
                          <option name="language" value="en">
                             English (US)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <img
                    src={from1}
                    alt='Logo'
                    style={{width : '300px' , marginLeft : 'auto' , marginRight : 'auto' , display : 'block' , paddingTop : 50}}
                  />

                  <div className='text' style={{padding: 10 , textAlign : 'center'}}>
                    <div style={{fontSize : 25 , fontWeight : 'bold'}}>{t("title_From1")}</div>
                    <div style={{paddingRight : 30 , paddingLeft : 30}}>
                    {t("title_From1_detail")}
                    </div>
                  </div>
                  <div><hr className="hr-divider" style={{color:"black"}}/></div>
                  <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                    <div className='row' >
                      <div className='col-12'>
                        <div className='form-group'>
                          <label>{t("from_1_select")}</label>
                          <select id="inputState" name="faculty" onChange={handleChangeReserveData("faculty")} value={faculty.faculty} className="form-control">
                            <option name="faculty" value="">
                              ----* {t("from_1_select")} *----
                            </option>

                            {faculty_data.length > 0 ? (
                              <>
                                {faculty_data.map((item, index) => {
                                  return (
                                    <>
                                      <option
                                        style={{fontWeight : 'bold'}}
                                        name="faculty"
                                        value={item.value}
                                      >
                                        {language == 'th' ? item.value : item.value_en}
                                      </option>
                                    </>
                                  );
                                })}
                              </>
                                ) : (
                              <></>
                            )}

                          </select>
                        </div>
                      </div>
                      <div className='col-12' style={{paddingBottom : 50 , paddingTop : 20 }}>
                        <input checked={faculty.agreement == 'true' ? true : false} type="checkbox" onChange={handleChangeReserveData("agreement")} value={faculty.agreement} aria-label="Checkbox for following text input"  />{" "}
                        <lable style={{fontSize : 16 , fontWeight : 'bold'}}> {t('From1_confirmAge')} <span style={{color: 'red' ,fontWeight : 'bold'}}>*</span></lable> 
                      </div>
                      <div className='col-12' style={{paddingBottom : 50 , paddingTop : 20 }}>

                        <lable style={{fontSize : 16 , fontWeight : 'bold'}}> {t('From1_confirmAge')}  <span style={{color: 'red' ,fontWeight : 'bold'}}>*</span></lable> 
                        <div className="input-group"> 
                          <div className='col-12'>
                            <input type="radio" checked={faculty.agreement2 == "ยินยอม" ?true : false } onClick={()=>{setFaculty({...faculty, agreement2 : "ยินยอม" })}} /> {language == 'th' ? 'ยินยอม': 'Accept' }  
                          </div>

                          <div className='col-12'>
                            <input type="radio" checked={faculty.agreement2 == "ไม่ยินยอม" ?true : false } onClick={()=>{setFaculty({...faculty, agreement2 : "ไม่ยินยอม" })}} /> {language == 'th' ? 'ไม่ยินยอม': 'Deny' }  
                          </div>

                        </div>
                      </div>

                      <div className='col-12'>
                      {language == 'th' ? <>
                        <div style={{paddingBottom : 50 , paddingTop : 20 , fontWeight : 'bold'}}>
                          น้องมีสิทธิเลือกที่จะยินยอม หรือไม่ยินยอมโดยไม่มีผลต่อการสมัครเรียนในครั้งนี้ทั้งสิ้น และหากน้องไม่ประสงค์ให้ประมวลผลข้อมูลส่วนบุคคลตามวัตถุประสงค์ข้างต้น 
                          หรือไม่ต้องการรับการสื่อสารใด ๆ น้องสามารถขอบอกเลิกการรับข่าวสาร (Unsubscribe) จากข้อความการตลาด หรืออาจจะเพิกถอนความยินยอมเมื่อใดก็ได้ 
                          โดยไม่เสียค่าใช้จ่ายผ่านการ <a href='https://form.jotform.com/220790774361459'>กรอกแบบฟอร์มคำขอถอนความยินยอม</a> ในเว็บไซต์ของเรา
                        </div>

                        <div style={{paddingBottom : 50 , paddingTop : 20 , fontWeight : 'bold'}}>
                          คำชี้แจงสิทธิ์ส่วนบุคคล  เรามีความมุ่งมั่นในการรักษาความปลอดภัยของข้อมูลส่วนบุคคลที่เราได้รับ โดยเราจะลบข้อมูลของน้องภายใน 5 (ห้า) ปี 
                          นับถัดจากปีที่สิ้นสุดความสัมพันธ์ หรือในกรณีที่เราได้ขอความยินยอมจากน้องเราจะหยุดใช้ข้อมูลเมื่อน้องแจ้งขอยกเลิกความยินยอม ทั้งนี้ น้องสามารถขอเข้าถึงข้อมูล 
                          ขอสำเนาข้อมูล ขอรับข้อมูลโดยวิธีอัตโนมัติ ขอให้โอนข้อมูล ขอให้ลบ ทำลายหรือระงับใช้ข้อมูล <a href="https://form.jotform.com/220788872002457">ได้โดยการกรอกแบบฟอร์มคำขอใช้สิทธิ</a> ในเว็บไซต์ของบริษัท  
                          และน้องสามารถศึกษามาตรการการรักษาความปลอดภัย และรายละเอียดเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคลของเราได้ที่ <a href='https://learnolife.com/pdpa/privacy-policy/'>ประกาศความเป็นส่วนตัว (Privacy Notice)สำหรับลูกค้า  </a> 
                        </div>

                        <div style={{paddingBottom : 50 , paddingTop : 20 , fontWeight : 'bold'}}>
                          หากน้องเชื่อว่า เราไม่ได้ปฏิบัติตามคำชี้แจงนี้ กรุณาติดต่อกลับมาที่เรา โดยส่งอีเมลมาที่ lol.pdpa@ondemand.in.th  หรือส่งจดหมายมายัง 
                          บริษัท เลิร์นมายไลฟ์ จำกัด  444 อาคารเอ็ม บี เค ทาวเวอร์ ชั้น 20 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน   
                          กรุงเทพมหานคร 10330 และหากน้องมีข้อสงสัย สามารถสอบถามรายละเอียดหรือร้องเรียนได้ที่ DPO@learn.co.th
                        </div>
                      </> : <>
                        <div style={{paddingBottom : 50 , paddingTop : 20 , fontWeight : 'bold'}}>
                          {t('From1_confirmAge2')} 
                        </div>
                      </>}
                      </div>
                      <from>
                        
                      </from>
                    </div>
                  </div>
                  <div><hr className="hr-divider" style={{color:"black" }}/></div>
                  <div className='row' style={{padding : 10}}>
                    <div className='col-6' style={{textAlign : 'left'}}>
                      {/* <button className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                        ย้อนกลับ
                      </button> */}
                    </div>
                    <div className='col-6' style={{textAlign : 'right'}}>
                      <button onClick={()=>{nextPage1()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                        ถัดไป
                      </button>
                    </div>
                  </div>
                </div>
              </> : <></>}
                {page == 1 ? <>
                  <div className='container hold-transition' style={{backgroundColor : 'white' , borderRadius : 5}}>
                    <div className='row'>
                      <div className='col-4'></div>
                      <div className='col-4'></div>
                      <div className='col-4' style={{padding : 20}}>
                        <div style={{textAlign : 'right'}}>
                          <select id="inputState"  name="language" onChange={handleChangeLanguage("faculty")} value={language}  className="form-control">
                            <option name="language" value="th">
                              Thai
                            </option>
                            <option name="language" value="en">
                              English (US)
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='text' style={{padding : 15 , fontSize : 20 , fontWeight : 'bold'}}>
                      {t('from1_title_quiz')} 
                    </div>

                    <div style={{padding : 15 , fontSize : 16 }}>
                      {t('from1_quiz15min')} 
                    </div>

                    <div style={{padding : 15 , fontSize : 16 }}>
                      {t('from1_anwser')} 
                    </div>

                    <div><hr className="hr-divider" style={{color:"black"}}/></div>
                    <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                      <div className='row'>
                        {quiz1.length > 0 ? <>
                          {quiz1.map((item , index)=>{
                            return(
                              <>
                                {index > 1 && index < 12 ?
                                  <>
                                    
                                    <div className='col-12' style={{paddingTop : 30 , fontSize : 16}}>
                                      {checkAnswer.length > 0 ?
                                        <>
                                          {checkAnswer[index] === '' ?
                                            <>
                                              <span style={{color: 'red', fontSize: 25}}>
                                                {language === 'th' ? <>ยังไม่ได้ทำ</> : <>Unfinished</>}
                                                <br/>
                                              </span>
                                            </>
                                            : <></>
                                          }
                                        </>
                                        : <></>
                                      }
                                      {item.id - 2} . {language == 'th' ? item.title : item.title_eng} {item.answer == "" ? <><span style={{color: 'red' , fontWeight : 'bold' , fontSize : 25}}>*</span></> : <></>} 
                                      <div className='row'>
                                        <div onClick={()=>{updataAnswer("ไม่เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                          <input type="radio" checked={item.answer === "ไม่เห็นด้วยอย่างมาก" ? true : false }  /> {t('from1_anwser1')}
                                        </div>

                                        <div onClick={()=>{updataAnswer("ไม่เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                          <input type="radio" checked={item.answer === "ไม่เห็นด้วย" ?true : false } /> {t('from1_anwser2')}
                                        </div>

                                        <div onClick={()=>{updataAnswer("ไม่แน่ใจ" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                          <input type="radio" checked={item.answer === "ไม่แน่ใจ" ?true : false } /> {t('from1_anwser3')}
                                        </div>

                                        <div onClick={()=>{updataAnswer("เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                          <input type="radio" checked={item.answer === "เห็นด้วย" ?true : false }/> {t('from1_anwser4')}
                                        </div>

                                        <div onClick={()=>{updataAnswer("เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                          <input type="radio" checked={item.answer === "เห็นด้วยอย่างมาก" ?true : false }/> {t('from1_anwser5')}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                  : <></>
                                }
                              </>
                            )
                          })}
                        </> : <></>}
                      </div>
                    </div>
                    <div><hr className="hr-divider" style={{color:"black" }}/></div>
                    <div className='row' style={{padding : 10}}>
                      <div className='col-4' style={{textAlign : 'left'}}></div>
                      <div className='col-4' style={{textAlign : 'center'}}>
                        {checkAnswer.length === questionCount ?
                          <>
                           {checkAll == false ? <>
                              <span style={{color : 'green', fontSize: 20}}>
                                {language == 'th' ? <> ทำข้อสอบครบเเล้ว</> : <>Finished Question</>}
                              </span>
                            </> : <>
                              <span style={{color : 'red', fontSize: 20}}>
                                {language == 'th' ? <>ข้อที่ยังไม่ได้ทำ</> : <>Unfinished Question</>}
                              </span>
                            </>}
                            {checkAnswer.map((check, index)=>{
                                if(check==='') {
                                    return(
                                        <>
                                            {`${index-1} `}
                                        </>
                                    )
                                }
                            })}
                          </>
                        : <></>
                        }
                      </div>
                      <div className='col-4' style={{textAlign : 'right'}}>
                        <button onClick={()=>{nextPage1()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                          {language == 'th' ? 'ถัดไป':'Next'}
                        </button>
                      </div>
                    </div>
                  </div>
                </> : <></>}
                {page === 2 ? <>
                    <div className='container hold-transition' style={{backgroundColor : 'white' , borderRadius : 5}}>
                      <div className='row'>
                        <div className='col-4'></div>
                        <div className='col-4'></div>
                        <div className='col-4' style={{padding : 20}}>
                          <div style={{textAlign : 'right'}}>
                            <select id="inputState"  name="language" onChange={handleChangeLanguage("faculty")} value={language}  className="form-control">
                              <option name="language" value="th">
                                Thai
                              </option>
                              <option name="language" value="en">
                                English (US)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='text' style={{padding : 15 , fontSize : 20 , fontWeight : 'bold'}}>
                        {t('from1_title_quiz')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_quiz15min')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_anwser')} 
                      </div>

                      <div><hr className="hr-divider" style={{color:"black"}}/></div>
                      <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                        <div className='row'>
                          {quiz1.length > 0 ? <>
                            {quiz1.map((item , index)=>{
                              return(
                                <>
                                {index > 11 && index < 22 ? <>
                                  <div className='col-12' style={{paddingTop : 30 , fontSize : 16}}>
                                    {checkAnswer.length > 0 ?
                                      <>
                                        {checkAnswer[index] === '' ?
                                          <>
                                            <span style={{color: 'red', fontSize: 25}}>
                                              {language === 'th' ? <>ยังไม่ได้ทำ</> : <>Unfinished</>}
                                              <br/>
                                            </span>
                                          </>
                                          : <></>
                                        }
                                      </>
                                      : <></>
                                    }
                                    {item.id - 2} . {language == 'th' ? item.title : item.title_eng} {item.answer == "" ? <><span style={{color: 'red' , fontWeight : 'bold' , fontSize : 25}}>*</span></> : <></>} 
                                    <div className='row'>
                                      <div onClick={()=>{updataAnswer("ไม่เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่เห็นด้วยอย่างมาก" ? true : false }  /> {t('from1_anwser1')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("ไม่เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่เห็นด้วย" ?true : false } /> {t('from1_anwser2')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("ไม่แน่ใจ" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่แน่ใจ" ?true : false } /> {t('from1_anwser3')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "เห็นด้วย" ?true : false }/> {t('from1_anwser4')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "เห็นด้วยอย่างมาก" ?true : false }/> {t('from1_anwser5')}
                                      </div>
                                    </div>  
                                  </div>
                                </> : <></>}
                                
                                </>
                              )
                            })}
                          </> : <></>}
                        </div>
                      </div>
                      <div><hr className="hr-divider" style={{color:"black" }}/></div>
                      <div className='row' style={{padding : 10}}>
                        <div className='col-4' style={{textAlign : 'left'}}>
                          <button onClick={()=>{setPage(page-1)}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                            {language == 'th' ? 'ย้อนกลับ':'ฺBack'}
                          </button>
                        </div>
                        <div className='col-4' style={{textAlign : 'center'}}>
                          {checkAnswer.length === questionCount ?
                            <>
                              {checkAll == false ? <>
                                <span style={{color : 'green', fontSize: 20}}>
                                  {language == 'th' ? <> ทำข้อสอบครบเเล้ว</> : <>Finished Question</>}
                                </span>
                              </> : <>
                                <span style={{color : 'red', fontSize: 20}}>
                                  {language == 'th' ? <>ข้อที่ยังไม่ได้ทำ</> : <>Unfinished Question</>}
                                </span>
                              </>}
                              {checkAnswer.map((check, index)=>{
                                  if(check==='') {
                                      return(
                                          <>
                                              {`${index-1} `}
                                          </>
                                      )
                                  }
                              })}
                            </>
                          : <></>
                          }
                        </div>
                        <div className='col-4' style={{textAlign : 'right'}}>
                          <button onClick={()=>{nextPage1()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                            {language == 'th' ? 'ถัดไป':'Next'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                  : <></>
                  }
                  {page === 3 ? <>
                    <div className='container hold-transition' style={{backgroundColor : 'white' , borderRadius : 5}}>
                      <div className='row'>
                        <div className='col-4' style={{padding : 20}}>
                          <div className='col-6' style={{textAlign : 'left'}}>
                              <button onClick={()=>{window.history.back()}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                                  {language == 'th' ?  'ย้อนกลับ หน้าหลัก':'Back main page'}
                              </button>
                          </div>
                        </div>
                        <div className='col-4'></div>
                        <div className='col-4' style={{padding : 20}}>
                          <div style={{textAlign : 'right'}}>
                            <select id="inputState"  name="language" onChange={handleChangeLanguage("faculty")} value={language}  className="form-control">
                              <option name="language" value="th">Thai</option>
                              <option name="language" value="en">English (US)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='text' style={{padding : 15 , fontSize : 20 , fontWeight : 'bold'}}>
                        {t('from1_title_quiz')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_quiz15min')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_anwser')} 
                      </div>

                      <div><hr className="hr-divider" style={{color:"black"}}/></div>
                      <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                        <div className='row'>
                          {quiz1.length > 0 ?
                            <>
                              {quiz1.map((item , index)=>{
                                return(
                                  <>
                                    {index > 21 && index < 32 ? <>
                                      <div className='col-12' style={{paddingTop : 30 , fontSize : 16}}>
                                        {checkAnswer.length > 0 ?
                                          <>
                                            {checkAnswer[index] === '' ?
                                              <>
                                                <span style={{color: 'red', fontSize: 25}}>
                                                  {language === 'th' ? <>ยังไม่ได้ทำ</> : <>Unfinished</>}
                                                  <br/>
                                                </span>
                                              </>
                                              : <></>
                                            }
                                          </>
                                          : <></>
                                        }
                                        {item.id - 2} . {language == 'th' ? item.title : item.title_eng} {item.answer == "" ? <><span style={{color: 'red' , fontWeight : 'bold' , fontSize : 25}}>*</span></> : <></>} 
                                        <div className='row'>
                                          <div onClick={()=>{updataAnswer("ไม่เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                            <input type="radio" checked={item.answer === "ไม่เห็นด้วยอย่างมาก" ? true : false }  /> {t('from1_anwser1')}
                                          </div>

                                          <div onClick={()=>{updataAnswer("ไม่เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                            <input type="radio" checked={item.answer === "ไม่เห็นด้วย" ?true : false } /> {t('from1_anwser2')}
                                          </div>

                                          <div onClick={()=>{updataAnswer("ไม่แน่ใจ" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                            <input type="radio" checked={item.answer === "ไม่แน่ใจ" ?true : false } /> {t('from1_anwser3')}
                                          </div>

                                          <div onClick={()=>{updataAnswer("เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                            <input type="radio" checked={item.answer === "เห็นด้วย" ?true : false }/> {t('from1_anwser4')}
                                          </div>

                                          <div onClick={()=>{updataAnswer("เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                            <input type="radio" checked={item.answer === "เห็นด้วยอย่างมาก" ?true : false }/> {t('from1_anwser5')}
                                          </div>
                                        </div>  
                                      </div>
                                      </>
                                      : <></>
                                    }
                                  </>
                                )
                              })}
                            </>
                            : <></>
                          }
                        </div>
                      </div>
                      <div><hr className="hr-divider" style={{color:"black" }}/></div>
                      <div className='row' style={{padding : 10}}>
                        <div className='col-4' style={{textAlign : 'left'}}>
                          <button onClick={()=>{setPage(page-1)}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                            {language == 'th' ? 'ย้อนกลับ':'ฺBack'}
                          </button>
                        </div>
                        <div className='col-4' style={{textAlign : 'center'}}>
                          {checkAnswer.length === questionCount ?
                            <>
                                {checkAll == false ? <>
                                  <span style={{color : 'green', fontSize: 20}}>
                                    {language == 'th' ? <> ทำข้อสอบครบเเล้ว</> : <>Finished Question</>}
                                  </span>
                                </> : <>
                                  <span style={{color : 'red', fontSize: 20}}>
                                    {language == 'th' ? <>ข้อที่ยังไม่ได้ทำ</> : <>Unfinished Question</>}
                                  </span>
                                </>}
                              {checkAnswer.map((check, index)=>{
                                  if(check==='') {
                                      return(
                                          <>
                                              {`${index-1} `}
                                          </>
                                      )
                                  }
                              })}
                            </>
                          : <></>
                          }
                        </div>
                        <div className='col-4' style={{textAlign : 'right'}}>
                          <button onClick={()=>{nextPage1()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                            {language == 'th' ? 'ถัดไป':'Next'}
                          </button>
                        </div>
                      </div>
                </div>
                </>
                : <></>
              }
                  {page === 4 ?
                    <>
                      <div className='container hold-transition' style={{backgroundColor : 'white' , borderRadius : 5}}>
                      <div className='row'>
                        <div className='col-4'></div>
                        <div className='col-4'></div>
                        <div className='col-4' style={{padding : 20}}>
                          <div style={{textAlign : 'right'}}>
                            <select id="inputState"  name="language" onChange={handleChangeLanguage("faculty")} value={language}  className="form-control">
                              <option name="language" value="th">
                                Thai
                              </option>
                              <option name="language" value="en">
                                English (US)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='text' style={{padding : 15 , fontSize : 20 , fontWeight : 'bold'}}>
                        {t('from1_title_quiz')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_quiz15min')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_anwser')} 
                      </div>

                      <div><hr className="hr-divider" style={{color:"black"}}/></div>
                      <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                        <div className='row'>
                          {quiz1.length > 0 ? <>
                            {quiz1.map((item , index)=>{
                              return(
                                <>
                                {index > 31 && index < 42 ? <>
                                  <div className='col-12' style={{paddingTop : 30 , fontSize : 16}}>
                                    {checkAnswer.length > 0 ?
                                      <>
                                        {checkAnswer[index] === '' ?
                                          <>
                                            <span style={{color: 'red', fontSize: 25}}>
                                              {language === 'th' ? <>ยังไม่ได้ทำ</> : <>Unfinished</>}
                                              <br/>
                                            </span>
                                          </>
                                          : <></>
                                        }
                                      </>
                                      : <></>
                                    }
                                    {item.id - 2} . {language == 'th' ? item.title : item.title_eng} {item.answer == "" ? <><span style={{color: 'red' , fontWeight : 'bold' , fontSize : 25}}>*</span></> : <></>} 
                                    <div className='row'>
                                      <div onClick={()=>{updataAnswer("ไม่เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่เห็นด้วยอย่างมาก" ? true : false }  /> {t('from1_anwser1')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("ไม่เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่เห็นด้วย" ?true : false } /> {t('from1_anwser2')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("ไม่แน่ใจ" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่แน่ใจ" ?true : false } /> {t('from1_anwser3')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "เห็นด้วย" ?true : false }/> {t('from1_anwser4')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "เห็นด้วยอย่างมาก" ?true : false }/> {t('from1_anwser5')}
                                      </div>
                                    </div>  
                                  </div>
                                </> : <></>}
                                
                                </>
                              )
                            })}
                          </> : <></>}
                        </div>
                      </div>
                      <div><hr className="hr-divider" style={{color:"black" }}/></div>
                      <div className='row' style={{padding : 10}}>
                        <div className='col-4' style={{textAlign : 'left'}}>
                          <button onClick={()=>{setPage(page-1)}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                            {language == 'th' ? 'ย้อนกลับ':'ฺBack'}
                          </button>
                        </div>
                        <div className='col-4' style={{textAlign : 'center'}}>
                          {checkAnswer.length === questionCount ?
                            <>
                              {checkAll == false ? <>
                                <span style={{color : 'green', fontSize: 20}}>
                                  {language == 'th' ? <> ทำข้อสอบครบเเล้ว</> : <>Finished Question</>}
                                </span>
                              </> : <>
                                <span style={{color : 'red', fontSize: 20}}>
                                  {language == 'th' ? <>ข้อที่ยังไม่ได้ทำ</> : <>Unfinished Question</>}
                                </span>
                              </>}
                              {checkAnswer.map((check, index)=>{
                                  if(check==='') {
                                      return(
                                          <>
                                              {`${index-1} `}
                                          </>
                                      )
                                  }
                              })}
                            </>
                          : <></>
                          }
                        </div>
                        <div className='col-4' style={{textAlign : 'right'}}>
                          <button onClick={()=>{nextPage1()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                            {language == 'th' ? 'ถัดไป':'Next'}
                          </button>
                        </div>
                      </div>
                    </div>
                    </>
                    : <></>
                  }
                  {page === 5 ?
                    <>
                      <div className='container hold-transition' style={{backgroundColor : 'white' , borderRadius : 5}}>
                      <div className='row'>
                        <div className='col-4'></div>
                        <div className='col-4'></div>
                        <div className='col-4' style={{padding : 20}}>
                          <div style={{textAlign : 'right'}}>
                            <select id="inputState"  name="language" onChange={handleChangeLanguage("faculty")} value={language}  className="form-control">
                              <option name="language" value="th">
                                Thai
                              </option>
                              <option name="language" value="en">
                                English (US)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='text' style={{padding : 15 , fontSize : 20 , fontWeight : 'bold'}}>
                        {t('from1_title_quiz')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_quiz15min')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_anwser')} 
                      </div>

                      <div><hr className="hr-divider" style={{color:"black"}}/></div>
                      <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                        <div className='row'>
                          {quiz1.length > 0 ? <>
                            {quiz1.map((item , index)=>{
                              return(
                                <>
                                {index > 41 && index < 52 ? <>
                                  <div className='col-12' style={{paddingTop : 30 , fontSize : 16}}>
                                    {checkAnswer.length > 0 ?
                                      <>
                                        {checkAnswer[index] === '' ?
                                          <>
                                            <span style={{color: 'red', fontSize: 25}}>
                                              {language === 'th' ? <>ยังไม่ได้ทำ</> : <>Unfinished</>}
                                              <br/>
                                            </span>
                                          </>
                                          : <></>
                                        }
                                      </>
                                      : <></>
                                    }
                                    {item.id - 2} . {language == 'th' ? item.title : item.title_eng} {item.answer == "" ? <><span style={{color: 'red' , fontWeight : 'bold' , fontSize : 25}}>*</span></> : <></>} 
                                    <div className='row'>
                                      <div onClick={()=>{updataAnswer("ไม่เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่เห็นด้วยอย่างมาก" ? true : false }  /> {t('from1_anwser1')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("ไม่เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่เห็นด้วย" ?true : false } /> {t('from1_anwser2')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("ไม่แน่ใจ" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่แน่ใจ" ?true : false } /> {t('from1_anwser3')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "เห็นด้วย" ?true : false }/> {t('from1_anwser4')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "เห็นด้วยอย่างมาก" ?true : false }/> {t('from1_anwser5')}
                                      </div>
                                    </div>  
                                  </div>
                                </> : <></>}
                                
                                </>
                              )
                            })}
                          </> : <></>}
                        </div>
                      </div>
                      <div><hr className="hr-divider" style={{color:"black" }}/></div>
                      <div className='row' style={{padding : 10}}>
                        <div className='col-4' style={{textAlign : 'left'}}>
                          <button onClick={()=>{setPage(page-1)}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                            {language == 'th' ? 'ย้อนกลับ':'ฺBack'}
                          </button>
                        </div>
                        <div className='col-4' style={{textAlign : 'center'}}>
                          {checkAnswer.length === questionCount ?
                            <>
                              {checkAll == false ? <>
                                <span style={{color : 'green', fontSize: 20}}>
                                  {language == 'th' ? <> ทำข้อสอบครบเเล้ว</> : <>Finished Question</>}
                                </span>
                              </> : <>
                                <span style={{color : 'red', fontSize: 20}}>
                                  {language == 'th' ? <>ข้อที่ยังไม่ได้ทำ</> : <>Unfinished Question</>}
                                </span>
                              </>}
                              {checkAnswer.map((check, index)=>{
                                  if(check==='') {
                                      return(
                                          <>
                                              {`${index-1} `}
                                          </>
                                      )
                                  }
                              })}
                            </>
                          : <></>
                          }
                        </div>
                        <div className='col-4' style={{textAlign : 'right'}}>
                          <button onClick={()=>{nextPage1()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                            {language == 'th' ? 'ถัดไป':'Next'}
                          </button>
                        </div>
                      </div>
                    </div>
                    </>
                    : <></>
                  }
                  {page === 6 ?
                    <>
                      <div className='container hold-transition' style={{backgroundColor : 'white' , borderRadius : 5}}>
                      <div className='row'>
                        <div className='col-4'></div>
                        <div className='col-4'></div>
                        <div className='col-4' style={{padding : 20}}>
                          <div style={{textAlign : 'right'}}>
                            <select id="inputState"  name="language" onChange={handleChangeLanguage("faculty")} value={language}  className="form-control">
                              <option name="language" value="th">
                                Thai
                              </option>
                              <option name="language" value="en">
                                English (US)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='text' style={{padding : 15 , fontSize : 20 , fontWeight : 'bold'}}>
                        {t('from1_title_quiz')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_quiz15min')} 
                      </div>

                      <div style={{padding : 15 , fontSize : 16 }}>
                        {t('from1_anwser')} 
                      </div>

                      <div><hr className="hr-divider" style={{color:"black"}}/></div>
                      <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                        <div className='row'>
                          {quiz1.length > 0 ? <>
                            {quiz1.map((item , index)=>{
                              return(
                                <>
                                {index > 51 && index < 62 ? <>
                                  <div className='col-12' style={{paddingTop : 30 , fontSize : 16}}>
                                    {checkAnswer.length > 0 ?
                                      <>
                                        {checkAnswer[index] === '' ?
                                          <>
                                            <span style={{color: 'red', fontSize: 25}}>
                                              {language === 'th' ? <>ยังไม่ได้ทำ</> : <>Unfinished</>}
                                              <br/>
                                            </span>
                                          </>
                                          : <></>
                                        }
                                      </>
                                      : <></>
                                    }
                                    {item.id - 2} . {language == 'th' ? item.title : item.title_eng} {item.answer == "" ? <><span style={{color: 'red' , fontWeight : 'bold' , fontSize : 25}}>*</span></> : <></>} 
                                    <div className='row'>
                                      <div onClick={()=>{updataAnswer("ไม่เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่เห็นด้วยอย่างมาก" ? true : false }  /> {t('from1_anwser1')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("ไม่เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่เห็นด้วย" ?true : false } /> {t('from1_anwser2')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("ไม่แน่ใจ" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "ไม่แน่ใจ" ?true : false } /> {t('from1_anwser3')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("เห็นด้วย" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "เห็นด้วย" ?true : false }/> {t('from1_anwser4')}
                                      </div>

                                      <div onClick={()=>{updataAnswer("เห็นด้วยอย่างมาก" , item)}} type='button' className='col-6 col-md-2 col-lg-2 col-xl-2'>
                                        <input type="radio" checked={item.answer === "เห็นด้วยอย่างมาก" ?true : false }/> {t('from1_anwser5')}
                                      </div>
                                    </div>  
                                  </div>
                                </> : <></>}
                                
                                </>
                              )
                            })}
                          </> : <></>}
                        </div>
                      </div>
                      <div><hr className="hr-divider" style={{color:"black" }}/></div>
                      <div className='row' style={{padding : 10}}>
                        <div className='col-4' style={{textAlign : 'left'}}>
                          <button onClick={()=>{setPage(page-1)}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                            {language == 'th' ? 'ย้อนกลับ':'ฺBack'}
                          </button>
                        </div>
                        <div className='col-4' style={{textAlign : 'center'}}>
                          {checkAnswer.length == questionCount ?
                            <>
                             
                                {checkAll == false ? <>
                                  <span style={{color : 'green', fontSize: 20}}>
                                    {language == 'th' ? <> ทำข้อสอบครบเเล้ว</> : <>Finished Question</>}
                                  </span>
                                </> : <>
                                  <span style={{color : 'red', fontSize: 20}}>
                                    {language == 'th' ? <>ข้อที่ยังไม่ได้ทำ</> : <>Unfinished Question</>}
                                  </span>
                                </>}
                                <br/>
                              
                              {checkAnswer.map((check, index)=>{
                                  if(check=='') {
                                      return(
                                          <>
                                              {`${index-1} `}
                                          </>
                                      )
                                  }
                              })}
                            </>
                          : <></>
                          }
                        </div>
                        <div className='col-4' style={{textAlign : 'right'}}>
                            <button onClick={()=>{confirmAnswer()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                                {language == 'th' ? 'ส่งคำตอบ':'Confirm'}
                            </button>
                        </div>
                      </div>
                    </div>
                    </>
                    : <></>
                  }
              </div>
          </div>
        <footer className="fixed-bottom" aria-hidden="false" style={{textAlign : 'center' , padding : 20 , backgroundColor : 'white'}}>
            <div className="d-none">
                <b>Version</b> 1.0.0
            </div>
            <strong>Copyright © 2022 <a href="#">LEARN MY LIFE</a>.</strong> All rights reserved.
        </footer>
    </>
  )
}
