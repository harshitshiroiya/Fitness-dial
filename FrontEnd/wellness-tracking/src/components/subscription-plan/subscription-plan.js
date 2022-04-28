import { Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { categories } from '../../models/filters';
import { getPlans } from "../../services/user.service";
import store from "../../store";
import { Alert, CircularProgress } from '@mui/material';
import './subcription-plans.scss';
// import {} from "@mui"
import { updateProfile } from "../../services/profile.service";
export function SubscriptionPlans() {

    useEffect(()=>{
        getSubscriptions()
    },[])


    const [noPlans, setnoPlans] = useState();

    const [plans, setPlans] = useState();
    const [loading, setLoading] = useState(true);
    const [customer_info, setCustomerInfo] = useState();

    const user = store.getState().userDetails;

    const getSubscriptions = async ()=> {
        const {data} = await getPlans(user._id);
        const set = new Set();
        console.log(data);
        setCustomerInfo(data.customer_info);
        data.customer_info.plans_enrolled?.forEach(plan=> {
            set.add(plan.name);
        });
        setPlans(set);
        console.log(set);
        setnoPlans(!data.customer_info.plans_enrolled.length);
        setLoading(false);
    }

    const subscribePlan = async (cat)=> {
        setLoading(cat);
        const req = {plans_enrolled:[{name:cat}]}
        const res = await updateProfile(user,req);
        console.log(res);
        getSubscriptions();
    }
    return (
        <div className="subscriptions-container">
        {noPlans && <Alert style={{marginBottom:'3em'}} severity="info">You are not enrolled in any plans.</Alert>}
        <div className="subscription-plans">
            {categories.slice(1,).map(cat=> {
                return (<div className="category-plan">
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt={cat}
                        />
                        <CardContent>
                            <div className="plan-name">
                                {cat}
                            </div>
                            
                        </CardContent>
                        <CardActions style={{display:'flex', justifyContent:'center'}}>
                           { loading!==cat ? (plans && (plans.has(cat) ? <Button size="small" variant="contained" color="success"></Button> :  <Button size="small" onClick={()=>subscribePlan(cat)}>Subcribe</Button>)): <CircularProgress/> }
                        </CardActions>
                    </Card>
                </div>)
            })}
        </div>
        </div>
    )
}