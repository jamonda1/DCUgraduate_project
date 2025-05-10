import axios from 'axios';

// ✅ 여기에 실제 맥북 IP주소 입력
const instance = axios.create({
  baseURL: 'http://10.0.2.2:8080',  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
