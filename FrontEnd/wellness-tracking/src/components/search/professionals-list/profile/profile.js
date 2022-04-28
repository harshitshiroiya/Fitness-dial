import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { Button, CircularProgress, Rating } from '@mui/material';
import './profile.scss';
import store from '../../../../store';
import { getProfileData, updateProfile } from '../../../../services/profile.service';
export function Profile({ id, info }) {
    const [details, setDetails] = useState();
    const [color, setColor] = useState("primary");
    const user = store.getState().userDetails;
    useEffect(() => {
        getData();
    }, [])
    const [rating, setRating] = useState(+localStorage.getItem(`rating_${id}`));
    const subscribeProf = async () => {
        console.log(info)
        const plans_enrolled = [...info.customer_info.professionals_enrolled]
        plans_enrolled.push(id);

        // customer_info.customer_enrolled.push(user);

        const { data } = await updateProfile(user, { professionals_enrolled: plans_enrolled });
        setColor("success");
        console.log(data);

    }

    const getData = async () => {
        const { data } = await getProfileData({ _id: id, user_type: user.user_type === 'Professional' ? 'Customer' : 'Professional' });
        setDetails(user.user_type === 'Professional' ? data.customer_info : data.professional_info)
        setColor(info.customer_info.professionals_enrolled.includes(id) ? "success" : "primary")
    }

    return (
        <div className="professional-profile">

            {details ? <div className="profile-container">
                <div className="avatar">
                    <Avatar style={{ width: 100, height: 100, margin: '2em' }} alt={details.name?.toUpperCase()}></Avatar>

                    <div className='name-info'>
                        <div className='profile-name'>{details.name}</div>
                    </div>
                </div>


                <div className="profile-info" style={{ fontSize: '16px' }}>
                    {user.user_type === 'Customer' && <><div className="category prop"><strong>Category</strong>: {details.professional_type}</div>
                        <div className="description prop"><strong>Description</strong>: {details.description}</div></>}
                    <div className="age prop"><strong>Age</strong>: {details.age}</div>
                    <div className="gender prop"><strong>Gender</strong>: {details.gender}</div>
                    <div className="email prop"><strong>Email</strong>: {details.email}</div>
                    {user.user_type==='Customer' && <div className="phone prop"><strong>Phone</strong>: {details.number}</div>}
                    <div className="address prop"><strong>Address</strong>: {details.address}</div>
                    {user.user_type === 'Customer' && <Button variant="contained" color={color} onClick={() => subscribeProf()}>{color === 'primary' ? 'Subscribe' : 'Subscribed'}</Button>}
                    {user.user_type === 'Customer' && <><div className='rating' style={{ paddingTop: '20px' }}>Rate your professional</div>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                                localStorage.setItem(`rating_${id}`, newValue);
                            }}
                        />
                    </>
                    }
                </div>
            </div> : <CircularProgress style={{ margin: 'auto' }} />}

        </div>
    )
}