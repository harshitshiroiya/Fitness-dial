import axios from '../axios';
export const getProfileData = (user) => {
    return user.user_type === 'Professional' ? axios.get(`/api/professional/dashboard/${user._id}`) : axios.get(`/api/customer/dashboard/${user._id}`);
}

export const updateProfile = (user, req) => {
    return user.user_type === 'Professional' ? axios.post(`/api/professional/dashboard/update/${user._id}`, req) : axios.post(`/api/customer/dashboard/update/${user._id}`, req);
}