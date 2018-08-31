import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
 
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class App extends Component {
  constructor(props) {
   super(props)

   let date = new Date();
   let Year =  date.getFullYear();  
   let Month =  date.getMonth();  
   let LastDayMonth = new Date(Year , Month + 2, 0);
   let LastYear =  LastDayMonth.getFullYear();  
   let LastMonth =  LastDayMonth.getMonth(); 
   let LastDay = LastDayMonth.getDate(); 
   console.log("https://assessments.bzzhr.net/calendar/?before="+LastYear+"-0"+LastMonth+"-"+LastDay+"T00%3A00%3A00&format=json&since=2018-0"+(Month+1)+"-01T00%3A00%3A00");
    this.state = {
      data: [],
      date : "https://assessments.bzzhr.net/calendar/?before="+LastYear+"-0"+LastMonth+"-"+LastDay+"T00%3A00%3A00&format=json&since=2018-0"+(Month+1)+"-01T00%3A00%3A00"
    }
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }
  componentDidUpdate(){
    
  }
  componentDidMount() {
    fetch(this.state.date)
   .then(response => response.json())
   .then(data => {
     let events =   data.results.map((event) =>{
      const colors = {
        "red":"#DC143C",
        "cyan":"#00FFFF",
        "blue":"#87CEFA",
        "pink":"#FF69B4",
        "grey":"#808080",
        "green":"#008000"
     }
       const start = event.start.substr(0, 10).split('-') ;
       const end = event.end.substr(0, 10).split('-');
        let obj = {
          title: event.label,
          start:  new Date(Number(start[0]), Number(start[1]-1), Number(start[2])),
          end:  new Date(Number(end[0]), Number(end[1]-1 ), Number(end[2])),
          color: colors[event.category]
        }
       return obj;
     })
     this.setState({data:events});
    })
   }

  eventStyleGetter(event, start, end, isSelected) {
    var style = {
        backgroundColor: event.color,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    };
    return {style: style};
  }
 render(){   
    return (
            <BigCalendar
              culture='en'
              events={this.state.data}
              eventPropGetter={(this.eventStyleGetter)}
              defaultDate={new Date()}
              onView={(view) => {
               if(view === "month"){

               }else{

               }
              }}
              /> )
     }
}

export default App;
