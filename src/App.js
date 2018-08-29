import React, { Component } from 'react';
import logo from './logo.svg';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class App extends Component {
  constructor(props) {
        super(props)
    
    
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
}

render(){
    return (
            <BigCalendar
                culture='en'
                  events={ [
  {
    'title': 'All Day Event very long title',
    'bgColor': '#ff7f50',
    'allDay': true,
    'start': new Date(2018, 7, 8),
    'end': new Date(2018, 8, 11)
  } ]}
                defaultDate={new Date()}/>
    );
}
}

export default App;
