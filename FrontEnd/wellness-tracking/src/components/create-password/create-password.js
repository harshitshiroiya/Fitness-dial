import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './create-password.scss';
import axios from '../../axios';
import jwt_decode from "jwt-decode"

export function CreatePassword() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [new_pass, setPassword] = useState('');
    const [confirm_new_pass, setConfirmPassword] = useState('');

    console.log(searchParams.get('id'))

    const createPassword = async (e ) => {
        e.preventDefault();
        const token = (searchParams.get('token'));
        console.log(token);
        try {
            await axios.post(`api/authnew/createpass/${searchParams.get('id')}/${token}`, {
                new_pass,
                confirm_new_pass
            })
            navigate('/login/?activated=true')
        }
        catch {
            console.log('Create password failed')
        }
    }
    return (
        <div className="create-password-form">
            <form onSubmit={createPassword}>
                <div className="password-inputs">
                    <TextField variant="outlined" type="password" onChange={(e ) => setPassword(e.target.value)} className="text-input" label="Enter Password"></TextField>
                    <TextField variant="outlined" type="password" onChange={(e ) => setConfirmPassword(e.target.value)} className="text-input" label="Re-enter Password"></TextField>
                    <Button style={{ marginTop: "15px" }} size="small" type="submit" className="input-text" variant="contained">Create Password</Button>
                </div>
            </form>
        </div>
    )
}