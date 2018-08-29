 export default fetch("https://assessments.bzzhr.net/calendar/?format=json")
   .then(function(response) {
    return response.json();
  })
  .then(data => {
    // you can access your data 
     
    let events  = data;
     return events.map((event) =>{
        var obj = {
        	title: event.label,
        	start:  new Date(2018, 7, 8),
        	end : new Date(2018,9 , 11)
        }
        	return obj;	
    });
      

})

  
