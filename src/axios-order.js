import axios from 'axios';

const instance = axios.create({

    baseURL: 'https://react-my-burger-884f9.firebaseio.com/'
});

export default instance;