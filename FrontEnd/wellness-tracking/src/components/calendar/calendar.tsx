import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)
export function MyCalendar() {
 return (
    <Calendar

        startAccessor="start"
        localizer={localizer}
        endAccessor="end"
        style={{ height: 500, padding:'20px' }}
        defaultDate={moment().toDate()}


    /> 
    )


}