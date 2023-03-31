import React , {useState , useEffect , useContext} from 'react'
import {Link} from 'react-router-dom'
import Students from '../components/Students'
import backgrond from '../assets/img/backgrond_png.png'
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../LangaugeContext";
import { sort_jobs , sort_jobs2 , sort_jobs3 , sort_jobs4 , sort_jobs5 } from '../api_connection/StudentReport'
import {getList} from '../api_connection/Quiz'
import Swal from 'sweetalert2'

export default function StudentReportJobs() {
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
        console.log(total_jobs)
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
        console.log(total_jobs)
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
        console.log(total_jobs)
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
        console.log(total_jobs)
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
        console.log(total_jobs)
    }
  return (
    <>
        <div className="row">
            <div className='col-12' style={{padding : 20}}>
                {/* <div className='text text-center' style={size > 768 ? {fontSize : 70 , fontWeight : 'bold' , color : '#42a5f5'} :  {fontSize : 40 , fontWeight : 'bold' , color : '#42a5f5'}}>
                    <span style={{color :'black'}}>ภาพรวม</span>ของฉัน
                </div>
                <div className='text text-center' style={size > 768 ? {fontSize : 30 , fontWeight : 'bold' , color : '#212121'} :  {fontSize : 20 , fontWeight : 'bold' , color : '#212121'}} >
                    ฐานเงินเดือนโดยเฉลี่ย*
                </div> */}
            </div>
        </div>
    </>
  )
}