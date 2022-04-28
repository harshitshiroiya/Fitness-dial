import React from "react";
import "./navbar.scss";
import { useState } from "react";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/fitness-dial-logo.png';
import store from '../../store';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

function Navbar(props ) {
    const [tabIndex, setTabIndex] = useState({ tab: 0, child: 0 });
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const tabs = props.tabs;
    const navigate = useNavigate();

    const subMenuClick = (child , i , j ) => {
        setTabIndex({ tab: i, child: j });
        if (child.route === '/logout') {
            localStorage.removeItem('userDetails');
            navigate('/login');
            store.dispatch({type:'SET_USER',userDetails:{}})
        }
        else {
            navigate(child.route);
        }
            
    }

    return (
        <ProSidebar onToggle={(e) => console.log(e)}>
            <Menu iconShape="square">
                <SidebarHeader>
                    <div className="logo-container">
                        <img src={logo} alt="logo" height="150" width="200" />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    {tabs.map((tab , i ) => {
                        return !tab.children ? (<MenuItem key={tab.name} onClick={() => { setTabIndex({ tab: i, child: 0 }); navigate(tab.route); setSubMenuOpen(false) }} className={`navbar-item` + (i === tabIndex.tab ? ` --selected` : '')}>{tab.name}</MenuItem>) :
                            (<SubMenu open={subMenuOpen} title={tab.name} onClick={() => setSubMenuOpen(!subMenuOpen)}>
                                {tab.children.map((child , j ) => <MenuItem key={child.name} onClick={() => { subMenuClick(child, i, j) }} className={`navbar-item` + (i === tabIndex.tab && j === tabIndex.child ? ` --selected` : '')}>{child.name}</MenuItem>)}
                            </SubMenu>)
                    })}

                </SidebarContent>
                <SidebarFooter>
                    <div className="footer-buttons">
                        <Button variant="text">Help</Button>
                    </div>
                </SidebarFooter>
            </Menu>
        </ProSidebar>
    );
}

export default Navbar;