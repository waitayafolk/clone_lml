import React, {useState , useEffect , useContext} from 'react'
import Logo from '../assets/img/logo-lml.png'
import from1 from '../assets/img/from1.png'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { getQuiz2 , sendAnswer2 , countScore2} from '../api_connection/Quiz';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../LangaugeContext";

export default function QuizFrom2() {
    const navigate = useNavigate();
    const [quiz2 , setQuiz2] = useState([]);
    const { language, setLanguage } = useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    const [page , setPage] = useState(1);
    const [checkAnswer, setCheckAnswer] = useState([]);
    const [questionCount, setQuestionCount] = useState(0);
    const [checkAll , setCheckAll] = useState(false)
    useEffect(()=>{
        i18n.changeLanguage(language);
        loadQuiz2()
    },[language])

    const nextPage1 = () => {setPage(page+1)}
      
    const loadQuiz2 = async()=>{
        const res = await getQuiz2()
        let result = []
        let count = await res.data.length
        for(let index of res.data){
            index.answer = ""
            result.push(index)
        }
        setQuiz2(result)
        setQuestionCount(count);
    }

    const updataAnswer = async (answer , item)=>{
        let response = item
        let data = checkAnswer
        const index = quiz2.findIndex((e) => e.id === response.id);
        if (index === -1) {
    
        } else {
          quiz2[index].answer = answer
        }
        setQuiz2((quiz2) => [...quiz2,])

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

    const confirmAnswer = async ()=>{
        let invalid = true
        let data = [];
    
        for(let answer of quiz2){
          if(answer.answer === ''){
            invalid = false
          }
          data.push(answer.answer)
          setCheckAnswer(data)
        }
        if(invalid === false){
           
          Swal.fire({
            icon: 'error',
            title: 'กรุณาตอบคำถามให้ครบ',
            showConfirmButton: false,
            timer: 1500
          })
          setCheckAll(true)
        }else{
            let score = await countScore2(quiz2)

            let data = {
                quiz : quiz2,
                quiz_id : 2,
                score : score,
            }
              
            let res = await sendAnswer2(data)

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

    const handleChangeLanguage = (prop) => (event) => {
        setLanguage(event.target.value)
        setCheckAnswer([])
      };

  return (
    <>
        <div className='fixed-top' aria-hidden="false" style={{ padding : 15 , backgroundColor : '#ffb74d'}}>
            <div className='row'>
                <div className='col-4'>

                </div>
                <div className='col-4' style={{textAlign : 'center'}}>
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
                <div className='container hold-transition' style={{backgroundColor : 'white' , borderRadius : 5}}>
                    <div className='row'>
                        <div className='col-4' style={{padding : 20}}>
                            <div className='col-6' style={{textAlign : 'left'}}>
                                <button onClick={()=>{window.history.back()}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                                    {language == 'th' ? 'ย้อนกลับ หน้าหลัก':'Back main page'}
                                </button>
                            </div>
                        </div>
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

                    <div style={{display : 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '33%'}}></div>
                        <div style={{width: '34%'}}>
                            <img
                                src={Logo}
                                alt='Logo'
                                style={{width : '300px' , marginLeft : 'auto' , marginRight : 'auto' , display : 'block'}}
                            />
                        </div>
                        <div style={{width: '33%', wordWrap: 'break-word'}}>
                            {/* {checkAnswer.length === questionCount ?
                                <>
                                    <span style={{color : 'red', fontSize: 20}}>
                                        {language === 'th' ? <>ข้อที่ยังไม่ได้ทำ</> : <>Unfinished Question</>}
                                        <br/>
                                    </span>
                                    {checkAnswer.map((check, index)=>{
                                        console.log('log',check)
                                        if(check==='') {
                                            return(
                                                <>
                                                    {`${index+1} `}
                                                </>
                                            )
                                        }
                                    })}
                                </>
                                : <></>
                            } */}
                        </div>
                    </div>
                   
                    {page === 1 ?
                        <>
                            <div style={{ paddingLeft : 30 , textAlign : 'left' , fontSize : 25 , fontWeight : 'bold'}}>
                                {t('title_From2')}
                            </div>
                            <div style={{ paddingLeft : 30 , textAlign : 'left' , fontSize : 18}}>
                                {t('title_From2_detail')}
                            </div>

                            <div><hr className="hr-divider" style={{color:"black"}}/></div>
                            <div style={{ padding : 30 , textAlign : 'left' , fontSize : 25 , fontWeight : 'bold'}}>
                                {t('title_From2_description')}
                            </div>
                            <div><hr className="hr-divider" style={{color:"black"}}/></div>
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz2.length > 0 ?
                                        <>
                                            {quiz2.map((item , index)=>{
                                                return(
                                                    <>
                                                        {(index) < 10 ?
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
                                                                    {index+1} . {language == 'th' ? item.title : item.title_eng} {item.answer == "" ? <><span style={{color: 'red' , fontWeight : 'bold' , fontSize : 25}}>*</span></> : <></>} 
                                                                    <div className='row'>
                                                                        <div onClick={()=>{updataAnswer("สำคัญมากที่สุด" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "สำคัญมากที่สุด" ? true : false } /> {t('from2_anwser1')}
                                                                        </div>

                                                                        <div onClick={()=>{updataAnswer("สำคัญมาก" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "สำคัญมาก" ?true : false }/>  {t('from2_anwser2')}
                                                                        </div>

                                                                        <div onClick={()=>{updataAnswer("สำคัญปานกลาง" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "สำคัญปานกลาง" ?true : false } />  {t('from2_anwser3')}
                                                                        </div>

                                                                        <div onClick={()=>{updataAnswer("สำคัญน้อย" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "สำคัญน้อย" ?true : false } />  {t('from2_anwser4')}
                                                                        </div>

                                                                        <div onClick={()=>{updataAnswer("ไม่สำคัญเลย" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "ไม่สำคัญเลย" ?true : false } />  {t('from2_anwser5')}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <></>
                                                        }
                                                        
                                                    </>
                                                )
                                            })}
                                            <div><hr className="hr-divider" style={{color:"black" }}/></div>
                                            <div className='row' style={{padding : 10, display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                                <div className='col-4' style={{textAlign : 'left'}}>
                                                {/* <button onClick={()=>{setPage(page-1)}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                                                    {language == 'th' ? 'ย้อนกลับ':'ฺBack'}
                                                </button> */}
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
                                        </>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </>
                        : <></>
                    }
                    {page === 2 ?
                        <>
                            <div style={{ paddingLeft : 30 , textAlign : 'left' , fontSize : 25 , fontWeight : 'bold'}}>
                                {t('title_From2')}
                            </div>
                            <div style={{ paddingLeft : 30 , textAlign : 'left' , fontSize : 18}}>
                                {t('title_From2_detail')}
                            </div>

                            <div><hr className="hr-divider" style={{color:"black"}}/></div>
                            <div style={{ padding : 30 , textAlign : 'left' , fontSize : 25 , fontWeight : 'bold'}}>
                                {t('title_From2_description')}
                            </div>
                            <div><hr className="hr-divider" style={{color:"black"}}/></div>
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz2.length > 0 ?
                                        <>
                                            {quiz2.map((item , index)=>{
                                                return(
                                                    <>
                                                        {index > 9 && index < 20 ?
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
                                                                    {index+1} . {language == 'th' ? item.title : item.title_eng} {item.answer == "" ? <><span style={{color: 'red' , fontWeight : 'bold' , fontSize : 25}}>*</span></> : <></>} 
                                                                    <div className='row'>
                                                                        <div onClick={()=>{updataAnswer("สำคัญมากที่สุด" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "สำคัญมากที่สุด" ? true : false } /> {t('from2_anwser1')}
                                                                        </div>

                                                                        <div onClick={()=>{updataAnswer("สำคัญมาก" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "สำคัญมาก" ?true : false }/>  {t('from2_anwser2')}
                                                                        </div>

                                                                        <div onClick={()=>{updataAnswer("สำคัญปานกลาง" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "สำคัญปานกลาง" ?true : false } />  {t('from2_anwser3')}
                                                                        </div>

                                                                        <div onClick={()=>{updataAnswer("สำคัญน้อย" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "สำคัญน้อย" ?true : false } />  {t('from2_anwser4')}
                                                                        </div>

                                                                        <div onClick={()=>{updataAnswer("ไม่สำคัญเลย" , item)}} type="button" className='col-4 col-md-3 col-lg-2 col-xl-2'>
                                                                            <input type="radio" checked={item.answer === "ไม่สำคัญเลย" ?true : false } />  {t('from2_anwser5')}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : <></>
                                                        }
                                                    </>
                                                )
                                            })}
                                            <div><hr className="hr-divider" style={{color:"black" }}/></div>
                                            <div className='row' style={{padding : 10, display: 'flex', justifyContent: 'space-between', width: '100%'}}>
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
                                                    <button onClick={()=>{confirmAnswer()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                                                        {language == 'th' ? 'ส่งคำตอบ':'Confirm'}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </>
                        : <></>
                    }
                </div>
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
