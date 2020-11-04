import axios from 'axios';

const clienteAxios = axios.create({
    //baseURL:'http://127.0.0.1:8000/api/'
    baseURL:'http://165.227.87.27/api/'
});

export default clienteAxios;