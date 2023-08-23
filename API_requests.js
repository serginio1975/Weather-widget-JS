export async function getData(city) {
    try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},ua&appid=79e9565b6d45f0a48a3ff121a711792c`
        );
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
      const data = await response.json();
      return data;
    } catch (error) {
      let test = false; 
      console.log('test=', test);
      console.log("Error:", error.message);
      throw error;
      // return test;
  }
}

export async function myLocation(latitude, longitude) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=79e9565b6d45f0a48a3ff121a711792c`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Weather Data:", data.name); // done
     return data.name;
    // Your code to use data.name goes here
    
  })
  .catch((error) => {
    console.log("Error fetching weather data:", error);
  });
}


 console.log("myLocation in API_request:" , await myLocation( 49.9444087, 36.2906715));


// https://api.openweathermap.org/data/2.5/weather?lat=36.2906715&lon=49.9444087&appid=79e9565b6d45f0a48a3ff121a711792c








