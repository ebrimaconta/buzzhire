 export default fetch("https://assessments.bzzhr.net/calendar/?format=json")
   .then(function(response) {
    return response.json();
  })
  .then(data => {
    // you can access your data 
     
    let events  = data;
     return events.map((event) =>{
     	 


     	const start = event.start.substr(0, 10).split('-') ;
     	const end = event.end.substr(0, 10).split('-');
        let obj = {
        	title: event.label,
        	start:  new Date(Number(start[0]), Number(start[1]), Number(start[2])),
        	end:  new Date(Number(end[0]), Number(end[1]), Number(end[2])),
        	 
        }
        return obj.start;	
    });
      

})

  
