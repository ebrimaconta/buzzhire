import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
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
    fetch("https://assessments.bzzhr.net/calendar/?format=json")
   .then(function(response) {
    return response.json();
  })
  .then(data => {
    // you can access your data 
     
    let events = data.map((event) =>{
      const start = event.start.substr(0, 10).split('-') ;
      const end = event.end.substr(0, 10).split('-');
        let obj = {
          title: event.label,
          start:  new Date(Number(start[0]), Number(start[1]), Number(start[2])),
          end:  new Date(Number(end[0]), Number(end[1]), Number(end[2])),
           
        }
          return obj;
    });
      this.setState({ data: events});

})
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
     console.log(event.title);
    return {
        style: style
    };
}
render(){
 
             
    return (
            <BigCalendar
                culture='en'
                  events={ this.state.data}
                    eventPropGetter={(this.eventStyleGetter)}
                defaultDate={new Date()}/>
    );
}
}

export default App;
