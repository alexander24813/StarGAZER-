/*International Space Station (ISS): 25544Regularly visible to the naked eye, the ISS is one of the brightest man-made objects in the sky.

BlueWalker 3:  53807 Launched in 2022, this telecommunications satellite has become one of the brightest objects in the night sky, at times outshining 99% of visible stars. 
NATURE.COM

Hubble Space Telescope: 20580Occasionally visible, the HST can appear as a bright moving point of light.

Envisat:27386 A large Earth observation satellite that can be quite bright under favorable conditions.

Lacrosse 5:28646  A reconnaissance satellite known for its brightness during certain passes.

Terra:25994 An Earth observation satellite that can be visible during favorable passes.*/



const satarray  =[53807,20580,27386,28646,25994,25544];
    

function utctime(utcEpochTime) {
  

    // Create a Date object from the epoch time
    const date = new Date(utcEpochTime*1000);
    
    // Convert to human-readable time in +5:30 (IST)
    const humanReadableTime = date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second:"2-digit",
      hour12: false, // 24-hour format  // Long time format (e.g., "3:30:00 PM GMT+5:30")
    });
    
    return humanReadableTime;
    
    
    }
    
    
    function utcdate(utcEpochTime) {
      
    
      // Create a Date object from the epoch time
      const date = new Date(utcEpochTime*1000);
      
      // Convert to human-readable time in +5:30 (IST)
      const humanReadableDate = date.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric", // Full year (e.g., "2023")
      month: "long",   // Full month name (e.g., "October")
      day: "numeric", // 24-hour format  // Long time format (e.g., "3:30:00 PM GMT+5:30")
      });
      
      return humanReadableDate;
      
      
      }
    
    
    var NORAD;
    
      
        // Extract the NORAD parameter from the URL
       // var urlParams = new URLSearchPa//
       NORAD=25544;
        
        if (NORAD) {
            // Display the NORAD ID
            
            
        
                      const id = parseInt(NORAD,10);
                      console.log(typeof(id))
                      console.log(isNaN(id))
    
    
                      if ("geolocation" in navigator) {
                        // Get the user's current position
                        navigator.geolocation.getCurrentPosition(function(position) {
                          // Get latitude and longitude
                          const latitude = position.coords.latitude;
                          const longitude = position.coords.longitude;
                          const elevationUrl = `https://api.open-elevation.com/api/v1/lookup?locations=${latitude},${longitude}`;
                          
    
                            fetch(elevationUrl)
                              .then(response => response.json())
                              .then(data => {
                                const elevationv = data.results[0].elevation; 
                              
                      // The elevation in meters
                                console.log(`latitute : ${latitude}  |  longitute : ${longitude}  |  Elevation: ${elevationv} meters`);
                             
    
                          // Display the coordinates
                          
    
                          const apiKey = 'DEAK6F-2VZQT3-8WUAGJ-5FCS';  // Replace with your N2YO API key
                          var row = '';
                          const altitude = 0;  // Ground level
                          const pe = parseFloat(elevationv, 10);
                          const urlv = `https://cors-anywhere.herokuapp.com/https://api.n2yo.com/rest/v1/satellite/visualpasses/${id}/${latitude}/${longitude}/${pe}/10/300&apiKey=${apiKey}`;
                          const urlp = `https://cors-anywhere.herokuapp.com/https://api.n2yo.com/rest/v1/satellite/positions/${id}/${latitude}/${longitude}/${pe}/1/&apiKey=${apiKey}`;
                          
                          for (var x=0; x<satarray.length;x++){
                            const urlv = `https://cors-anywhere.herokuapp.com/https://api.n2yo.com/rest/v1/satellite/visualpasses/${satarray[x]}/${latitude}/${longitude}/${pe}/10/300&apiKey=${apiKey}`;
                          fetch(urlv)
                            .then(response => response.json())
                            .then(data => {
                              console.log(data);
                              console.log(data.passes.length);

                               setTimeout(() => {
                                buildTable(data.passes)
                               }, 100);
                              
                                 
                                function buildTable(dataar){
                                    var table = document.getElementById('dtatabl')
                                    
                                     var visibility;
                                    for (var i = 0; i < (dataar).length; i++){
                                        if (dataar[i].maxEl>40  && dataar[i].mag<1.0 ){
                                                visibility= `<span style="color: green;">Good</span>`;
                                                
                                        } else if(dataar[i].maxEl>20 && dataar[i].mag<4.0){
                                                visibility= `<span style="color: orange;">Average</span>`;
                                        }else{
                                            visibility= `<span style="color: red;">Poor</span>`;

                                        }
                                        
                                        
                                        row += `<tr>
                                                        <td>${data.info.satname}</td>
                                                        <td>${utcdate(dataar[i].maxUTC)}</td>
                                                        <td>${utctime(dataar[i].startUTC)}</td>
                                                        <td>${dataar[i].startAzCompass}</td>
                                                        <td>${utctime(dataar[i].startUTC)}</td>
                                                        <td>${dataar[i].endAzCompass}</td>
                                                        <td>${visibility}</td>

                                                        
                                                </tr>`;
                                        
                                                
                                                               
                                                                    }
                                                                    table.innerHTML += row
                                                                }
                             
                              
                                                                
                              
                            })
                            .catch(error => {
                              console.error('There was a problem with the fetch operation:', error);
                            });}
                            
                        });
                    })
                    .catch(error => {
                        console.error('There was an error fetching elevation data:', error);
                      });
                      } else {
                        alert("Geolocation is not supported by this browser.");
                      }
    
                    } else {
                      // If no NORAD parameter is found in the URL
                      alert("ERROR");
                  }
                  
              