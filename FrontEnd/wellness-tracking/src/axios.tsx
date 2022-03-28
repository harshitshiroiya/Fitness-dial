import axios from 'axios';
const instance = axios.create({baseURL: 'https://fitness-dial-dot-vk-services-prod.el.r.appspot.com/',headers:{"Content-Type":"application/json"}});
// instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instance