import axios from 'axios';

import { CHAT_CONFIG } from '../../../models/chat-config';

export const createUser = (user) => {

    axios.post('https://api.chatengine.io/users/', user
        ,
        {
            headers: {
                'PRIVATE-KEY': CHAT_CONFIG.private_key
            }
        }
    )
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getUsers = () => {
    return axios.get('https://api.chatengine.io/users/', {
        headers: {
            'PRIVATE-KEY': CHAT_CONFIG.private_key
        }
    })
} 