import axios from '../axios';
import moment from 'moment';


export function setUserDetails(userDetails ) {
    const obj = {
        value: userDetails,
        start: new Date().toLocaleTimeString()
    }
    localStorage.setItem('userDetails', JSON.stringify(obj));
}

export function getUserDetails()  {
    const { value, start } = JSON.parse(localStorage.getItem('userDetails') || '{"value":"","start":""}');
    const end = moment(new Date().toLocaleTimeString(),'HH:mm:ss a');
    const duration = moment.duration(end.diff(moment(start, 'HH:mm:ss a')));

    // duration in hours
    const hours = (duration.asHours());
    if(!value || (0 >hours || hours >1) ) {
        localStorage.setItem('userDetails','');
        return {};
    }
    console.log(hours);
    return value;
}

export const signUp = (user ) => {
    return axios.post('/api/authnew/signup', user);
}

export const login = (username , password ) => {
    return axios.post('/api/auth/login', { username, password });
}

export const forgot = (username ) => axios.post('/api/authnew/forgot', {
    email:username
});

export const getAllProfessionals = ()=> axios.get('/api/professional/dashboard/')

export const getPlans = (id)=> axios.get(`/api/customer/dashboard/plans/${id}`)