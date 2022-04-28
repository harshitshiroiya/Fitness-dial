import store from '../../../store';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react'
import { getAllProfessionals } from '../../../services/user.service';

import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import './chat-engine.scss';
import { CHAT_CONFIG } from '../../../models/chat-config';

export const ChatApp = () => {
    const user = store.getState().userDetails;
    const [professionals, setProfessionals] = useState([]);
    const name = user.first_name;
    const secret = user.email.split('@')[0] + "@" + user.first_name
    useEffect(() => {
        getProfessionals();
    }, [])

    function createDirectChat(creds) {
        const username = document.getElementById('searchForChat')
        getOrCreateChat(
            creds,
            { is_direct_chat: true, usernames: [username.value] },
            () => username.value = ''
        )
    }

    async function getProfessionals() {
        const {data} = await getAllProfessionals();
        setProfessionals(data);
    }


    function renderChatForm(creds) {
        return (
            <div>
                {professionals.length && <div className="chat-search">
                    <Stack spacing={2} sx={{ width: 300 }}>
                        <Autocomplete onChange={(e) => console.log(e.target.value)}
                            id="searchForChat"
                            freeSolo
                            options={professionals.map((option) => option.professional_info?.name?.split(" ")[0] || "")}
                            renderInput={(params) => {
                                return <TextField size="small" {...params} label="Search" />
                            }}
                        />
                    </Stack>
                    <AddCircleIcon style={{ margin: '1em' }} onClick={() => createDirectChat(creds)} color="primary" />
                </div>}
            </div>
        )
    }

    return (
        <ChatEngine
            publicKey={CHAT_CONFIG.project_id}
            userName={name}
            userSecret={secret}
            renderChatSettings={() => <></>}
            renderNewChatForm={(creds) => user.user_type === 'Customer' && professionals.length && renderChatForm(creds)}
        />
    )
}

