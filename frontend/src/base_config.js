// const { default: Swal } = require("sweetalert2");
import axios from "axios";
export const httpClient =  async() => axios.create({
  baseURL: 'https://some-domain.com/api/',
  headers: {
    // if (localStorage.getItem('token') != null) {
      
    // }
    Authorization: `${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }
});

// module.exports = {
//   httpClient,
//   // httpClient, 
// };
