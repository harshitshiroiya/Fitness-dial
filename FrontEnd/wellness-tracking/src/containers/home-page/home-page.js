import store from "../../store";
import { useState, useEffect } from 'react';
import { getUserDetails, setUserDetails } from "../../services/user.service"
import { CustomerLandingPage } from "../customer-landing-page/dashboard-landing-page";
import { ProfessionalLandingPage } from "../professional-landing-page/professional-landing-page";
export function Home() {
    const userDetails = store.getState().userDetails;



    return (
        <div className="home">
            {userDetails &&
                <CustomerLandingPage />}
        </div>
    )
}