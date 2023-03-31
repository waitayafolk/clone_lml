import axios from "axios";
import {returnLogin} from './ReturnLogin';

export const usersInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const headersUserAccessToken = () => ({
    Authorization: `${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
});

export const deleteAdminchoose = async (id) => {
  const data = await usersInstance
    .delete(`/admins/${id}`, {
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

export const getAdmins = async () => {
  const data = await usersInstance
    .get(`/admins`, {
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

export const saveSetting = async (value) => {
  const data = await usersInstance
    .post(`/admins/save-setting`, value,  {
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

export const addAdmin = async (value) => {
  const data = await usersInstance
    .post(`/admins/save-admin`, value,  {
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

export const loadCompany = async () => {
  const data = await usersInstance
    .get(`/admins/company`,  {
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