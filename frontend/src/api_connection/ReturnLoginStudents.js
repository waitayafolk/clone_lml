import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

export const returnLogin = async () => {
    localStorage.removeItem('token-studebts');
    localStorage.removeItem('students');
    // navigate("/");
    // useNavigate("/");
    window.location.href = "/";
    // Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Token expired, please login again!',
    // })
    return
}