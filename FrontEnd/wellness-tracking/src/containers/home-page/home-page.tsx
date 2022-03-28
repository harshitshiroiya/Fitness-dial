import store from "../../store";
import { useState, useEffect } from 'react';
import { getUserDetails, setUserDetails } from "../../services/user.service"
import { CustomerLandingPage } from "../customer-landing-page/customer-landing-page";
import { ProfessionalLandingPage } from "../professional-landing-page/professional-landing-page";
export function Home() {
    const userDetails = store.getState().userDetails;



    return (
        <div className="home">
            {userDetails &&
                ((userDetails.user_type === 'Customer' && <CustomerLandingPage />) ||
                    (userDetails.user_type === 'Professional' && <ProfessionalLandingPage />))}
        </div>
    )
}