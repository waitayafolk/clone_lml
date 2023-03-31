import axios from "axios";
import {returnLogin} from './ReturnLogin';

export const usersInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const headersUserAccessToken = () => ({
    Authorization: `${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
});

export const getStudents = async () => {
  const data = await usersInstance
    .get(`/students`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        returnLogin()
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};

export const sendStudentsTestCode = async (value) => {
  const data = await usersInstance
    .post(`/students/send-test-code`, value,  {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        returnLogin()
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
}

export const getPointStudents = async () => {
  const data = await usersInstance
    .post(`/students/student-point`, [],  {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        returnLogin()
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};

export const addStudents = async (value) => {
  const data = await usersInstance
    .post(`/students/add-student`, value,  {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        returnLogin()
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};

export const sendStudents = async (value) => {
  const data = await usersInstance
    .post(`/students/add-student-excel`, value,  {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        returnLogin()
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};