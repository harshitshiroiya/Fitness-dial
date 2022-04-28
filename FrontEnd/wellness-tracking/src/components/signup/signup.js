import { Button, Radio, TextField, Alert, AlertColor } from "@mui/material";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import './signup.scss';
import { signUp } from "../../services/user.service";
import { createUser } from "../messages/chat-app/chat-engine";

export function Signup() {
    const [user_type, setUserType] = useState('Customer');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');
    const [emailVerificationMsg, setEmailVerificationMsg] = useState({msg:'',status:''});
    const navigate = useNavigate();
    const registerUser = async (e ) => {
        e.preventDefault()
        const user = {
            first_name,
            last_name,
            email,
            phone_number,
            user_type
        }
        try {
            await signUp(user);
            createUser({...user, username:first_name, secret: email.split('@')[0]+"@"+first_name, custom_json:JSON.stringify(user) })
            setEmailVerificationMsg({msg:'An email has been sent to you. Please verify your email.', status:'success'});
        }
        catch (e ) {
            setEmailVerificationMsg({msg:e.response.data.message, status:'error'});
        }

    }

    return (
        <div className="signup-container">
            <div className="signup-form">
                {emailVerificationMsg.msg &&
                    <Alert style={{ width: "50%", margin: "auto" }} severity={emailVerificationMsg.status}>{emailVerificationMsg.msg}</Alert>
                }
                {!emailVerificationMsg.msg && <form onSubmit={registerUser}>
                    <div className="signup-inputs">
                        <div className="heading">Sign up here</div>
                        <TextField required size="small" id="first_name_signup" onChange={(e ) => setFirstName(e.target.value)} className="text-input" variant="outlined" label="First Name"></TextField>
                        <TextField size="small" id="last_name_signup" onChange={(e ) => setLastName(e.target.value)} className="text-input" variant="outlined" label="Last Name"></TextField>
                        <TextField required size="small" type="email" id="email_signup" onChange={(e ) => setEmail(e.target.value)} className="text-input" variant="outlined" label="Email"></TextField>
                        <PhoneInput containerStyle={{ margin: "1em" }} onChange={e => setPhone(e)}></PhoneInput>
                        {/* <TextField size="small" id="phone_number_signup" onChange={e=>setPhone(e.target.value)} type="number" className="text-input" variant="outlined" label="Phone"></TextField> */}
                        <p>Please choose the option that describes you the best:</p>
                        <div className="roles">
                            <label htmlFor="customer">Customer</label>
                            <Radio
                                checked={user_type === 'Customer'}
                                onChange={() => setUserType('Customer')}
                                value="Customer"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            <label htmlFor="professional">Professional</label>
                            <Radio
                                checked={user_type === 'Professional'}
                                onChange={() => setUserType('Professional')}
                                value="Professional"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                        </div>
                        <p style={{ textDecoration: "underline" }} onClick={() => navigate('/login')}>Already have an account? Login.</p>
                        <Button style={{ marginTop: "15px" }} size="small" type="submit" className="input-text" variant="contained">Sign Up</Button>
                    </div>

                </form>}
            </div>
        </div>

    )
}