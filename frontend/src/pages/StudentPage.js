import React , {useState , useEffect} from 'react'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Logo from '../assets/img/logo-lml.png'
import {Link} from 'react-router-dom'
import {getList} from '../api_connection/Quiz'
import { listClasses } from '@mui/material'
import Students from '../components/Students'

export default function StudentPage() {
  const [liet , settListt] = useState([])
  useEffect(()=>{
    loadList()
  },[])
  
  const loadList = async ()=>{
    const res = await getList()
    settListt(res.data)
  }

  return (
    <>
      <Students/>
      <div className='content-wrapper' style={{backgroundColor : 'white'}}>
        <section className="content">
          <div className="row">
            <div className='col-12'>
              <div className='text text-center'>
                  <img 
                    src={`${Logo}`}
                    style={{height : 'auto' , width : 300}}
                  />
              </div>
            </div>
            <div className='col-12' style={{padding : 20}}>
              <div className='text text-center' style={{fontSize : 30 , fontWeight : 'bold'}}>
                Career Test 360
              </div>
            </div>
            
            
          </div>
          <div style={{backgroundColor : ''}}>
            <div className='row' style={{padding : 50}}>
              <div className='col-3'>

              </div>
              <div className='col-12 card'>
                <div className='text' style={{textAlign : 'center'}}>
                  <div className='table table'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th style={{textAlign :'left' , fontWeight : 'bold' , fontSize : 18}}>Assessment List</th>
                          <th style={{textAlign :'center' , fontWeight : 'bold' , fontSize : 18}}>Status</th>
                          <th style={{textAlign :'center'}}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {liet.length != 0 ? <>
                          {liet.map((item , index)=>{
                            return(
                              <>
                                <tr>
                                  <td style={{textAlign :'left' , fontWeight : 'bold' , fontSize : 18}}>{`${index+1} ${item.text}`} </td>
                                  <td style={{textAlign :'center'}}>
                                  {item.status === true ? <>
                                    <div className='text-center' style={{fontSize : 20 , fontWeight : 'bold' , color : '#43a047'}}>
                                      Done
                                    </div>
                                  </> : <>
                                    <div className='text-center' style={{fontSize : 20 , fontWeight : 'bold' , color : 'red'}}>
                                      Unfinished
                                    </div>
                                  </>}
                                  </td>
                                  <td style={{textAlign :'center' , fontWeight : 'bold' , fontSize : 18}}>
                                    {item.status === true ? <></> :
                                      <>
                                        <Link to={`/student/quiz-from${index+1}`}>
                                          ทำแบบทดสอบ
                                        </Link>
                                      </>
                                    }
                                  </td>
                                </tr>
                              </>
                            )
                          })}
                        </> : <></>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='col-3'>

              </div>
            </div>
          </div>
        </section>
      </div>
      



      {/* <div className='fixed-top' aria-hidden="false" style={{textAlign : 'center' , padding : 15 , backgroundColor : '#ffb74d'}}>
        <div >
          <span style={{fontWeight : 'bold' }}>ระบบแบบสอบถาม
            <img 
              src={`${Logo}`}
              style={{height : 50}}
            />
          </span>
        </div>
      </div>
      <div className='container-fluid' style={{marginTop : 100}}>

      </div> */}
    </>
    
  )
}
