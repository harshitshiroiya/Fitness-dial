import './customer-landing-page.scss';

import 'react-pro-sidebar/dist/css/styles.css';
import { Button, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/styles';
import { Box } from '@mui/system';
import DownloadIcon from '@mui/icons-material/Download';

import { Search } from '../../components/search/search';
import { MyCalendar } from '../../components/calendar/calendar';
import { DashboardContent } from '../../components/dashboard-content/dashboard-content';
const StyledTab = styled(Tab)({
    minHeight: "auto"
});
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (

                <div>{children}</div>

            )}
        </div>
    );
}

export function CustomerLandingPage(props: any) {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [value, setValue] = useState(0);
    const tabs = [{ name: 'My Content', icon: <FormatListBulletedIcon />, component: <DashboardContent /> },
    { name: 'Search', icon: <SearchIcon />, component: <Search /> },
    { name: 'My Calendar', icon: <CalendarMonthIcon />, component: <MyCalendar /> }]
    return (
        <div className="customer-landing-page">
            <div className="customer-landing-header">
                <Button style={{marginRight:'2em'}} size="small" startIcon={<DownloadIcon/>} variant="text">My meal plans</Button>
                <Box sx={{ borderBottom: 1, borderColor: 'lightgrey' }}>
                    <Tabs style={{ minHeight: '35px' }} onChange={handleChange} value={value}>
                        {tabs.map(tab => <StyledTab key={tab.name} style={{ textTransform: 'capitalize' }} label={tab.name} icon={tab.icon} iconPosition="start"></StyledTab>)}
                    </Tabs>
                </Box>
            </div>

            {
                tabs.map((tab, i) => <TabPanel index={i} key={i} value={value}>{tab.component}</TabPanel>)
            }

        </div>
    )
}