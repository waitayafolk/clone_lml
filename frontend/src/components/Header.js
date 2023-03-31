import React from 'react'
import swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export default function Header() {
  const logOut = async() => {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = "/";
      }
    })
  }
  
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-dark" style={{backgroundColor : '#ffb74d' , borderColor : '#ffb74d'}}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
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
                {/* <Link to="/app/profile" className="dropdown-item dropdown-footer">
                  <i className="fas fa fa-user" /> Profile
                </Link> */}
              <div className="dropdown-divider" />  
                <li className="nav-item">
                  <a onClick={()=>{logOut()}} className="dropdown-item dropdown-footer" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                    <i className="fas fa-sign-out-alt" /> ออกจากระบบ
                  </a>
                </li>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}
