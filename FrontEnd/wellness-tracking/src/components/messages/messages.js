import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { getChats } from 'react-chat-engine';
import './messages.scss';
import store from '../../store';
import { ChatApp } from './chat-app/chat-app';


export function Messages() {
    const userDetails = store.getState().userDetails;
    useEffect(()=>{
        getChats();
    })
    return (
        <div className="messages-container">
            
            <div className="messages-body">
                { userDetails && <ChatApp/>}
            </div>
        </div>
        
    )
}