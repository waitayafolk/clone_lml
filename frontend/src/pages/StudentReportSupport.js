import React , {useState , useEffect , useContext} from 'react'
import {Link} from 'react-router-dom'
import Students from '../components/Students'
import image03 from '../assets/img/image03.png'
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../LangaugeContext";

export default function StudentReportSupport() {
    const [size , setSize] = useState(window.innerWidth)

    const handleResize = () => {
        setSize(window.innerWidth)
    }
    const { language, setLanguage } = useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(()=>{
        i18n.changeLanguage(language);
        window.addEventListener("resize", handleResize)
    },[language])
    return (
        <>
            <div className="row">
                <div className='col-12' style={{padding : 20}}>
                    <div className='text text-center' style={size > 768 ? {fontSize : 70 , fontWeight : 'bold' , color : '#42a5f5'} :  {fontSize : 40 , fontWeight : 'bold' , color : '#42a5f5'}}>
                        3
                    </div>
                    <div className='text text-center' style={size > 768 ? {fontSize : 70 , fontWeight : 'bold' , color : '#212121'} :  {fontSize : 40 , fontWeight : 'bold' , color : '#212121'}} >
                        {t('preparation')}
                    </div>
                </div>
                <div  className='col-12 text-center'>
                    <div className='contrainer'>    
                        <img
                            src={`${image03}`}
                            style={size > 768 ? {width : 450} :  {width : 200} }
                        />
                    </div>
                </div>
                <div className='hold-transition col-12'>
                    <div className='text-center p-3' style={size > 768 ? {fontSize : 40 , fontWeight : 'bold'} :  {fontSize : 25 , fontWeight : 'bold'}}>
                        {t('preparations')}<spann style={{color : '#42a5f5' }}>{t('career')}</spann> 
                    </div>
                    <div className='text-left p-3' style={size > 768 ? {paddingLeft : 30 , paddingRight : 30 , fontSize : 20 , fontWeight : 'bold'} :  {paddingLeft : 30 , paddingRight : 30 , fontSize : 16 , fontWeight : 'bold'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {t('before_you_have')} <span style={{color : '#42a5f5'}}>{t('readiness_to_make')}</span> {t('this_readiness_will')}
                    </div>
                </div>

                <div className='col-12' style={{paddingLeft : 10 , paddingTop : 60}}>
                    <div className='box col-9' style={{zIndex : 1 , marginLeft : -40 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                        <div style={size > 768 ? { paddingLeft : 30, fontSize : 25 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                            {t('What_is_something')}
                        </div>
                    </div>
                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                            <div style={{padding : 30}}>
                                <p>
                                    1.&nbsp;&nbsp;  {t('beliefs_related')}
                                </p>
                                <p>
                                    2.&nbsp;&nbsp;  {t('confusion_caused')}
                                </p>
                                <p>
                                    3.&nbsp;&nbsp;  {t('lack_of_knowledge')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12' style={{paddingLeft : 10 , paddingTop : 60}}>
                    <div className='box col-9' style={{zIndex : 1 , marginLeft : -40 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                        <div style={size > 768 ? { paddingLeft : 30, fontSize : 25 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                            {t('how_to_increase')}
                        </div>
                    </div>
                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                            <div style={{padding : 30}}>
                                <p>
                                    1.&nbsp;&nbsp;  {t('in_the_current')}
                                </p>
                                <p>
                                    2.&nbsp;&nbsp;  {t('understand_why')}
                                </p>
                                <p>
                                    3.&nbsp;&nbsp;  {t('explore_careers')}
                                </p>
                                <p>
                                    4.&nbsp;&nbsp;  {t('participate_in_the')}
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='col-12' style={{paddingLeft : 10 , paddingTop : 60}}>
                    <div className='box col-9' style={{zIndex : 1 , marginLeft : -40 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                        <div style={size > 768 ? { paddingLeft : 30, fontSize : 25 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                            {t('what_is_necessary')}
                        </div>
                    </div>
                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                            <div style={{padding : 30}}>
                                <p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {t('in_a_world_where_technology')}
                                </p>
                                <p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {t('developing_this_skill')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
