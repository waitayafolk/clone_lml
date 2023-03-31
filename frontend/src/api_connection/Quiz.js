import axios from "axios";
import {httpClient} from '../base_config';

export const usersInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const headersUserAccessToken = () => ({
    Authorization: `${localStorage.getItem('token-studebts')}`,
    'Content-Type': 'application/json',
});

const headersUserAccessTokenUser = () => ({
  Authorization: `${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export const getStrong10Point = async () => {
  const data = await usersInstance
    .get(`/quiz/quiz-strong-point`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = "/login";
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};

export const saveQuizDetail10 = async (val) => {
  const data = await usersInstance
    .post(`/quiz/save-quiz-detail10`, val ,{
      headers: {
        ...headersUserAccessTokenUser(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = "/login";
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};

export const saveQuizDetail = async (val) => {
  const data = await usersInstance
    .post(`/quiz/save-quiz-detail`, val ,{
      headers: {
        ...headersUserAccessTokenUser(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = "/login";
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};

export const loadQuizDetail = async (id) => {
  const data = await usersInstance
    .get(`/quiz/quiz-group-detail/${id}`, {
      headers: {
        ...headersUserAccessTokenUser(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = "/login";
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};

export const loadQuizGroup = async () => {
  const data = await usersInstance
    .get(`/quiz/quiz-group`, {
      headers: {
        ...headersUserAccessTokenUser(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = "/login";
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};

export const loadQuizGroup10 = async () => {
  const data = await usersInstance
    .get(`/quiz/quiz-group10`, {
      headers: {
        ...headersUserAccessTokenUser(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = "/login";
      }else{
        console.log(error);
        return  error.response?.data ?? error;
      }
    });
  return data;
};

export const getQuiz1 = async () => {
    const data = await usersInstance
      .get(`/quiz/quiz1`, {
        headers: {
          ...headersUserAccessToken(),
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if(error.response.status === 401){
            localStorage.removeItem('token-studebts');
            localStorage.removeItem('students');
            window.location.href = "/student-login";
        }else{
            console.log(error);
            return  error.response?.data ?? error;
        }
      });
    return data;
};

export const getQuiz2 = async () => {
    const data = await usersInstance
      .get(`/quiz/quiz2`, {
        headers: {
          ...headersUserAccessToken(),
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if(error.response.status === 401){
            localStorage.removeItem('token-studebts');
            localStorage.removeItem('students');
            window.location.href = "/student-login";
        }else{
            console.log(error);
            return  error.response?.data ?? error;
        }
      });
    return data;
};

export const getQuiz3 = async () => {
    const data = await usersInstance
      .get(`/quiz/quiz3`, {
        headers: {
          ...headersUserAccessToken(),
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if(error.response.status === 401){
            localStorage.removeItem('token-studebts');
            localStorage.removeItem('students');
            window.location.href = "/student-login";
        }else{
            console.log(error);
            return  error.response?.data ?? error;
        }
      });
    return data;
};

export const getQuiz4 = async () => {
  const data = await usersInstance
    .get(`/quiz/quiz4`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
          localStorage.removeItem('token-studebts');
          localStorage.removeItem('students');
          window.location.href = "/student-login";
      }else{
          console.log(error);
          return  error.response?.data ?? error;
      }
    });
  return data;
};

export const sendAnswer = async (val) => {
  const data = await usersInstance
    .post(`/quiz/send_answer`, val ,{
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
          localStorage.removeItem('token-studebts');
          localStorage.removeItem('students');
          window.location.href = "/student-login";
      }else{
          console.log(error);
          return  error.response?.data ?? error;
      }
    });
  return data;
};

export const sendAnswer2 = async (val) => {
  const data = await usersInstance
    .post(`/quiz/send_answer_2`, val ,{
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
          localStorage.removeItem('token-studebts');
          localStorage.removeItem('students');
          window.location.href = "/student-login";
      }else{
          console.log(error);
          return  error.response?.data ?? error;
      }
    });
  return data;
};

export const sendAnswer3 = async (val) => {
  const data = await usersInstance
    .post(`/quiz/send_answer_3`, val ,{
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
          localStorage.removeItem('token-studebts');
          localStorage.removeItem('students');
          window.location.href = "/student-login";
      }else{
          console.log(error);
          return  error.response?.data ?? error;
      }
    });
  return data;
};

export const sendAnswer4 = async (val) => {
  const data = await usersInstance
    .post(`/quiz/send_answer_4`, val ,{
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
          localStorage.removeItem('token-studebts');
          localStorage.removeItem('students');
          window.location.href = "/student-login";
      }else{
          console.log(error);
          return  error.response?.data ?? error;
      }
    });
  return data;
};

export const getList = async (val) => {
  const data = await usersInstance
    .get(`/quiz/list`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if(error.response.status === 401){
          localStorage.removeItem('token-studebts');
          localStorage.removeItem('students');
          window.location.href = "/student-login";
      }else{
          console.log(error);
          return  error.response?.data ?? error;
      }
    });
  return data;
};

export const countScore = async (val) => {
  let total_score = 0 
  let artistic_point = 0
  let A_i_like = 0
  let A_i_am = 0
  let A_i_can = 0
  let investigative_point = 0
  let I_i_am = 0
  let I_i_can = 0
  let I_i_like = 0
  let realistic_point = 0
  let R_i_am = 0
  let R_i_can = 0
  let R_i_like = 0
  let enterprising_point = 0
  let E_i_am = 0
  let E_i_can = 0
  let E_i_like = 0
  let social_point = 0
  let S_i_am = 0
  let S_i_can = 0
  let S_i_like = 0
  let conventional_point = 0
  let C_i_am = 0
  let C_i_can = 0
  let C_i_like = 0

  for(let index of val){
    if(index.type == "Realistic"){
      if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
        realistic_point += 1
        total_score += 1
        index.point = 1
      }else if(index.answer == "ไม่เห็นด้วย"){
        realistic_point += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่แน่ใจ"){
        realistic_point += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "เห็นด้วย"){
        realistic_point += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "เห็นด้วยอย่างมาก"){
        realistic_point += 5
        total_score += 5
        index.point = 5
      }else{
        realistic_point += 0
        total_score += 0
        index.point = 0
      }
      if(index.type_detail == "i_like"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          R_i_like += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          R_i_like += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          R_i_like += 3
        }else if(index.answer == "เห็นด้วย"){
          R_i_like += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          R_i_like += 5
        }else{
          R_i_like += 0
        }
      }
      if(index.type_detail == "i_can"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          R_i_can += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          R_i_can += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          R_i_can += 3
        }else if(index.answer == "เห็นด้วย"){
          R_i_can += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          R_i_can += 5
        }else{
          R_i_can += 0
        }
      }
      if(index.type_detail == "i_am"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          R_i_am += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          R_i_am += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          R_i_am += 3
        }else if(index.answer == "เห็นด้วย"){
          R_i_am += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          R_i_am += 5
        }else{
          R_i_am += 0
        }
      }
    }else if(index.type == "Artistic"){
      if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
        artistic_point += 1
        total_score += 1
        index.point = 1
      }else if(index.answer == "ไม่เห็นด้วย"){
        artistic_point += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่แน่ใจ"){
        artistic_point += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "เห็นด้วย"){
        artistic_point += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "เห็นด้วยอย่างมาก"){
        artistic_point += 5
        total_score += 5
        index.point = 5
      }else{
        artistic_point += 0
        total_score += 0
        index.point = 0
      }
      if(index.type_detail == "i_like"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          A_i_like += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          A_i_like += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          A_i_like += 3
        }else if(index.answer == "เห็นด้วย"){
          A_i_like += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          A_i_like += 5
        }else{
          A_i_like += 0
        }
      }
      if(index.type_detail == "i_can"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          A_i_can += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          A_i_can += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          A_i_can += 3
        }else if(index.answer == "เห็นด้วย"){
          A_i_can += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          A_i_can += 5
        }else{
          A_i_can += 0
        }
      }
      if(index.type_detail == "i_am"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          A_i_am += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          A_i_am += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          A_i_am += 3
        }else if(index.answer == "เห็นด้วย"){
          A_i_am += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          A_i_am += 5
        }else{
          A_i_am += 0
        }
      }
    }else if(index.type == "Investigative"){
      if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
        investigative_point += 1
        total_score += 1
        index.point = 1
      }else if(index.answer == "ไม่เห็นด้วย"){
        investigative_point += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่แน่ใจ"){
        investigative_point += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "เห็นด้วย"){
        investigative_point += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "เห็นด้วยอย่างมาก"){
        investigative_point += 5
        total_score += 5
        index.point = 5
      }else{
        investigative_point += 0
        total_score += 0
        index.point = 0
      }
      if(index.type_detail == "i_like"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          I_i_like += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          I_i_like += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          I_i_like += 3
        }else if(index.answer == "เห็นด้วย"){
          I_i_like += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          I_i_like += 5
        }else{
          I_i_like += 0
        }
      }
      if(index.type_detail == "i_can"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          I_i_can += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          I_i_can += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          I_i_can += 3
        }else if(index.answer == "เห็นด้วย"){
          I_i_can += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          I_i_can += 5
        }else{
          I_i_can += 0
        }
      }
      if(index.type_detail == "i_am"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          I_i_am += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          I_i_am += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          I_i_am += 3
        }else if(index.answer == "เห็นด้วย"){
          I_i_am += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          I_i_am += 5
        }else{
          I_i_am += 0
        }
      }
    }else if(index.type == "Enterprising"){
      if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
        enterprising_point += 1
        total_score += 1
        index.point = 1
      }else if(index.answer == "ไม่เห็นด้วย"){
        enterprising_point += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่แน่ใจ"){
        enterprising_point += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "เห็นด้วย"){
        enterprising_point += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "เห็นด้วยอย่างมาก"){
        enterprising_point += 5
        total_score += 5
        index.point = 5
      }else{
        enterprising_point += 0
        total_score += 0
        index.point = 0
      }
      if(index.type_detail == "i_like"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          E_i_like += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          E_i_like += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          E_i_like += 3
        }else if(index.answer == "เห็นด้วย"){
          E_i_like += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          E_i_like += 5
        }else{
          E_i_like += 0
        }
      }
      if(index.type_detail == "i_can"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          E_i_can += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          E_i_can += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          E_i_can += 3
        }else if(index.answer == "เห็นด้วย"){
          E_i_can += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          E_i_can += 5
        }else{
          E_i_can += 0
        }
      }
      if(index.type_detail == "i_am"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          E_i_am += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          E_i_am += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          E_i_am += 3
        }else if(index.answer == "เห็นด้วย"){
          E_i_am += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          E_i_am += 5
        }else{
          E_i_am += 0
        }
      }
    }else if(index.type == "Social"){
      if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
        social_point += 1
        total_score += 1
        index.point = 1
      }else if(index.answer == "ไม่เห็นด้วย"){
        social_point += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่แน่ใจ"){
        social_point += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "เห็นด้วย"){
        social_point += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "เห็นด้วยอย่างมาก"){
        social_point += 5
        total_score += 5
        index.point = 5
      }else{
        social_point += 0
        total_score += 0
        index.point = 0
      }
      if(index.type_detail == "i_like"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          S_i_like += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          S_i_like += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          S_i_like += 3
        }else if(index.answer == "เห็นด้วย"){
          S_i_like += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          S_i_like += 5
        }else{
          S_i_like += 0
        }
      }
      if(index.type_detail == "i_can"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          S_i_can += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          S_i_can += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          S_i_can += 3
        }else if(index.answer == "เห็นด้วย"){
          S_i_can += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          S_i_can += 5
        }else{
          S_i_can += 0
        }
      }
      if(index.type_detail == "i_am"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          S_i_am += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          S_i_am += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          S_i_am += 3
        }else if(index.answer == "เห็นด้วย"){
          S_i_am += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          S_i_am += 5
        }else{
          S_i_am += 0
        }
      }
    }else if(index.type == "Conventional"){
      if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
        conventional_point += 1
        total_score += 1
        index.point = 1
      }else if(index.answer == "ไม่เห็นด้วย"){
        conventional_point += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่แน่ใจ"){
        conventional_point += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "เห็นด้วย"){
        conventional_point += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "เห็นด้วยอย่างมาก"){
        conventional_point += 5
        total_score += 5
        index.point = 5
      }else{
        conventional_point += 0
        total_score += 0
        index.point = 0
      }
      if(index.type_detail == "i_like"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          C_i_like += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          C_i_like += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          C_i_like += 3
        }else if(index.answer == "เห็นด้วย"){
          C_i_like += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          C_i_like += 5
        }else{
          C_i_like += 0
        }
      }
      if(index.type_detail == "i_can"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          C_i_can += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          C_i_can += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          C_i_can += 3
        }else if(index.answer == "เห็นด้วย"){
          C_i_can += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          C_i_can += 5
        }else{
          C_i_can += 0
        }
      }
      if(index.type_detail == "i_am"){
        if(index.answer == "ไม่เห็นด้วยอย่างมาก"){
          C_i_am += 1
        }else if(index.answer == "ไม่เห็นด้วย"){
          C_i_am += 2
        }else if(index.answer == "ไม่แน่ใจ"){
          C_i_am += 3
        }else if(index.answer == "เห็นด้วย"){
          C_i_am += 4
        }else if(index.answer == "เห็นด้วยอย่างมาก"){
          C_i_am += 5
        }else{
          C_i_am += 0
        }
      }
    }else{
      total_score += 0 
      artistic_point += 0
      A_i_like += 0
      A_i_am += 0
      A_i_can += 0
      investigative_point += 0
      I_i_am += 0
      I_i_can += 0
      I_i_like += 0
      realistic_point += 0
      R_i_am += 0
      R_i_can += 0
      R_i_like += 0
      enterprising_point += 0
      E_i_am += 0
      E_i_can += 0
      E_i_like += 0
      social_point += 0
      S_i_am += 0
      S_i_can += 0
      S_i_like += 0
      conventional_point += 0
      C_i_am += 0
      C_i_can += 0
      C_i_like += 0
    }
    
  }
  let valScore ={
    total_score : total_score ,
    artistic_point : artistic_point,
    A_i_like : A_i_like,
    A_i_am : A_i_am,
    A_i_can : A_i_can,
    investigative_point : investigative_point,
    I_i_am : I_i_am,
    I_i_can : I_i_can,
    I_i_like : I_i_like,
    realistic_point : realistic_point,
    R_i_am : R_i_am,
    R_i_can : R_i_can,
    R_i_like : R_i_like,
    enterprising_point : enterprising_point,
    E_i_am : E_i_am,
    E_i_can : E_i_can,
    E_i_like : E_i_like,
    social_point : social_point,
    S_i_am : S_i_am,
    S_i_can : S_i_can,
    S_i_like : S_i_like,
    conventional_point : conventional_point,
    C_i_am : C_i_am,
    C_i_can : C_i_can,
    C_i_like : C_i_like,
  }

  return valScore 
}

export const countScore2 = async (val) => {
  let total_score = 0 
  let achievement = 0
  let independence = 0
  let recognition = 0
  let relationships = 0
  let support = 0
  let working_conditions = 0
  for(let index of val){
    if(index.type == "Achievement"){
      if(index.answer == "สำคัญมากที่สุด"){
        achievement += 5
        total_score += 5
        index.point = 5
      }else if(index.answer == "สำคัญมาก"){
        achievement += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "สำคัญปานกลาง"){
        achievement += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "สำคัญน้อย"){
        achievement += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่สำคัญเลย"){
        achievement += 1
        total_score += 1
        index.point = 1
      }else{
        index.point = 0
        total_score += 0
        achievement += 0
      }
    }else if(index.type == "Independence"){
      if(index.answer == "สำคัญมากที่สุด"){
        independence += 5
        total_score += 5
        index.point = 5
      }else if(index.answer == "สำคัญมาก"){
        independence += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "สำคัญปานกลาง"){
        independence += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "สำคัญน้อย"){
        independence += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่สำคัญเลย"){
        independence += 1
        total_score += 1
        index.point = 1
      }else{
        index.point = 0
        total_score += 0
        independence += 0
      }
    }else if(index.type == "Recognition"){
      if(index.answer == "สำคัญมากที่สุด"){
        recognition += 5
        total_score += 5
        index.point = 5
      }else if(index.answer == "สำคัญมาก"){
        recognition += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "สำคัญปานกลาง"){
        recognition += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "สำคัญน้อย"){
        recognition += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่สำคัญเลย"){
        recognition += 1
        total_score += 1
        index.point = 1
      }else{
        recognition += 0
        total_score += 0
        index.point = 0
      }
    }else if(index.type == "Relationships"){
      if(index.answer == "สำคัญมากที่สุด"){
        relationships += 5
        total_score += 5
        index.point = 5
      }else if(index.answer == "สำคัญมาก"){
        relationships += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "สำคัญปานกลาง"){
        relationships += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "สำคัญน้อย"){
        relationships += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่สำคัญเลย"){
        relationships += 1
        total_score += 1
        index.point = 1
      }else{
        relationships += 0
        total_score += 0
        index.point = 0
      }
    }else if(index.type == "Support"){
      if(index.answer == "สำคัญมากที่สุด"){
        support += 5
        total_score += 5
        index.point = 5
      }else if(index.answer == "สำคัญมาก"){
        support += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "สำคัญปานกลาง"){
        support += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "สำคัญน้อย"){
        support += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่สำคัญเลย"){
        support += 1
        total_score += 1
        index.point = 1
      }else{
        support += 0
        total_score += 0
        index.point = 0
      }
    }else if(index.type == "Working Conditions"){
      if(index.answer == "สำคัญมากที่สุด"){
        working_conditions += 5
        total_score += 5
        index.point = 5
      }else if(index.answer == "สำคัญมาก"){
        working_conditions += 4
        total_score += 4
        index.point = 4
      }else if(index.answer == "สำคัญปานกลาง"){
        working_conditions += 3
        total_score += 3
        index.point = 3
      }else if(index.answer == "สำคัญน้อย"){
        working_conditions += 2
        total_score += 2
        index.point = 2
      }else if(index.answer == "ไม่สำคัญเลย"){
        working_conditions += 1
        total_score += 1
        index.point = 1
      }else{
        working_conditions += 0
        total_score += 0
        index.point = 0
      }
    }
  }

  let valScore ={
    total_score : total_score , 
    achievement : (achievement * 3 ) / 6  ,
    independence : (independence * 2 ) / 6 ,
    recognition : (recognition * 2 ) / 6 ,
    relationships : (relationships * 2 ) / 6 ,
    support : (support * 2 ) / 6 ,
    working_conditions : working_conditions / 6 ,
  }

  return valScore
}

export const countScore4 = async (val) => {
  let total_score = 0 
  let presence = 0
  let competing = 0
  let relating = 0
  let achieving = 0
  let future_thinker = 0
  let discoverer = 0
  let caring = 0
  let confidence = 0
  let dependability = 0
  let organizer = 0
  
  for(let index of val){
    if(index.type == "Presence"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        presence += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        presence += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        presence += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        presence += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        presence += 1
        index.point = 1
      }else{
        total_score += 0
        presence += 0
        index.point = 0
      }
    }else if(index.type == "Competing"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        competing += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        competing += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        competing += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        competing += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        competing += 1
        index.point = 1
      }else{
        total_score += 0
        competing += 0
        index.point = 0
      }
    }else if(index.type == "Relating"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        relating += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        relating += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        relating += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        relating += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        relating += 1
        index.point = 1
      }else{
        total_score += 0
        relating += 0
        index.point = 0
      }
    }else if(index.type == "Achieving"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        achieving += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        achieving += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        achieving += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        achieving += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        achieving += 1
        index.point = 1
      }else{
        total_score += 0
        achieving += 0
        index.point = 0
      }
    }else if(index.type == "Future Thinker"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        future_thinker += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        future_thinker += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        future_thinker += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        future_thinker += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        future_thinker += 1
        index.point = 1
      }else{
        total_score += 0
        future_thinker += 0
        index.point = 0
      }
    }else if(index.type == "Discoverer"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        discoverer += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        discoverer += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        discoverer += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        discoverer += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        discoverer += 1
        index.point = 1
      }else{
        total_score += 0
        discoverer += 0
        index.point = 0
      }
    }else if(index.type == "Caring"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        caring += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        caring += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        caring += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        caring += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        caring += 1
        index.point = 1
      }else{
        total_score += 0
        caring += 0
        index.point = 0
      }
    }else if(index.type == "Confidence"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        confidence += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        confidence += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        confidence += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        confidence += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        confidence += 1
        index.point = 1
      }else{
        total_score += 0
        confidence += 0
        index.point = 0
      }
    }else if(index.type == "Dependability"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        dependability += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        dependability += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        dependability += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        dependability += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        dependability += 1
        index.point = 1
      }else{
        total_score += 0
        dependability += 0
        index.point = 0
      }
    }else if(index.type == "Organizer"){
      if(index.answer == "เป็นประจำ หรือ เกือบเป็นประจำ"){
        total_score += 5
        organizer += 5
        index.point = 5
      }else if(index.answer == "บ่อยครั้ง"){
        total_score += 4
        organizer += 4
        index.point = 4
      }else if(index.answer == "มีบ้างเป็นบางครั้ง"){
        total_score += 3
        organizer += 3
        index.point = 3
      }else if(index.answer == "แทบไม่เคย หรือ ไม่เคยเลย"){
        total_score += 2
        organizer += 2
        index.point = 2
      }else if(index.answer == "คำถามนี้ไม่มีความเกี่ยวข้องกับฉันเลย"){
        total_score += 1
        organizer += 1
        index.point = 1
      }else{
        total_score += 0
        organizer += 0
        index.point = 0
      }
    }
  }
  
  let valScore ={
    total_score : total_score , 
    presence : presence / 40 ,
    competing : competing / 28 ,
    relating : relating / 28 ,
    achieving : achieving / 28 ,
    future_thinker : future_thinker / 32 ,
    discoverer : discoverer / 36 ,
    caring : caring / 32 ,
    confidence : confidence / 36 ,
    dependability : dependability / 24 ,
    organizer : organizer / 28 ,
  }

  return valScore
}