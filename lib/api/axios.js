import baseUrl from '@/components/services/baseUrl';
import axios from 'axios';

const instance = axios.create({
  baseURL: `${baseUrl}/api`, // Set the base URL for your backend
});

export default instance;
