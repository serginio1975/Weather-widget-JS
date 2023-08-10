async function getDate(city) {
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
export default getDate;




// data.name = true



