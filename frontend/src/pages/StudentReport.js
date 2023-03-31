import React , {useState , useEffect , useContext} from 'react'
import {Link} from 'react-router-dom'
import Students from '../components/Students'
import image01 from '../assets/img/image01.png'
import image03 from '../assets/img/image03.png'
import backgrond from '../assets/img/backgrond_png.png'
import {getReport , getRaisec} from '../api_connection/StudentReport'
import StudentReportStr from './StudentReportStr'
import StudentReportSupport from './StudentReportSupport'
import StudentReportJob from './StudentReportJob'
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../LangaugeContext";
import StudentReportJobs from "./StudentReportJobs"

export default function StudentReport() {
    const [size , setSize] = useState(window.innerWidth)
    const [raisec , setRaisec] = useState({
        character_1 : "" ,
        long_meaning_1 : "" ,
        long_meaning_eng_1 : "" ,
        short_meaning_1 : "" ,
        short_meaning_eng_1 : "" ,
        type_1 : "" ,
        type_eng_1 :"" , 
        character_2 : "" ,
        long_meaning_2 : "" ,
        long_meaning_eng_2 : "" ,
        short_meaning_2 : "" ,
        short_meaning_eng_2 : "" ,
        type_2 : "" ,
        type_eng_2 :"" , 
    })
    const { language, setLanguage } = useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const handleResize = () => {
        setSize(window.innerWidth)
    }

    useEffect(()=>{
        i18n.changeLanguage(language);
        window.addEventListener("resize", handleResize)
        getData()
    },[language])

    const handleChangeLanguage = (prop) => (event) => {
        setLanguage(event.target.value)
      };
    const getData = async () => {
        let res = await getReport()
        let raisec = await getRaisec()
        let point = []
        let data = []
        for (const key in res.data) {
            if(key == 'artistic' || key == 'investigative' || key == 'realistic' || key == 'enterprising' || key == 'social' || key == 'conventional'){
                point.push(res.data[key])
                if(key == 'artistic'){
                    data.push({
                        name : key,
                        point : res.data[key],
                        title : 'A'
                    })
                }else if (key == 'investigative'){
                    data.push({
                        name : key,
                        point : res.data[key],
                        title : 'I'
                    })
                }else if (key == 'realistic'){
                    data.push({
                        name : key,
                        point : res.data[key],
                        title : 'R'
                    })
                }else if (key == 'enterprising'){
                    data.push({
                        name : key,
                        point : res.data[key],
                        title : 'E'
                    })
                }else if (key == 'social'){
                    data.push({
                        name : key,
                        point : res.data[key],
                        title : 'S'
                    })
                }else if (key == 'conventional'){
                    data.push({
                        name : key,
                        point : res.data[key],
                        title : 'C'
                    })
                }
            }
        }
        data.sort(function(a, b) {
            return  b.point - a.point;
        });
        for(let index = 0 ; index < 2 ; index++){
            for(let rais of raisec.data ){
                const item = data.findIndex((e) => e.title === rais.character);
                if (item === -1) {
                } else {
                    data[item].raisec = rais
                }
            }
        }
        let rat_sec = {
            character_1 : data[0].raisec.character ,
            long_meaning_1 : data[0].raisec.long_meaning ,
            long_meaning_eng_1 : data[0].raisec.long_meaning_eng ,
            short_meaning_1 : data[0].raisec.short_meaning ,
            short_meaning_eng_1 : data[0].raisec.short_meaning_eng ,
            type_1 : data[0].raisec.type ,
            type_eng_1 : data[0].raisec.type_eng ,
            character_2 : data[1].raisec.character ,
            long_meaning_2 : data[1].raisec.long_meaning ,
            long_meaning_eng_2 : data[1].raisec.long_meaning_eng ,
            short_meaning_2 : data[1].raisec.short_meaning ,
            short_meaning_eng_2 : data[1].raisec.short_meaning_eng ,
            type_2 : data[1].raisec.type ,
            type_eng_2 : data[1].raisec.type_eng ,
        }
        setRaisec(rat_sec)
    }
    return (
        <>
            <Students/>
            <div className='content-wrapper' style={{backgroundColor : 'white'}}>
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
                <section className="content" style={size > 768 ? {paddingLeft : 100 , paddingRight : 100 , paddingBottom : 100} : null}>
                    
                    <div className="row">
                        <div  className='col-12 text-center'>
                            <div className='contrainer'>
                                <img
                                    src={`${backgrond}`}
                                    style={size > 768 ? {width : 700} :  {width : 200} }
                                />
                            </div>
                        </div>
                        </div>
                            <div className='text-left' style={{paddingTop : 50}}>
                                <StudentReportJobs />   
                            </div>
                        <div>
                        <div className='col-12' style={{padding : 20}}>
                            <div className='text text-center' style={size > 768 ? {fontSize : 60 , fontWeight : 'bold' , color : '#42a5f5'} :  {fontSize : 40 , fontWeight : 'bold' , color : '#42a5f5'}}>
                                1
                            </div>
                            <div className='text text-center' style={size > 768 ? {fontSize : 60 , fontWeight : 'bold' , color : '#212121'} :  {fontSize : 40 , fontWeight : 'bold' , color : '#212121'}} >
                                {t('activities')}  
                            </div>
                        </div>
                        <div  className='col-12 text-center'>
                            <div className='contrainer'>
                                <img
                                    src={`${image01}`}
                                    style={size > 768 ? {width : 450} :  {width : 200} }
                                />
                            </div>
                        </div>
                        <div className='hold-transition col-12'>
                            <div className='text-center p-3' style={size > 768 ? {fontSize : 40 , fontWeight : 'bold'} :  {fontSize : 25 , fontWeight : 'bold'}}>
                                {t('discovery')} : <spann style={{color : '#42a5f5' }}>{t('activities')}</spann> 
                            </div>
                            <div className='text-left p-3' style={size > 768 ? {paddingLeft : 30 , paddingRight : 30 , fontSize : 20 , fontWeight : 'bold'} :  {paddingLeft : 30 , paddingRight : 30 , fontSize : 16 , fontWeight : 'bold'}}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t('this_book')}
                            </div>
                        </div>
                        <div className='col-12' style={{paddingLeft : 10}}>
                            <div className='box col-9' style={{zIndex : 1 , marginLeft : -30 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                                <div style={size > 768 ? { paddingLeft : 30, fontSize : 20 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                    1. {language == 'th' ? raisec.short_meaning_1 : raisec.short_meaning_eng_1} 
                                </div>
                            </div>
                            <div className='box col-12' style={{  marginTop : -15 ,  marginLeft : 20, border: '1px solid #000000' ,  borderRadius : 6 , padding : 30 , backgroundColor : '#f5f5f5' , borderColor : '#f5f5f5' }}>
                                <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                    {language == 'th' ? raisec.long_meaning_1 : raisec.long_meaning_eng_1}
                                </div>
                            </div>
                        </div>
                        <div className='text-left p-3' style={size > 768 ? {paddingLeft : 30 , paddingRight : 30 , fontSize : 20 , fontWeight : 'bold'} :  {paddingLeft : 30 , paddingRight : 30 , fontSize : 16 , fontWeight : 'bold'}}>
                            {t('in_addition')}
                        </div>
                        <div className='col-12' style={{paddingLeft : 10}}>
                            <div className='box col-9' style={{zIndex : 1 , marginLeft : -30 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                                <div style={size > 768 ? { paddingLeft : 30, fontSize : 20 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                    2. {language == 'th' ? raisec.short_meaning_2 : raisec.short_meaning_eng_2} 
                                </div>
                            </div>
                            <div className='box col-12' style={{  marginTop : -15 ,  marginLeft : 20, border: '1px solid #000000' ,  borderRadius : 6 , padding : 30 , backgroundColor : '#f5f5f5' , borderColor : '#f5f5f5' }}>
                                <div style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                    {language == 'th' ? raisec.long_meaning_2 : raisec.long_meaning_eng_2}
                                </div>
                            </div>
                        </div>
                        </div>
                            <div className='text-left' style={{paddingTop : 50}}>
                                <StudentReportStr />   
                            </div>
                        <div>
                        </div>
                            <div className='text-left' style={{paddingTop : 50}}>
                                <StudentReportSupport />   
                            </div>
                        <div>
                        </div>
                            <div className='text-left' style={{paddingTop : 50}}>
                                <StudentReportJob />   
                            </div>
                        <div>
                    </div>
                </section>
            </div>
        </>
    )
}