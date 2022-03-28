import { Avatar, TextField } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';
import { getUserDetails, setUserDetails } from "../../services/user.service";
import './profile.scss';

export function Profile() {

    setUserDetails({
        first_name: 'Sai Kiran',
        last_name: 'Jella',
        email: 'jsaikiran19@gmail.com',
        user_type: 'Customer',
        phone: '8123698251',
        birthdate: '01/01/1999',
        address: '800 N Smith Rd',
        city: 'Bloomington',
        state: 'Indiana',
        weight: '60 Kg',
        height: '170 cm'
    })



    const userDetails = getUserDetails();
    const [first_name, setFirstName] = useState(userDetails.first_name);
    const [last_name, setLastName] = useState(userDetails.last_name);
    const [email, setEmail] = useState(userDetails.email);
    const [phone, setPhone] = useState(userDetails.phone);
    const [birthdate, setBirthdate] = useState(userDetails.birthdate);
    const [address, setAddress] = useState(userDetails.address);
    const [city, setCity] = useState(userDetails.city);
    const [state, setState] = useState(userDetails.state);
    const [weight, setWeight] = useState(userDetails.weight);
    const [height, setHeight] = useState(userDetails.height);

    return (
        <div className="user-profile-container">
            {/* <Navbar></Navbar> */}
            {userDetails && <div className="user-profile-form">
                <Avatar sx={{ width: 75, height: 75 }}></Avatar>
                <p>Update Photo</p>
                <div className="text-inputs">
                    <div className="row">
                        <TextField className="input-field" label="First Name" size="medium" variant='outlined' placeholder='First Name' onChange={(e:any)=>setFirstName(e.target.value)} value={first_name}></TextField>
                        <TextField className="input-field" label="Last Name" size="medium" variant='outlined' placeholder='Last Name' onChange={(e:any)=>setLastName(e.target.value)} value={last_name}></TextField>
                    </div>
                    <div className="row">
                        <TextField className="input-field" label="Email" size="medium" variant="outlined" placeholder="Email" onChange={(e:any)=>setEmail(e.target.value)} value={email}></TextField>
                        <TextField className="input-field" label="Phone" size="medium" variant="outlined" placeholder="Phone" onChange={(e:any)=>setPhone(e.target.value)} value={phone}></TextField>
                    </div>
                    <div className="row">
                        <TextField className="input-field" label="Birthdate" size="medium" variant="outlined" placeholder="Birthdate" onChange={(e:any)=>setBirthdate(e.target.value)} value={birthdate}></TextField>
                        <TextField className="input-field" label="Address" size="medium" variant="outlined" placeholder="Address" onChange={(e:any)=>setAddress(e.target.value)} value={address}></TextField>
                    </div>
                    <div className="row">
                        <TextField className="input-field" label="City" size="medium" variant="outlined" placeholder="City" onChange={(e:any)=>setCity(e.target.value)} value={city}></TextField>
                        <TextField className="input-field" label="State" size="medium" variant="outlined" placeholder="State" onChange={(e:any)=>setState(e.target.value)} value={state}></TextField>
                    </div>
                    <div className="row">
                        <TextField className="input-field" label="Weight" size="medium" variant="outlined" placeholder="Weight (in Kg)" onChange={(e:any)=>setWeight(e.target.value)} value={weight}></TextField>
                        <TextField className="input-field" label="Height" size="medium" variant="outlined" placeholder="Height (in cm)" onChange={(e:any)=>setHeight(e.target.value)} value={height}></TextField>
                    </div>
                    <Button variant="contained" color="success" size="large">
                        Save
                    </Button>
                </div>
            </div>}

        </div>
    )
}