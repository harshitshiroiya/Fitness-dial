import { Alert, Avatar, CircularProgress, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import './profile.scss';
import store from "../../store";
import { getProfileData, updateProfile } from "../../services/profile.service";

export function Profile() {

    const user = store.getState().userDetails;
    const [userDetails, setUserDetails] = useState();
    const [alert, setAlert] = useState({ type: 'success', msg: '' })
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const {data} = await getProfileData(user)
        setUserDetails(user.user_type==='Professional' ? data.professional_info: data.customer_info);
    }

    const submit = async ()=> {
        const req = {first_name, last_name,phone, age, address, city: state, state: country, weight, height};
        try {
            const {data} = await updateProfile(user, req);
            setAlert({type:'success',msg:'Details updated successfully'})
        }
        catch(e) {
            setAlert({type:'error',msg:e.message})
        }
        // setTimeout(()=>setAlert({msg:''}),3000);
        
    }

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [age, setAge] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();


    return (
        <div className="user-profile-container">
            {/* <Navbar></Navbar> */}
            
            {userDetails ? <div className="user-profile-form">
            {alert.msg && <Alert onClose={()=>setAlert({msg:''})} severity={alert.type}>{alert.msg}</Alert>}
                <Avatar sx={{ width: 75, height: 75 }}></Avatar>
                <p>Update Photo</p>
                <div className="text-inputs">
                    <div className="row">
                        <TextField disabled className="input-field" label="First Name" size="medium" variant='outlined' placeholder='First Name' value={user.first_name}></TextField>
                        <TextField disabled className="input-field" label="Last Name" size="medium" variant='outlined' placeholder='Last Name' value={user.last_name}></TextField>
                    </div>
                    <div className="row">
                        <TextField disabled className="input-field" label="Email" size="medium" variant="outlined" placeholder="Email" value={userDetails.email}></TextField>
                        <TextField className="input-field" label="Phone" size="medium" variant="outlined" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={userDetails.updateProfilephone}></TextField>
                    </div>
                    <div className="row">
                        <TextField className="input-field" label="Age" size="medium" variant="outlined" placeholder="Age" onChange={(e) => setAge(e.target.value)} value={userDetails.age}></TextField>
                        <TextField className="input-field" label="Address" size="medium" variant="outlined" placeholder="Address" onChange={(e) => setAddress(e.target.value)} value={userDetails.address}></TextField>
                    </div>
                    <div className="row">
                        <TextField className="input-field" label="State" size="medium" variant="outlined" placeholder="State" onChange={(e) => setState(e.target.value)} value={userDetails.city}></TextField>
                        <TextField className="input-field" label="Country" size="medium" variant="outlined" placeholder="Country" onChange={(e) => setCountry(e.target.value)} value={userDetails.state}></TextField>
                    </div>
                    <div className="row">
                        <TextField className="input-field" label="Weight" size="medium" variant="outlined" placeholder="Weight (in Kg)" onChange={(e) => setWeight(e.target.value)} value={userDetails.weight}></TextField>
                        <TextField className="input-field" label="Height" size="medium" variant="outlined" placeholder="Height (in cm)" onChange={(e) => setHeight(e.target.value)} value={userDetails.height}></TextField>
                    </div>
                    <Button variant="contained" size="large" onClick={()=>submit()}>
                        Save
                    </Button>
                </div>
            </div>: <CircularProgress/>}

        </div>
    )
}