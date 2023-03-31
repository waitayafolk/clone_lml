import axios from "axios";
import {httpClient} from '../base_config';

export const usersInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const headersUserAccessToken = () => ({
    Authorization: `${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
});

export const getMembers = async () => {
  const data = await usersInstance
    .get(`/members  `, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getBanks = async () => {
  const data = await usersInstance
    .get(`/banks  `, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const addMember = async (value) => {
  const data = await usersInstance
    .post(`/members/save-members  `, value,  {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const uploadFileImage = async (formData) => {
  const data = await usersInstance
    .post(`/upload`, formData ,{
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};