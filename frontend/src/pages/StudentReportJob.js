import React , {useState , useEffect , useContext} from 'react'
import {Link} from 'react-router-dom'
import Students from '../components/Students'
import image04 from '../assets/img/image04.png'
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../LangaugeContext";
import { sort_jobs , sort_jobs2 , sort_jobs3 , sort_jobs4 , sort_jobs5 } from '../api_connection/StudentReport'
import {getList} from '../api_connection/Quiz'
import Swal from 'sweetalert2'

export default function StudentReportJob() {
    const [size , setSize] = useState(window.innerWidth)
    const [jobs , setJobs] = useState([])

    const { language, setLanguage } = useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const handleResize = () => {
        setSize(window.innerWidth)
    }

    useEffect(()=>{
        window.addEventListener("resize", handleResize)
        i18n.changeLanguage(language);
        getData()
        loadList()
    },[language])

    const loadList = async ()=>{
        const res = await getList()
        let all_quiz = true
        for(let index of res.data){
            if(index.status == false){
                all_quiz = false
            }
        }
        if(all_quiz == false){
            window.history.back()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณาสอบให้ครบ !!??',
              })
        }else{

        }
      }

    const getData = async () => {
        let total_jobs = []
        let jobs = await sort_jobs()
        total_jobs.push(jobs)
        let jobs2 = await sort_jobs2()
        let stop = 0
        for(let index of jobs2){
            if(stop == 0){
                if(index.id != total_jobs[0].id){
                    total_jobs.push(index)
                    stop++
                }
            }
        }
        let jobs3 = await sort_jobs3()
        stop = 0
        for(let index of jobs3){
            if(stop == 0){
                if(index.id != total_jobs[0].id && index.id != total_jobs[1].id ){
                    total_jobs.push(index)
                    stop++
                }
            }
        }
        let jobs4 = await sort_jobs4()
        stop = 0
        for(let index of jobs4){
            if(stop == 0){
                if(index.id != total_jobs[0].id && index.id != total_jobs[1].id && index.id != total_jobs[2].id ){
                    total_jobs.push(index)
                    stop++
                }
            }
        }

        let jobs5 = await sort_jobs5()
        stop = 0
        for(let index of jobs5){
            if(stop == 0){
                if(index.id != total_jobs[0].id && index.id != total_jobs[1].id && index.id != total_jobs[2].id&& index.id != total_jobs[3].id  ){
                    total_jobs.push(index)
                    stop++
                }
            }
        }
        setJobs(total_jobs)
    }

  return (
        <>
            <div className="row">
                <div className='col-12' style={{padding : 20}}>
                    <div className='text text-center' style={size > 768 ? {fontSize : 70 , fontWeight : 'bold' , color : '#42a5f5'} :  {fontSize : 40 , fontWeight : 'bold' , color : '#42a5f5'}}>
                        4
                    </div>
                    <div className='text text-center' style={size > 768 ? {fontSize : 70 , fontWeight : 'bold' , color : '#212121'} :  {fontSize : 40 , fontWeight : 'bold' , color : '#212121'}} >
                        {t('my_possible_career')}
                    </div>
                </div>
                <div  className='col-12 text-center'>
                    <div className='contrainer'>    
                        <img
                            src={`${image04}`}
                            style={size > 768 ? {width : 450} :  {width : 200} }
                        />
                    </div>
                </div>
                {jobs.length > 0 ? <>
                    {jobs.map((item,index)=>{
                        return(
                            <>
                                <div className='hold-transition col-12'>
                                    <div className='text-center p-3' style={size > 768 ? {fontSize : 40 , fontWeight : 'bold'} :  {fontSize : 25 , fontWeight : 'bold'}}>
                                        {item.jobs}
                                    </div>
                                    <div className='text-center p-3' style={size > 768 ? {fontSize : 40 , fontWeight : 'bold'} :  {fontSize : 25 , fontWeight : 'bold'}}>
                                        <spann style={{color : '#42a5f5' }}>{item.jobs_eng}</spann> 
                                    </div>
                                </div>

                                <div className='col-12' style={{paddingLeft : 10 , paddingTop : 60}}>
                                    <div className='box col-9' style={{zIndex : 1 , marginLeft : -40 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                                        <div style={size > 768 ? { paddingLeft : 30, fontSize : 25 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            {t('responsibilities')}
                                        </div>
                                    </div>
                                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            <div style={{padding : 20}}>
                                                <p>
                                                    {language == 'th' ? item.description_eng : item.description} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12' style={{paddingLeft : 10 , paddingTop : 60}}>
                                    <div className='box col-9' style={{zIndex : 1 , marginLeft : -40 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                                        <div style={size > 768 ? { paddingLeft : 30, fontSize : 25 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            {t('occupation_specific_information')}
                                        </div>
                                    </div>
                                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            <div style={{padding : 10}}>
                                                <p>
                                                    {t('details_of_the_work')} 
                                                </p>
                                            </div>
                                            
                                            {item.jobs_task.length > 0 ? <>
                                                {item.jobs_task.map((task , index)=>{
                                                    return(
                                                        <>
                                                            {index <= 4 ? <p> - {language == 'th' ? task.task : task.task_en} </p> : <></>}
                                                        </>
                                                    )
                                                })}
                                            </> : 
                                            <></>}
                                        </div>
                                    </div>
                                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            <div style={{padding : 10}}>
                                                <p>
                                                    {t('knowledge_and_related_subjects')}
                                                </p>
                                            </div>
                                            {item.jobs_knowledge.length > 0 ? <>
                                                {item.jobs_knowledge.map((task , index)=>{
                                                    return(
                                                        <>
                                                            {index <= 4 ? <p> - {language == 'th' ? task.knowledge : task.knowledge_en} </p> : <></>}
                                                        </>
                                                    )
                                                })}
                                            </> : 
                                            <></>}
                                            
                                        </div>
                                    </div>
                                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            <p>
                                                {t('related_faculties')} : {item.faculty_all}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12' style={{paddingLeft : 10 , paddingTop : 60}}>
                                    <div className='box col-9' style={{zIndex : 1 , marginLeft : -40 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                                        <div style={size > 768 ? { paddingLeft : 30, fontSize : 25 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            {t('necessary_skills')}
                                        </div>
                                    </div>
                                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            <div style={{padding : 10}}>
                                                <p>
                                                    {t('What_will_be_done_in_this_work')}
                                                </p>
                                            </div>
                                            {item.jobs_activities.length > 0 ? <>
                                                {item.jobs_activities.map((activities , index)=>{
                                                    return(
                                                        <>
                                                            {index <= 4 ? <p> - {language == 'th' ? activities.work_activitie : activities.work_activitie_en}</p> : <></>}
                                                        </>
                                                    )
                                                })}
                                            </> : 
                                            <></>}
                                        </div>
                                    </div>
                                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            <div style={{padding : 10}}>
                                                <p>
                                                    {t('Important_skills_you_should_have')}
                                                </p>
                                            </div>
                                            {item.jobs_skill.length > 0 ? <>
                                                {item.jobs_skill.map((skill , index)=>{
                                                    return(
                                                        <>
                                                            {index <= 4 ? <p> -  {language == 'th' ? skill.skill : skill.skill_en} </p> : <></>}
                                                        </>
                                                    )
                                                })}
                                            </> : 
                                            <></>}
                                        </div>
                                    </div>
                                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            <div style={{padding : 10}}>
                                                <p>
                                                    {t('skills_that_need_further_development')}
                                                </p>
                                            </div>
                                            {item.jobs_abilitie.length > 0 ? <>
                                                {item.jobs_abilitie.map((abilitie , index)=>{
                                                    return(
                                                        <>
                                                            {index <= 4 ? <p> - {language == 'th' ? abilitie.abilitie : abilitie.abilitie_en}</p> : <></>}
                                                        </>
                                                    )
                                                })}
                                            </> : 
                                            <></>}
                                        </div>
                                    </div>
                                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                        {/* <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            <p>
                                                ตัวอย่างงานอื่นที่คล้ายคลึงกัน :
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                                <div className='col-12' style={{paddingLeft : 10 , paddingTop : 60}}>
                                    <div className='box col-9' style={{zIndex : 1 , marginLeft : -40 , border: '1px solid #000000' , borderRadius : 6 , padding : 10 , backgroundColor : '#81d4fa' , borderColor : '#81d4fa' }}>
                                        <div style={size > 768 ? { paddingLeft : 30, fontSize : 25 , color :'black' , fontWeight : 'bold'} : { paddingLeft : 30, fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            {t('occupation_specific_information')}
                                        </div>
                                    </div>
                                    <div className='col-12' style={{marginTop : -15 , paddingTop : 30  , border: '1px solid #F3F3F4' , borderRadius : 10 , padding : 10 , backgroundColor : '#F3F3F4' , borderColor : '#F3F3F4' }}>
                                        <div  style={size > 768 ? {fontSize : 16 , color :'black' , fontWeight : 'bold'} : { fontSize : 14 , color :'black' , fontWeight : 'bold'}}>
                                            <div style={{padding : 30}}>
                                                <p>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {t('It_is_a_career_that_has_very_little')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </>

                        )
                    })}
                </> : <></>}
            </div>
        </>
  )
}
