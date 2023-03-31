import React  from 'react'
import { Link } from 'react-router-dom'
import data  from '../menu.json'
import data_admin  from '../menu_admin.json'
import Logo from '../assets/img/logo-lml.png'

export default function Menu() {
  
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4 text-left" style={{backgroundColor : '#039be5'}}>
        <div className="sidebar">
          <div className="pb-6 mb-3 user">
            <div className="image">
              <div className='row'>
                <div className='col-12' style={{backgroundColor : '#ffb74d' , textAlign : 'center' , padding : 5 }}>
                  <img 
                    src={`${Logo}`}
                    style={{height : 50 , width : 'auto'}}
                  />
                </div>
              </div>
              {/* <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" /> */}
            </div>
          </div>
          <div className="form-inline">

          </div>
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {JSON.parse(localStorage.getItem("admin")).role == "super admin" ? <>
              {data.map((item)=>{
                return(
                  <>
                    <li className="nav-item">
                      <Link to={item.url} className="nav-link">
                        <i style={{color : 'white' , fontWeight : 'bold'}} className={item.icon}></i>
                        <p style={{color : 'white' , fontWeight : 'bold'}}>
                          {item.name}
                        </p>
                      </Link>
                    </li>
                  </>
                );
              })}
              </> : <>
              {data_admin.map((item)=>{
                return(
                  <>
                    <li className="nav-item">
                      <Link to={item.url} className="nav-link">
                        <i style={{color : 'white' , fontWeight : 'bold'}} className={item.icon}></i>
                        <p style={{color : 'white' , fontWeight : 'bold'}}>
                          {item.name}
                        </p>
                      </Link>
                    </li>
                  </>
                );
              })}
              </>}
             
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )     
}
