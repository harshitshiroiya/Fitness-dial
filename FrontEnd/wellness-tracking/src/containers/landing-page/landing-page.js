import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from "../../components/login/login";
import logo from '../../assets/fitness-dial-logo.png';
import icon1 from '../../assets/running-man.png';
import { CreatePassword } from '../../components/create-password/create-password';
import { Signup } from '../../components/signup/signup';
import './landing-page.scss';

export function LandingPage() {
    return (
        <div className="wellness-tracking-landing-page">
            <div className="landing-page-container">
                <div className="landing-page-header">

                    <div className="logo-container">
                        <img src={logo} alt="logo" height="150" width="200" />
                    </div>   

                </div>
                <div className="landing-page-body">
                    <div className="landing-page-left-pane">
                    <img src={icon1} alt="icon1" height="600" width="550" className="icon11" />
                    </div>
                    <div className="landing-page-right-pane">
                        <Routes>
                            <Route path='/' element={<Navigate to="/login"></Navigate>}>
                            </Route>
                            <Route path='/login' element={<Login></Login>}></Route>
                            <Route path='/register' element={<Signup></Signup>}></Route>
                            <Route path='/createPass/' element={<CreatePassword></CreatePassword>}></Route>
                        </Routes>
                    </div>
                </div>

            </div>
        </div>
    )
}