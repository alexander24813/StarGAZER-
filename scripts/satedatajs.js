
const satname = document.getElementById('satname');
const satnameh = document.getElementById('iss');
const noradId = document.getElementById('norad-id');
const tle = document.getElementById('tle');
const satlatitude = document.getElementById('satlatitude');
const satlongitude = document.getElementById('satlongitude');
const azimuth = document.getElementById('azimuth');
const elevation = document.getElementById('elevation');
const rightAscension = document.getElementById('right-ascension');
const declination = document.getElementById('declination');
const nextPassDate = document.getElementById('next-pass-date');
const time1 = document.getElementById('time-1');
const startAz1 = document.getElementById('startaz-1');
const startAzCompass1 = document.getElementById('startazcompass-1');
const time2 = document.getElementById('time-2');
const maxAz = document.getElementById('maxaz');
const maxAzCompass = document.getElementById('maxazcompass');
const time3 = document.getElementById('time-3');
const endAz = document.getElementById('endaz');
const startAzCompass2 = document.getElementById('startazcompass-2');
const maxElevation = document.getElementById('maxelevation');
const rightAscension2 = document.getElementById('right-ascension-2');
const magnitude = document.getElementById('magnitude');
const nextPassFinalDate = document.getElementById('next-pass-final-date');


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
window.onload = function() {
  
    // Extract the NORAD parameter from the URL
    var urlParams = new URLSearchParams(window.location.search);
     NORAD = urlParams.get('norad');
    
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
                            const elevation = data.results[0].elevation; 
                          
                  // The elevation in meters
                            console.log(`latitute : ${latitude}  |  longitute : ${longitude}  |  Elevation: ${elevation} meters`);
                          })
                          .catch(error => {
                            console.error('There was an error fetching elevation data:', error);
                          });

                      // Display the coordinates
                      

                      const apiKey = 'DEAK6F-2VZQT3-8WUAGJ-5FCS';  // Replace with your N2YO API key
                    
                      const altitude = 0;  // Ground level
                      const pe = parseFloat(elevation, 10);
                      const urlv = `https://cors-anywhere.herokuapp.com/https://api.n2yo.com/rest/v1/satellite/visualpasses/${id}/${latitude}/${longitude}/${pe}/10/300&apiKey=${apiKey}`;
                      const urlp = `https://cors-anywhere.herokuapp.com/https://api.n2yo.com/rest/v1/satellite/positions/${id}/${latitude}/${longitude}/${pe}/1/&apiKey=${apiKey}`;
                      
                      setTimeout(()=>{
                      fetch(urlp)
                        .then(response => response.json())
                        .then(data => {
                          console.log(data);
                          console.log( data.positions[0].satlatitude);
                              if(data.info){
                            satname.textContent = data.info.satname  || "N/A";
                            satnameh.textContent = data.info.satname  || "N/A";
                            noradId.textContent = data.info.satid  || "N/A";
                            tle.textContent = data.info.tle  || "N/A";
                          }if (data.positions){
                            satlatitude.textContent = data.positions[0].satlatitude  || "N/A" ;
                            satlongitude.textContent =data.positions[0].satlongitude || "N/A" ;
                            azimuth.textContent = data.positions[0].azimuth  || "N/A";
                            elevation.textContent = data.positions[0].elevation || "N/A"  ;
                            rightAscension.textContent = data.positions[0].ra || "N/A";
                            declination.textContent = data.positions[1].dec  || "N/A";}
                           
                          
                    
                          
                        })
                        .catch(error => {
                          console.error('There was a problem with the fetch operation:', error);
                        });
                        fetch(urlv)
                        .then(response => response.json())
                        .then(data => {
                          console.log(data);
                          
                          
                            
                            if(data.passes && data.passes.length > 0){
                            nextPassDate.textContent = utcdate(data.passes[0].maxUTC)  || "N/A";
                            time1.textContent = utctime(data.passes[0].startUTC)  || "N/A" ;
                            startAz1.textContent = data.passes[0].startAz || "N/A";
                            startAzCompass1.textContent = data.passes[0].startAzCompass || "N/A" ;
                            time2.textContent = utctime(data.passes[0].maxUTC)  || "N/A" ;
                            maxAz.textContent = data.passes[0].maxAz  || "N/A" ;
                            maxAzCompass.textContent = data.passes[0].maxAzCompass || "N/A" ;
                            time3.textContent = utctime(data.passes[0].endUTC) || "N/A" ;
                            endAz.textContent = data.passes[0].endAz   || "N/A";
                            startAzCompass2.textContent = data.passes[0].endAzCompass || "N/A" ;
                            maxElevation.textContent = data.passes[0].startAzCompass  || "N/A";
                            
                            magnitude.textContent = data.passes[0].mag || "N/A" ;
                            nextPassFinalDate.textContent = utcdate(data.passes[0].maxUTC)|| "N/A" ;}
                          
                    
                          
                        })
                        .catch(error => {
                          console.error('There was a problem with the fetch operation:', error);
                        });
                      },3000)
                    
                      });
                  } else {
                    alert("Geolocation is not supported by this browser.");
                  }

                } else {
                  // If no NORAD parameter is found in the URL
                  alert("ERROR");
              }
              
          }