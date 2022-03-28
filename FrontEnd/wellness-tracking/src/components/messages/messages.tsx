import { useState } from 'react';
import { TextField } from '@mui/material';
import './messages.scss';
import store from '../../store';

export function Messages() {
    const userDetails = store.getState().userDetails;

    return (
        <div className="messages-container">
            <div className="search-input-container">
                <TextField variant="outlined"  size="small" sx={{width:300}} label="Search" placeholder="Find professionals"></TextField>
            </div>
            <text style={{fontSize:"3rem"}}><br/><br/><br/><br/><br/>No New Message!</text>
        </div>
        
    )
}