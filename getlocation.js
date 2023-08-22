 
if (navigator.geolocation) {
  try {
    navigator.geolocation.getCurrentPosition(showPosition);
  } catch (error) {
    console.error("Error getting location:", error.message);
  }
} else {
  console.log("Geolocation is not available in this browser.");
}

export async function showPosition() {
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
   
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log("longitude: ", longitude);

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=79e9565b6d45f0a48a3ff121a711792c`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Weather Data:", data.name);
    // Your code to use data.name goes here
  })
  .catch((error) => {
    console.log("Error fetching weather data:", error);
  });

  });



// console.log("Your location: " + latitude + ", " + longitude);
  }
 

  // console.log("latitude + longitude:", latitude, longitude);

 
}


console.log("sdfsdfgrmgr:", showPosition().then(y => console.log(y)));
