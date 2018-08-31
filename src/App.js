import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
 
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class App extends Component {
  constructor(props) {
   super(props)
    this.state = {
    data: [],
    date : ""
    }
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }
  componentDidUpdate(prevProps, prevState){
    console.log(prevState,prevState )
     const that = this;
     let thirty = 30;
     var next = document.getElementById("next");
      next.addEventListener("click", ()=>{
      thirty +=30;
      let nextClicked = that.ChangeDate(thirty);
      that.setState({date:nextClicked});
      }, false);
      var back = document.getElementById("previous");
      back.addEventListener("click", ()=>{
      thirty -=30;
      let nextClicked = that.ChangeDate(thirty);
      that.setState({date:nextClicked});
      that.DataCall();
     }, false);
      
  }
  componentDidMount() {
     this.DataCall();
    }
  componentWillMount() {
     let firstString = this.ChangeDate(0);
      
     this.setState({date:firstString});
    }
    ChangeDate(NumberDate){
        let date = new Date();
        date.setDate(date.getDate() +  NumberDate);
        let Year =   date.getFullYear();  
        let Month =   date.getMonth();  
        let LastDayMonth = new Date( Year ,  Month + 2, 0);
        let LastYear =   LastDayMonth.getFullYear();  
        let LastMonth =   LastDayMonth.getMonth() > 9 ?  LastDayMonth.getMonth() :  
        LastDayMonth.getMonth()  === 0 ? LastDayMonth.getMonth() +1 :"0"+ LastDayMonth.getMonth(); 
        let LastDay =  LastDayMonth.getDate(); 
        let WebMonth = Month  > 9 ?  Month : Month === 0 ? Month +1 :"0"+ Month; 
        let string= "https://assessments.bzzhr.net/calendar/?before="+LastYear+"-"+ LastMonth+"-"+ (LastDay-1)+"T00%3A00%3A00&format=json&since=2018-"+ WebMonth+"-01T00%3A00%3A00";
         return string;
        
    }
  DataCall(){
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
     this.setState({
      data:events});
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
