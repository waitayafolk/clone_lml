import React , {useState , useEffect , useContext} from 'react'
import {Link} from 'react-router-dom'
import Students from '../components/Students'
import image02 from '../assets/img/image02.png'
import {getReport4 , getStr} from '../api_connection/StudentReport'
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../LangaugeContext";


export default function StudentReport() {
    const [size , setSize] = useState(window.innerWidth)
    const [str , setStr] = useState([])

    const handleResize = () => {
        setSize(window.innerWidth)
    }
    const { language, setLanguage } = useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(()=>{
        window.addEventListener("resize", handleResize)
        i18n.changeLanguage(language);
        getData()
    },[language])

    const getData = async () => {
        let res = await getReport4()
        let str = await getStr()
        let point = []
        let data = []
        for (const key in res.data) {
            if(key == 'presence' || key == 'competing' || key == 'relating' || key == 'achieving' || key == 'future_thinker' || key == 'discoverer' || key == 'caring' || key == 'confidence' || key == 'dependability' || key == 'organizer'){
                point.push(res.data[key])
                if(key == 'presence'){
                    data.push({
                        name : "Presence",
                        point : res.data[key],
                    })
                }else if (key == 'competing'){
                    data.push({
                        name :  "Competing",
                        point : res.data[key],
                    })
                }else if (key == 'relating'){
                    data.push({
                        name : "Relating",
                        point : res.data[key],
                    })
                }else if (key == 'achieving'){
                    data.push({
                        name : "Achieving",
                        point : res.data[key],
                    })
                }else if (key == 'future_thinker'){
                    data.push({
                        name : 'Future Thinker',
                        point : res.data[key],
                    })
                }else if (key == 'discoverer'){
                    data.push({
                        name : "Discoverer",
                        point : res.data[key],
                    })
                }else if (key == 'caring'){
                    data.push({
                        name : "Caring",
                        point : res.data[key],
                    })
                }else if (key == 'confidence'){
                    data.push({
                        name : "Confidence",
                        point : res.data[key],
                    })
                }else if (key == 'dependability'){
                    data.push({
                        name : "Dependability",
                        point : res.data[key],
                    })
                }else if (key == 'organizer'){
                    data.push({
                        name : "Organizer",
                        point : res.data[key],
                    })
                }
            }
        }
        data.sort(function(a, b ) {
            return  b.point - a.point;
        });
        for(let index = 0 ; index < 3 ; index++){
            for(let str_index of str.data ){
                const item = data.findIndex((e) => e.name === str_index.name_eng);
                if (item === -1) {
                } else {
                    data[item].str = str_index
                }
            }
        }
        setStr(data)
    }
    return (
        <>
            <div className="row">
                <div className='col-12' style={{padding : 20}}>
                    <div className='text text-center' style={size > 768 ? {fontSize : 70 , fontWeight : 'bold' , color : '#42a5f5'} :  {fontSize : 40 , fontWeight : 'bold' , color : '#42a5f5'}}>
                        2
                    </div>
                    <div className='text text-center' style={size > 768 ? {fontSize : 70 , fontWeight : 'bold' , color : '#212121'} :  {fontSize : 40 , fontWeight : 'bold' , color : '#212121'}} >
                        {t('the_strength')}
                    </div>
                </div>
                <div  className='col-12 text-center'>
                    <div className='contrainer'>
                        <img
                            src={`${image02}`}
                            style={size > 768 ? {width : 450} :  {width : 200} }
                        />
                    </div>
                </div>
                <div className='hold-transition col-12'>
                    <div className='text-center p-3' style={size > 768 ? {fontSize : 40 , fontWeight : 'bold'} :  {fontSize : 25 , fontWeight : 'bold'}}>
                        {t('strength')}<spann style={{color : '#42a5f5' }}> {t('the_strength')}</spann> 
                    </div>
                    <div className='text-left p-3' style={size > 768 ? {paddingLeft : 30 , paddingRight : 30 , fontSize : 20 , fontWeight : 'bold'} :  {paddingLeft : 30 , paddingRight : 30 , fontSize : 16 , fontWeight : 'bold'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {t('in_additions')}
                    </div>
                </div>

                {str.length > 0 ? <>
                    {str.map((item , index)=>{
                        if(language == 'th'){
                            item.def = item.str.definition_th.split("✦");
                            item.up = item.str.strength_up.split("✦");
                            item.tec = item.str.technique.split("✦");
                            item.sup = item.str.subport.split("✦");
                        }else{
                            item.def = item.str.definition_eng.split("✦");
                            item.up = item.str.strength_up_eng.split("✦");
                            item.tec = item.str.technique_eng.split("✦");
                            item.sup = item.str.subport_eng.split("✦");
                        }
                        
                        return(
                            <>
                                {index <= 2 ? <>
                                    <div className='col-12' style={{paddingLeft : 10 , paddingTop : 60}}>
                                        <div className='box col-9' style={{zIndex : 1 , marginLeft : -40 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                                            <div style={size > 768 ? { paddingLeft : 30, fontSize : 25 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                                {index+1}. {t('my_hidden_strength')} :  {language == 'th' ? item.str.strength_hide : item.str.strength_hide_eng }
                                            </div>
                                        </div>
                                        <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                            <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                                {item.def.length > 0 ? <>
                                                    {item.def.map((def , i)=>{
                                                        return(
                                                            <>
                                                            {i > 0 ? <>
                                                                <div>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✦ {def}
                                                                </div>
                                                            </> : <></>}
                                                            </>
                                                        )
                                                    })}
                                                </> : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12' style={{paddingTop : 30}}>
                                        <div className='box col-12 text-center'>
                                            <div className='row'>
                                                <div className='col-4'></div>
                                                <div className='col-4' style={{zIndex : 1 }}>
                                                    <div style={{ border: '1px solid #000000' , borderRadius : 25 , padding : 5 , backgroundColor : '#0DA3DD' , borderColor : '#0DA3DD' }}>
                                                        <div style={size > 768 ? {fontSize : 18 , color :'white' , fontWeight : 'bold'} : {fontSize : 14 , color :'white' , fontWeight : 'bold'}}>
                                                            {t('caution')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-4'></div>
                                            </div>
                                        </div>
                                        <div className='col-12' style={{marginTop : -30 , paddingTop : 30 , border: '1px solid #D4E8F8' , borderRadius : 10 , padding : 10 , backgroundColor : '#D4E8F8' , borderColor : '#D4E8F8' }}>
                                            <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold' , paddingTop : 20} : { fontSize : 12 , color :'black' , fontWeight : 'bold' , paddingTop : 20}}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {language == 'th' ? item.str.warning : item.str.warning_eng }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12' style={{paddingTop : 30}}>
                                        <div className='box col-12 text-center'>
                                            <div className='row'>
                                                <div className='col-12' style={{zIndex : 1 }}>
                                                    <div style={{ width : 250 , border: '1px solid #000000' , borderRadius : 15 , padding : 5 , backgroundColor : '#0DA3DD' , borderColor : '#0DA3DD' }}>
                                                        <div style={size > 768 ? {fontSize : 16 , color :'white' , fontWeight : 'bold'} : {fontSize : 14 , color :'white' , fontWeight : 'bold'}}>
                                                            {t('how_to_develop')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12' style={{marginTop : -50 , paddingTop : 30 , border: '1px solid #D4E8F8' , borderRadius : 10 , padding : 10 , backgroundColor : '#D4E8F8' , borderColor : '#D4E8F8' }}>
                                            <div  style={size > 768 ? {fontSize : 14 , color :'black' , fontWeight : 'bold' , paddingTop : 60} : { fontSize : 14 , color :'black' , fontWeight : 'bold' , paddingTop : 60}}>
                                                {item.up.length > 0 ? <>
                                                    {item.up.map((up , i)=>{
                                                        return(
                                                            <>
                                                                {i > 0 ? <>
                                                                    <div>
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {i} {up}
                                                                    </div>
                                                                </> : <></>}
                                                            </>
                                                        )
                                                    })}
                                                </> : <></>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12' style={{paddingTop : 30}}>
                                        <div className='box col-12 text-center'>
                                            <div className='row'>
                                                <div className='col-12' style={{zIndex : 1 }}>
                                                    <div style={{ width : 150 , border: '1px solid #000000' , borderRadius : 15 , padding : 5 , backgroundColor : '#0DA3DD' , borderColor : '#0DA3DD' }}>
                                                        <div style={size > 768 ? {fontSize : 16 , color :'white' , fontWeight : 'bold'} : {fontSize : 14 , color :'white' , fontWeight : 'bold'}}>
                                                            {t('techniques')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12' style={{marginTop : -50 , paddingTop : 30 , border: '1px solid #D4E8F8' , borderRadius : 10 , padding : 10 , backgroundColor : '#D4E8F8' , borderColor : '#D4E8F8' }}>
                                            <div  style={size > 768 ? {fontSize : 14 , color :'black' , fontWeight : 'bold' , paddingTop : 60} : { fontSize : 14 , color :'black' , fontWeight : 'bold' , paddingTop : 60}}>
                                                {item.tec.map((tec , i)=>{
                                                    return(
                                                        <>
                                                            {i > 0 ? <>
                                                                <div>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {i} {tec}
                                                                </div>
                                                            </> : <></>}
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12' style={{paddingTop : 30}}>
                                        <div className='box col-12 text-center'>
                                            <div className='row'>
                                                <div className='col-12' style={{zIndex : 1 }}>
                                                    <div style={{ width : 300 , border: '1px solid #000000' , borderRadius : 15 , padding : 5 , backgroundColor : '#0DA3DD' , borderColor : '#0DA3DD' }}>
                                                        <div style={size > 768 ? {fontSize : 16 , color :'white' , fontWeight : 'bold'} : {fontSize : 14 , color :'white' , fontWeight : 'bold'}}>
                                                            {t('parents_can_support')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12' style={{marginTop : -50 , paddingTop : 30 , border: '1px solid #D4E8F8' , borderRadius : 10 , padding : 10 , backgroundColor : '#D4E8F8' , borderColor : '#D4E8F8' }}>
                                            <div  style={size > 768 ? {fontSize : 14 , color :'black' , fontWeight : 'bold' , paddingTop : 60} : { fontSize : 14 , color :'black' , fontWeight : 'bold' , paddingTop : 60}}>
                                                {item.sup.map((sup , i)=>{
                                                    return(
                                                        <>
                                                            {i > 0 ? <>
                                                                <div>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {i} {sup}
                                                                </div>
                                                            </> : <></>}
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{paddingTop : 100}}>

                                    </div>
                                </> : <></>}
                            </>
                        )
                    })}
                </> : <></> }
            </div>
        </>
    )
}
