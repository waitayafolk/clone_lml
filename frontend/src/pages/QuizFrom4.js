import React, {useState , useEffect , useContext} from 'react'
import Logo from '../assets/img/logo-lml.png'
import from1 from '../assets/img/from1.png'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { getQuiz4 , sendAnswer , countScore4 , sendAnswer4 , getStrong10Point } from '../api_connection/Quiz';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../LangaugeContext";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function QuizFrom4() {
    const { language, setLanguage } = useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [quiz4 , setQuiz4] = useState([])
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [left_eng, setLeft_eng] = React.useState([]);
    
    const [right, setRight] = React.useState([]);
    const [page , setPage] = useState(1);
    const [checkAnswer, setCheckAnswer] = useState([]);
    const [questionCount, setQuestionCount] = useState(0)

    const nextPage1 = () => {setPage(page+1)}

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const [checkAll , setCheckAll] = useState(false)
    useEffect(()=>{
        i18n.changeLanguage(language);
        loadQuiz4()
        loadStrong10Point()
    },[language])

    const loadStrong10Point = async() => {
        const res = await getStrong10Point()
        let left = []
        let left_eng = []
        for(let index of res.data){
            left.push(index.name)
            left_eng.push(index.name_eng)
        }
        setLeft(left)
        setLeft_eng(left_eng)
    }

    const loadQuiz4 = async()=>{
        const res = await getQuiz4()
        let result = []
        let count = await res.data.length
        for(let index of res.data){
            index.answer = ""
            result.push(index)
        }
        setQuiz4(result)
        setQuestionCount(count);
    }

    const updataAnswer = async (answer , item)=>{
        let response = item
        let data = checkAnswer
        const index = quiz4.findIndex((e) => e.id === response.id);
        if (index === -1) {
    
        } else {
          quiz4[index].answer = answer
        }
        setQuiz4((quiz4) => [...quiz4,])
        
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
        let invalid = true;
        let data = []
        for(let answer of quiz4){
            if(answer.answer === ''){
                invalid = false
            }
            data.push(answer.answer)
            setCheckAnswer(data)
        }

        if(invalid === false){
            setCheckAll(true)
                Swal.fire({
                icon: 'error',
                title: 'กรุณาตอบคำถามให้ครบ',
                showConfirmButton: false,
                timer: 1500
            })
            setCheckAll(true)
        }else if (left.length > 0 ){
            Swal.fire({
                icon: 'error',
                title: 'กรุณาตอบคำถามให้ครบ',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            let score = await countScore4(quiz4)
            let data = {
                quiz : quiz4 ,
                quiz_id : 4 ,
                score : score ,
                right : right ,
            }
            
            let res = await sendAnswer4(data)

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

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
        } else {
        setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title, items) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                <Checkbox
                    onClick={handleToggleAll(items)}
                    checked={numberOfChecked(items) === items.length && items.length !== 0}
                    indeterminate={
                    numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                    }
                    disabled={items.length === 0}
                    inputProps={{
                    'aria-label': 'all items selected',
                    }}
                />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} `}
            />
        <Divider />
            <List
                sx={{
                width: 200,
                height: 230,
                bgcolor: 'background.paper',
                overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => {
                const labelId = `transfer-list-all-item-${value}-label`;

                return (
                    <ListItem
                    key={value}
                    role="listitem"
                    button
                    onClick={handleToggle(value)}
                    >
                    <ListItemIcon>
                        <Checkbox
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value}`} />
                    </ListItem>
                );
                })}
                <ListItem />
            </List>
        </Card>
    );

    const handleChangeLanguage = (prop) => (event) => {
        setLanguage(event.target.value)
        setCheckAnswer([])
    };

  return (
    <>
        <div className='fixed-top' aria-hidden="false" style={{ padding : 15 , backgroundColor : '#ffb74d'}}>
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4' style={{textAlign : 'center'}}>
                    <span style={{fontWeight : 'bold' }}>แบบสอบถาม
                        <img src={`${Logo}`} style={{height : 50}}/>
                    </span>
                </div>
                <div className='col-4'></div>
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
                       {t('title_From4')}
                    </div>
                    <div style={{ paddingLeft : 30 , textAlign : 'center' , fontSize : 18}}>
                        {t('title_From4_detail')}
                    </div>

                    <div><hr className="hr-divider" style={{color:"black"}}/></div>

                    {page === 1 ?
                        <>
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz4.length > 0 ?
                                        <>
                                            {quiz4.map((item , index)=>{
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
                                                                    {/* {checkAnswer[index] === '' ? <></>:<></>} */}
                                                                    <div className='row'>
                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("เป็นประจำ หรือ เกือบเป็นประจำ" , item)}} >
                                                                            <input type="radio" checked={item.answer === "เป็นประจำ หรือ เกือบเป็นประจำ" ? true : false } /> {t('from4_anwser1')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("บ่อยครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "บ่อยครั้ง" ?true : false } /> {t('from4_anwser2')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("มีบ้างเป็นบางครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "มีบ้างเป็นบางครั้ง" ?true : false } /> {t('from4_anwser3')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("แทบไม่เคย หรือ ไม่เคยเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "แทบไม่เคย หรือ ไม่เคยเลย" ?true : false } /> {t('from4_anwser4')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" ?true : false } /> {t('from4_anwser5')}
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
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz4.length > 0 ?
                                        <>
                                            {quiz4.map((item , index)=>{
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
                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("เป็นประจำ หรือ เกือบเป็นประจำ" , item)}} >
                                                                            <input type="radio" checked={item.answer === "เป็นประจำ หรือ เกือบเป็นประจำ" ? true : false } /> {t('from4_anwser1')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("บ่อยครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "บ่อยครั้ง" ?true : false } /> {t('from4_anwser2')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("มีบ้างเป็นบางครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "มีบ้างเป็นบางครั้ง" ?true : false } /> {t('from4_anwser3')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("แทบไม่เคย หรือ ไม่เคยเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "แทบไม่เคย หรือ ไม่เคยเลย" ?true : false } /> {t('from4_anwser4')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" ?true : false } /> {t('from4_anwser5')}
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
                                </div>
                            </div>
                        </>
                        : <></>
                    }
                    {page === 3 ?
                        <>
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz4.length > 0 ?
                                        <>
                                            {quiz4.map((item , index)=>{
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
                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("เป็นประจำ หรือ เกือบเป็นประจำ" , item)}} >
                                                                            <input type="radio" checked={item.answer === "เป็นประจำ หรือ เกือบเป็นประจำ" ? true : false } /> {t('from4_anwser1')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("บ่อยครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "บ่อยครั้ง" ?true : false } /> {t('from4_anwser2')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("มีบ้างเป็นบางครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "มีบ้างเป็นบางครั้ง" ?true : false } /> {t('from4_anwser3')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("แทบไม่เคย หรือ ไม่เคยเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "แทบไม่เคย หรือ ไม่เคยเลย" ?true : false } /> {t('from4_anwser4')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" ?true : false } /> {t('from4_anwser5')}
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
                                </div>
                            </div>
                        </>
                        : <></>
                    }
                    {page === 4 ?
                        <>
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz4.length > 0 ?
                                        <>
                                            {quiz4.map((item , index)=>{
                                                return(
                                                    <>
                                                        {index > 29 && index < 40 ?
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
                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("เป็นประจำ หรือ เกือบเป็นประจำ" , item)}} >
                                                                            <input type="radio" checked={item.answer === "เป็นประจำ หรือ เกือบเป็นประจำ" ? true : false } /> {t('from4_anwser1')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("บ่อยครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "บ่อยครั้ง" ?true : false } /> {t('from4_anwser2')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("มีบ้างเป็นบางครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "มีบ้างเป็นบางครั้ง" ?true : false } /> {t('from4_anwser3')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("แทบไม่เคย หรือ ไม่เคยเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "แทบไม่เคย หรือ ไม่เคยเลย" ?true : false } /> {t('from4_anwser4')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" ?true : false } /> {t('from4_anwser5')}
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
                                </div>
                            </div>
                        </>
                        : <></>
                    }
                    {page === 5 ?
                        <>
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz4.length > 0 ?
                                        <>
                                            {quiz4.map((item , index)=>{
                                                return(
                                                    <>
                                                        {index > 39 && index < 50 ?
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
                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("เป็นประจำ หรือ เกือบเป็นประจำ" , item)}} >
                                                                            <input type="radio" checked={item.answer === "เป็นประจำ หรือ เกือบเป็นประจำ" ? true : false } /> {t('from4_anwser1')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("บ่อยครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "บ่อยครั้ง" ?true : false } /> {t('from4_anwser2')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("มีบ้างเป็นบางครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "มีบ้างเป็นบางครั้ง" ?true : false } /> {t('from4_anwser3')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("แทบไม่เคย หรือ ไม่เคยเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "แทบไม่เคย หรือ ไม่เคยเลย" ?true : false } /> {t('from4_anwser4')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" ?true : false } /> {t('from4_anwser5')}
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
                                </div>
                            </div>
                        </>
                        : <></>
                    }
                    {page === 6 ?
                        <>
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz4.length > 0 ?
                                        <>
                                            {quiz4.map((item , index)=>{
                                                return(
                                                    <>
                                                        {index > 49 && index < 60 ?
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
                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("เป็นประจำ หรือ เกือบเป็นประจำ" , item)}} >
                                                                            <input type="radio" checked={item.answer === "เป็นประจำ หรือ เกือบเป็นประจำ" ? true : false } /> {t('from4_anwser1')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("บ่อยครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "บ่อยครั้ง" ?true : false } /> {t('from4_anwser2')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("มีบ้างเป็นบางครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "มีบ้างเป็นบางครั้ง" ?true : false } /> {t('from4_anwser3')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("แทบไม่เคย หรือ ไม่เคยเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "แทบไม่เคย หรือ ไม่เคยเลย" ?true : false } /> {t('from4_anwser4')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" ?true : false } /> {t('from4_anwser5')}
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
                                </div>
                            </div>
                        </>
                        : <></>
                    }
                    {page === 7 ?
                        <>
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz4.length > 0 ?
                                        <>
                                            {quiz4.map((item , index)=>{
                                                return(
                                                    <>
                                                        {index > 59 && index < 70 ?
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
                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("เป็นประจำ หรือ เกือบเป็นประจำ" , item)}} >
                                                                            <input type="radio" checked={item.answer === "เป็นประจำ หรือ เกือบเป็นประจำ" ? true : false } /> {t('from4_anwser1')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("บ่อยครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "บ่อยครั้ง" ?true : false } /> {t('from4_anwser2')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("มีบ้างเป็นบางครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "มีบ้างเป็นบางครั้ง" ?true : false } /> {t('from4_anwser3')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("แทบไม่เคย หรือ ไม่เคยเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "แทบไม่เคย หรือ ไม่เคยเลย" ?true : false } /> {t('from4_anwser4')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" ?true : false } /> {t('from4_anwser5')}
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
                                </div>
                            </div>
                        </>
                        : <></>
                    }
                    {page === 8 ?
                        <>
                            <div style={{paddingRight : 30 , paddingLeft : 30 }}>
                                <div className='row'>
                                    {quiz4.length > 0 ?
                                        <>
                                            {quiz4.map((item , index)=>{
                                                return(
                                                    <>
                                                        {index > 69 && index < 80 ?
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
                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("เป็นประจำ หรือ เกือบเป็นประจำ" , item)}} >
                                                                            <input type="radio" checked={item.answer === "เป็นประจำ หรือ เกือบเป็นประจำ" ? true : false } /> {t('from4_anwser1')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("บ่อยครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "บ่อยครั้ง" ?true : false } /> {t('from4_anwser2')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("มีบ้างเป็นบางครั้ง" , item)}}>
                                                                            <input type="radio" checked={item.answer === "มีบ้างเป็นบางครั้ง" ?true : false } /> {t('from4_anwser3')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("แทบไม่เคย หรือ ไม่เคยเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "แทบไม่เคย หรือ ไม่เคยเลย" ?true : false } /> {t('from4_anwser4')}
                                                                        </div>

                                                                        <div className='col-12 col-md-12 col-lg-12 col-xl-12' type="button" onClick={()=>{updataAnswer("คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" , item)}}>
                                                                            <input type="radio" checked={item.answer === "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย" ?true : false } /> {t('from4_anwser5')}
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
                                </div>
                            </div>
                        </>
                        : <></>
                    }
                    {page === 9 ?
                        <>
                            <div className='col-12'>
                                <div className='text text-center' style={{fontSize : 25 , fontWeight : "bold"}}>
                                    แบบสอบถาม
                                </div>
                                <div className='text text-center' style={{fontSize : 18 , fontWeight : "bold" , color : 'red'}}>
                                    ให้เรียงลำดับความสัมพันของฝั่งซ้ายมาไว้ฝั่งทางขวาให้ครบ (ตอบตามความเป็นจริง) *
                                </div>
                                <div style={{padding : 30}}>
                                    <Grid container spacing={6} justifyContent="center" alignItems="center">
                                        <Grid item>{customList('ตัวเลือก', left)}</Grid>
                                            <Grid item>
                                                <Grid container direction="column" alignItems="center">
                                                    <Button
                                                        sx={{ my: 0.5 }}
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={handleCheckedRight}
                                                        disabled={leftChecked.length === 0}
                                                        aria-label="move selected right"
                                                    >
                                                        &gt;
                                                    </Button>
                                                    <Button
                                                        sx={{ my: 0.5 }}
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={handleCheckedLeft}
                                                        disabled={rightChecked.length === 0}
                                                        aria-label="move selected left"
                                                    >
                                                        &lt;
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        <Grid item>{customList('เลือกเเล้ว', right)}</Grid>
                                    </Grid>
                                </div>
                            </div>
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
                                    <button id='confirmButton' onClick={()=>{confirmAnswer()}} className='btn btn-primary' type='button' style={{fontSize : 20 , width : 200}}>
                                        {language == 'th' ? 'ส่งคำตอบ':'Confirm'}
                                    </button>
                                </div>
                            </div>
                        </>
                        :<></>
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
