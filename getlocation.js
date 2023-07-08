
// When 
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Геолокація не підтримується вашим браузером.");
  }
  
  export function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=79e9565b6d45f0a48a3ff121a711792c`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('cityInput.value ==', createObject.city);
      })
      .catch((error) => {
        console.log("Помилка при отриманні погодових даних:", error);
      });
  
    console.log("Ваша геолокація: " + latitude + ", " + longitude);
  }
  