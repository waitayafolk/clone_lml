import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../assets/img/logo-lml.png'

export default function Students() {

    const logOut = async ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('students')
        window.location.href = "/student-login"
    }

    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-dark" style={{backgroundColor : '#ffb74d' , borderColor : '#ffb74d'}}>
                <ul className="navbar-nav ml-auto">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                </ul>
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                    <i className="fa fa-caret-down" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <div className="dropdown-divider" />
                    <div className="dropdown-divider" />  
                        <li className="nav-item">
                        <a onClick={()=>{logOut()}}  className="dropdown-item dropdown-footer" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                            <i className="fas fa-sign-out-alt" /> ออกจากระบบ
                        </a>
                        </li>
                    </div>
                </li>
                </ul>
            </nav>
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
                    </div>
                </div>
                <div className="form-inline">

                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <Link to={'/student-page'} className="nav-link">
                                <i style={{color : 'white' , fontWeight : 'bold'}} className={'nav-icon fa fa-dashboard'}></i>
                                <p style={{color : 'white' , fontWeight : 'bold'}}>
                                    หน้าหลัก
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/student-page/report'} className="nav-link">
                                <i style={{color : 'white' , fontWeight : 'bold'}} className={'nav-icon fa fa-dashboard'}></i>
                                <p style={{color : 'white' , fontWeight : 'bold'}}>
                                    รายงาน
                                </p>
                            </Link>
                        </li>
                        {/* <li class="nav-item">
                            <Link to={'/student/quiz-from2'} class="nav-link">
                            <i style={{color : 'white' , fontWeight : 'bold'}} class={'nav-icon fa fa-file'}></i>
                            <p style={{color : 'white' , fontWeight : 'bold'}}>
                                แบบทดสอบที่ 2
                            </p>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to={'/student/quiz-from3'} class="nav-link">
                            <i style={{color : 'white' , fontWeight : 'bold'}} class={'nav-icon fa fa-file'}></i>
                            <p style={{color : 'white' , fontWeight : 'bold'}}>
                                แบบทดสอบที่ 3
                            </p>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to={'/student/quiz-from4'} class="nav-link">
                            <i style={{color : 'white' , fontWeight : 'bold'}} class={'nav-icon fa fa-file'}></i>
                            <p style={{color : 'white' , fontWeight : 'bold'}}>
                                แบบทดสอบที่ 4
                            </p>
                            </Link>
                        </li> */}
                    </ul>
                </nav>
                </div>
            </aside>
        </div>
    )
}
