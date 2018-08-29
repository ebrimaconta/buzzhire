import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import data from './data/data.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
 
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class App extends Component {
  constructor(props) {
        super(props)
   this.state= {      data:[]     }
 
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }
componentDidMount() {
    // fetch data and update state
    this.setState({ data: data}) 
 }
render(){
   
            console.log(data);
    return (
            <BigCalendar
                culture='en'
                  events={ [
                    {
                      'title': 'All Day Event very long title',
                      'bgColor': 'red',
                      'allDay': true,
                      'start': new Date(2018, 7, 8),
                      'end': new Date(2018,9 , 11)
                    } ]}
                defaultDate={new Date()}/>
    );
}
}

export default App;
