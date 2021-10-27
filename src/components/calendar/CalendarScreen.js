import React,{useState} from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import {useDispatch,useSelector} from 'react-redux'

import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, SetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    
const dispatch = useDispatch();
const {events,activeEvent} = useSelector( state => state.caledar );



const [lastView,setLasView] = useState(localStorage.getItem('lastView') || 'month')

 const onDoubleClick = (e)=>{
    console.log(e);
    dispatch(uiOpenModal);
 }

 const onSelectEvent = (e)=>{
   dispatch(SetActive(e))

 }

 const onViewChange = (e)=>{
    setLasView(e);
    localStorage.setItem('lastView',e);
 }

 const onSelectSlot=(e)=>{

    dispatch(eventClearActiveEvent());
 }

 const eventStyleGetter = (event,start,end,isSelected)=>{
      
    
        const style={
            backgroundColor:'#367CF7',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white'
        }
        return {style}
    }
    return(
            <>
            <Navbar/>
                <div>
                    <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, minWidth: 200 }}
                    messages={messages}
                    eventPropGetter={eventStyleGetter}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelectEvent}
                    onView={onViewChange}
                    view={lastView}
                    components={{
                        event:CalendarEvent
                    }}
                    onSelectSlot={onSelectSlot}
                    selectable={true}


                    />
                    <AddNewFab/>
                    {
                        activeEvent && (<DeleteEventFab/>)
                    }
                    
                    

                    <CalendarModal/>             
                </div>
            </>
   )     
}
