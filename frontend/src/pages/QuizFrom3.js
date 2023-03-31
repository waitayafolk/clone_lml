import React, {useState , useEffect , useContext} from 'react'
import Logo from '../assets/img/logo-lml.png'
import from1 from '../assets/img/from1.png'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { getQuiz3 , sendAnswer3 } from '../api_connection/Quiz';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../LangaugeContext";

export default function QuizFrom3() {
    const { language, setLanguage } = useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [quiz3 , setQuiz3] = useState([])
    const [page , setPage] = useState(1)
    const [checkAnswer, setCheckAnswer] = useState([]);
    const [questionCount, setQuestionCount] = useState(0)
    const [checkAll , setCheckAll] = useState(false)
    const nextPage1 = () => {setPage(page+1)}

    useEffect(()=>{
        i18n.changeLanguage(language);
        loadQuiz3()
    },[language])
    
    const loadQuiz3 = async()=>{
        const res = await getQuiz3()
        let result = []
        let count = await res.data.length
        for(let index of res.data){
            index.answer = ""
            result.push(index)
        }
        setQuiz3(result)
        setQuestionCount(count);
    }

    const updataAnswer = async (answer , item)=>{
        let response = item;
        let data = checkAnswer;
        const index = quiz3.findIndex((e) => e.id === response.id);
        if (index === -1) {
    
        } else {
            
          quiz3[index].answer = answer
        }
        setQuiz3((quiz3) => [...quiz3,])

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
        let data =[];

        for(let answer of quiz3){
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
            let total_score = 0
            for(let index of quiz3){
                total_score += parseInt(index.answer)
                index.point = parseInt(index.answer)
            }
            let data = {
                quiz : quiz3,
                quiz_id : 3,
                total_score : total_score
            }
            
            let res = await sendAnswer3(data)

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
                                    {language == 'th' ?  'ย้อนกลับ หน้าหลัก':'Back main page'}
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

                    <div style={{ paddingLeft : 30 , textAlign : 'center' , fontSize : 25 , fontWeight : 'bold'}}>
                        {t('title_From3')}
                    </div>
                    <div style={{ paddingLeft : 30 , textAlign : 'center' , fontSize : 18}}>
                        {t('title_From3_detail')}
                    </div>

                    <div><hr className="hr-divider" style={{color:"black"}}/></div>
                    {/* <div style={{ padding : 30 , textAlign : 'left' , fontSize : 25 , fontWeight : 'bold'}}>
                        อ่านข้อความอย่างตั้งใจ แล้วพิจารณาว่าข้อความต่อไปนี้ สำคัญกับงานในฝันของฉันมากน้อยขนาดไหน
                    </div>
                    <div><hr className="hr-divider" style={{color:"black"}}/></div> */}
                    <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                        <div className='row'>
                            {quiz3.length > 0 ?
                                <>
                                    {page === 1 ?
                                        <>
                                            {quiz3.map((item , index)=>{
                                                return(
                                                    <>
                                                        {index < 10 ?
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
                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("1" , item)}} 
                                                                                style={ item.answer === "1" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30  , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                1
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("2" , item)}} 
                                                                                style={ item.answer === "2" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                2
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("3" , item)}} 
                                                                                style={ item.answer === "3" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                3
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("4" , item)}} 
                                                                                style={ item.answer === "4" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' ,  height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                4
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>
                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("5" , item)}} 
                                                                                style={ item.answer === "5" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30  , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                5
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
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
                                                {/* <button onClick={()=>{setPage(page-1)}}  className='btn btn-dark' type='button' style={{fontSize : 20 , width : 200}}>
                                                    {language == 'th' ? 'ย้อนกลับ':'ฺBack'}
                                                </button> */}
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
                                    {page === 2 ?
                                        <>
                                            {quiz3.map((item , index)=>{
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
                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("1" , item)}} 
                                                                                style={ item.answer === "1" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30  , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                1
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("2" , item)}} 
                                                                                style={ item.answer === "2" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                2
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("3" , item)}} 
                                                                                style={ item.answer === "3" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                3
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("4" , item)}} 
                                                                                style={ item.answer === "4" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' ,  height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                4
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>
                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("5" , item)}} 
                                                                                style={ item.answer === "5" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30  , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                5
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
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
                                                    <button onClick={()=>{nextPage1()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                                                        {language == 'th' ? 'ถัดไป':'Next'}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                        : <></>
                                    }
                                    {page === 3 ?
                                        <>
                                            {quiz3.map((item , index)=>{
                                                return(
                                                    <>
                                                        {index > 19 && index < 30 ?
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
                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("1" , item)}} 
                                                                                style={ item.answer === "1" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30  , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                1
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("2" , item)}} 
                                                                                style={ item.answer === "2" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                2
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("3" , item)}} 
                                                                                style={ item.answer === "3" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                3
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("4" , item)}} 
                                                                                style={ item.answer === "4" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' ,  height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                4
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>
                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("5" , item)}} 
                                                                                style={ item.answer === "5" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30  , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                5
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
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
                                                    <button onClick={()=>{nextPage1()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                                                        {language == 'th' ? 'ถัดไป':'Next'}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                        : <></>
                                    }
                                    {page === 4 ?
                                        <>
                                            {quiz3.map((item , index)=>{
                                                return(
                                                    <>
                                                        {index > 29 && index < 41 ?
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
                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("1" , item)}} 
                                                                                style={ item.answer === "1" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30  , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                1
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("2" , item)}} 
                                                                                style={ item.answer === "2" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                2
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("3" , item)}} 
                                                                                style={ item.answer === "3" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                3
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>

                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("4" , item)}} 
                                                                                style={ item.answer === "4" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30 , color : 'white' , fontWeight : 'bold' ,  height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                4
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
                                                                        </div>
                                                                        <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
                                                                            <div type="button"
                                                                                onClick={()=>{updataAnswer("5" , item)}} 
                                                                                style={ item.answer === "5" ? 
                                                                                    {backgroundColor : '#66bb6a' , width : 30  , color : 'white' , fontWeight : 'bold' , height : 30 , textAlign : "center" , borderRadius : '50%'} 
                                                                                    : 
                                                                                    { backgroundColor : 'white' , border: '1px solid #000000' , width : 30 , height : 30 , textAlign : "center" , borderRadius : '50%' }}>
                                                                                5
                                                                            </div>
                                                                            {/* <input type="radio" checked={item.answer === "1" ? true : false } onClick={()=>{updataAnswer("1" , item)}} /> 1 */}
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
                                </>
                                : <></>
                            }
                        </div>
                    </div>
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
