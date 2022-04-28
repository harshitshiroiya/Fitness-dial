import axios from '../axios';


export const getClients = (id)=> axios.get(`/api/professional/dashboard//customerEnrolled/${id}`);

export const uploadFile = (id,file)=> { axios.post(`/api/professional/dashboard/${id}/upload`,file,{headers:{"Content-Type": "multipart/form-data"}})}