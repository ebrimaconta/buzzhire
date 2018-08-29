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
 eventStyleGetter(event, start, end, isSelected) {
    
    var backgroundColor = "#FF69B4";
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    };
     
    return {
        style: style
    };
}
render(){
   console.log(this.state.data);
             
    return (
            <BigCalendar
                culture='en'
                  events={ [
                    {
                      'title': 'All Day Event very long title',
                      'bgColor': 'FF69B4',
                      'allDay': true,
                      'start': new Date(2018, 7, 8),
                      'end': new Date(2018,9 , 11)
                    },{
                      'title': 'All Day Event very long title',
                      'bgColor': 'FF69B4',
                      'allDay': true,
                      'start': new Date(2018, 6, 8),
                      'end': new Date(2018,6 , 11)
                    }  ]}
                    eventPropGetter={(this.eventStyleGetter)}
                defaultDate={new Date()}/>
    );
}
}

export default App;
