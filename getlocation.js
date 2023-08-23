 import { myLocation } from "./API_requests.js";


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
    console.log("latitude", latitude);


    myLocation(latitude, latitude).then(location => console.log("my location:", location));

  });

  }

// return myLocation;
 };


console.log("sdfsdfgrmgr:", showPosition().then(y => console.log(y)));





