import axios from '../axios';
import moment from 'moment';


export function setUserDetails(userDetails: any) {
    const obj = {
        value: userDetails,
        start: new Date().toLocaleTimeString()
    }
    localStorage.setItem('userDetails', JSON.stringify(obj));
}

export function getUserDetails(): any {
    const { value, start } = JSON.parse(localStorage.getItem('userDetails') || '{"value":"","start":""}');
    const end = moment(new Date().toLocaleTimeString(),'HH:mm:ss a');
    const duration = moment.duration(end.diff(moment(start, 'HH:mm:ss a')));

    // duration in hours
    const hours = (duration.asHours());
    if(!value || hours>=1 ) {
        return {};
    }
    console.log(hours);
    return value;
}

export const signUp = (user: any) => {
    return axios.post('/api/authnew/signup', user);
}

export const login = (username: string, password: string) => {
    return axios.post('/api/auth/login', { username, password });
}

export const forgot = (username: string) => axios.post('/api/authnew/forgot', {
    username
});