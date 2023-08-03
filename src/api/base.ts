import axios from 'axios';

const baseApi = axios.create();

baseApi.defaults.baseURL = 'https://www.googleapis.com/books/v1';

export default baseApi;
