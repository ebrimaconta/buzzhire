import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
 
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class App extends Component {
  constructor(props) {
   super(props)
   let date = new Date();
   this.state= {
    data:[],
    date:"https://assessments.bzzhr.net/calendar/?before=2018-08-31T00%3A00%3A00&format=json&since=2018-08-08T00%3A00%3A00"
   }
 
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }
  componentDidUpdate(){
    var userSelection = document.getElementsByClassName("rbc-btn-group")[0];
     const months ={
       'January': 1, 
       'February':2, 
       'March':3, 
       'April':4, 
       'May':5, 
       'June':6, 
       'July':7, 
       'August':8, 
       'September':9, 
       'October':10, 
       'November':11, 
       'December':12
     } 
     const that=this;
     let string=""
  for(var i = 0; i < userSelection.children.length; i++) {
     userSelection.children[i].addEventListener("click", function(e) {
      if(e.target.innerHTML==="next") {
      var id = document.getElementsByClassName("rbc-toolbar-label");
      var splitTime =id[0].textContent.split(' ');
      let monthsFetch =months[splitTime[0]] +1;
      let monthOperator = (monthsFetch > 9  ? monthsFetch : "0"+ monthsFetch);
      let string += "https://assessments.bzzhr.net/calendar/?before="+splitTime[1]+"-"+ monthOperator+"-30T00%3A00%3A00&format=json&since="+splitTime[1]+"-"+monthOperator+"-01T00%3A00%3A00";
      
      console.log(that.state.date);
      } 

     })
     fetch(this.state.date)
   .then(response => response.json())
   .then(data => {
    // you can access your data 
      
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
    });
     
    this.setState({ data: events});
     // this.setState({ data: "events"});
   
  } that.setState({ date: string});
  }
componentDidMount() {
    // fetch data and update state
     
    
// })

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
