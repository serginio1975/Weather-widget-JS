// API ?
// fetch methods 
// async
// rest method "GET"
// http & https

// import { showPosition } from "./getlocation.js";
// console.log("showPosition", showPosition());


const buttonGetWeather = document.getElementById("controler-submit");
const widgets = document.getElementById("container-widgets");
const cityInput = document.getElementById("city-input");
const dataSelect = document.getElementById("date-input");
const checkboxSelect = document.getElementById("checkbox-input");
const selectCityList = document.getElementById("search-list-city");

cityInput.addEventListener("input", searchCity);
selectCityList.addEventListener("click", getSelectListCity);
dataSelect.addEventListener("change", selectDate);
checkboxSelect.addEventListener("change", selectCheckbox);
buttonGetWeather.addEventListener("click", handleSubmit);


let requestLocationArchive = [];
console.log("test", JSON.parse(localStorage.getItem('requestLocationArchive')));
// if(JSON.parse(localStorage.getItem('requestLocationArchive'))){
//   requestLocationArchive = JSON.parse(localStorage.getItem('requestLocationArchive'));

// }
// localStorage.setItem('requestLocationArchive', JSON.stringify(requestLocationArchive));

// Create array
let filterArrayCity1 = [];

// Create obgect.
let createObject;


let option = document.createElement("li");


//get locatiof for input


console.log("Get from L:", requestLocationArchive);

// Create array.
const widgetsDataArray = [];  // ???????????????????????????

function searchCity(event) {
  // clear list location
  selectCityList.innerHTML = "";

  // search city by word key
  if (cityInput.value != "") {
    cityInput.value = event.target.value;

    

    // // filter list city:
    const writingWords = cityInput.value; // event.target from input search city
    const searchWords = writingWords.split(" "); // "Bila Tserkva, Kyivska obl Ukraine"
    filterArrayCity1 = requestLocationArchive.filter((obj) =>  // місто, країна 
      searchWords.every((word) =>
        obj.city.toLowerCase().includes(word.toLowerCase()) 
        // || obj.country.toLowerCase().includes(word.toLowerCase()) 
      )
    );

    console.log("filterArrayCity1", filterArrayCity1); // ok  2obj
    //add item to list city

    for (let i = 0; i < filterArrayCity1.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", filterArrayCity1[i].city);
      option.textContent =
        filterArrayCity1[i].city + "," + filterArrayCity1[i].country;

      selectCityList.appendChild(option); // !
    }
    // show list city
    console.log('filterArrayCity', filterArrayCity1);
    selectCityList.classList.remove("hidden");
  }
}

function getSelectListCity(event) {
  const selectedValue = event.target.getAttribute("value");
  cityInput.value = selectedValue;
  selectCityList.classList.add("hidden");

  filterArrayCity1 = [];
  // clear selectCityList
  //  selectCityList.appendChild(option);
  // selectCityList.removeChild(option);
  console.log('cityInput.value=', cityInput.value);
}

// Create minLimitDate.
let minLimitDate = new Date().toISOString().split("T")[0];
// Create maxLimitDate and interval of date!!!
let maxLimitDate = new Date(minLimitDate);
maxLimitDate.setDate(maxLimitDate.getDate() + 4);
maxLimitDate = maxLimitDate.toISOString().split("T")[0];



// have 
let curentDate = new Date()
// let curentTime = curentDate.getHours();
 let timeZone = curentDate.getTimezoneOffset()
console.log("timeZone :", timeZone);

dataSelect.setAttribute("min", minLimitDate);
dataSelect.setAttribute("max", maxLimitDate);

function selectDate(event) {
  dataSelect.value = event.target.value;
}

function selectCheckbox(event) {
  checkboxSelect.value = event.target.value;
  console.log('checkboxSelect.value===',checkboxSelect.checked);
}



// get widjets
function handleSubmit(event) {
  event.preventDefault();

 
//&& !dublicateLocal()
if( cityInput.value !== ""){

  createObject = {
    // id: new Date().getTime().toString(),
    city: cityInput.value,
    country: ""
    // dateDay: dataSelect.value,
    // isSave: checkboxSelect.checked, // on => true
  };
  requestLocationArchive.push(createObject);

      localStorage.setItem('requestLocationArchive', JSON.stringify(requestLocationArchive));
       console.log('localStorageArrayBefore', requestLocationArchive);

    }else{
    localStorage.setItem('requestLocationArchive', JSON.stringify(requestLocationArchive));

    }
  

 


  // location = {
  //   city: "",
  //   country: "",
  //   latitude: "",
  //   longitude: ""
  // }

requestLocationArchive = JSON.parse(localStorage.getItem('requestLocationArchive'));

console.log("get from localS:",  getFromLocal); 
  
  // push to localStorage:
  // if (!requestLocationArchive.includes(cityInput.value) || requestLocationArchive !== '') { requestLocationArchive.push(createObject) };



 console.log("filter",  requestLocationArchive.filter(location => location.city == cityInput.value));

  


  // localStorageArray.push(createObject);
  console.log('localStorageObject=', requestLocationArchive);

  console.log('createObject===', createObject);
  // (с оригинальными значениями ключей.)
  // widgetsDataArray.push(createObject);

  // 'http://api.openweathermap.org/data/2.5/weather?q=Kyiv,ua&date={date}&exclude=hourly,daily&appid=79e9565b6d45f0a48a3ff121a711792c'
  // 'http://api.openweathermap.org/data/2.5/weather?q=Київ,ua.lat=39.099724&lon=-94.578331&appid=79e9565b6d45f0a48a3ff121a711792c'

  // fetch(`http://api.openweathermap.org/data/2.5/weather?q=Київ,ua&appid=79e9565b6d45f0a48a3ff121a711792c`)
   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${createObject.city},ua&appid=79e9565b6d45f0a48a3ff121a711792c`)
  .then((response) => {
     return response.json();
    })
   .then((data) => {
    console.log("data wiget country short :", data.sys.country);
    console.log('cityInput.value==', createObject.city);

    createObject.city = data.name;
    //document.getElementById('sity').innerHTML = Math.round(data.main.temp - 273) + '&deg;'; 
    let temperatureCurent = Math.round(data.main.temp - 273); // Out-??????????????
    let scoreWind = Math.round(data.wind.speed);
    let curentPressure = Math.round(data.main.pressure / 1.33322);
     let curentHumidity = data.main.humidity;
     let getCountry = data.sys.country;
     
    function getDayRenderHtml() {
      const renderHTML = ` 
      <div
      class="container-day__big-section container-widgets_color-day"
      id="container-day__big-section"
    >
      <section class="container-day__curent-time-of-day">
        <span>Day</span>
        <div class="detail-info-day">...</div>
        <figure class="container-day__fa-sharp fa-solid fa-list"></figure>
      </section>
    
      <div
        class="container-day__figure-big container-widgets_color-sun container-widgets__shine"
      ></div>
      <div class="container-day__temperature-curent" id="temp">${temperatureCurent}°</div>
      <div class="container-day__city-curent out" id="sity">${createObject.city}</div>
      <section class="container-day__parametrs">
        <span>Wind now</span>
        <span>Pressure</span>
        <span>Humidity</span>
      </section>
    
      <div class="container-day__value-measurement">
        <div>
          ${scoreWind}<span class="container-day__units-measurement">m/c</span>
        </div>
        <div>${curentPressure}<span class="container-day__units-measurement">mm</span></div>
        <span
          >${curentHumidity}<span class="container-day__units-measurement">%</span></span
        >
      </div>
    </div>
    `;

      if (checkboxSelect.checked === true && cityInput.value != "") {
        widgets.innerHTML += renderHTML
      } else  if (cityInput.value !== ' ') {
        
        
        widgets.innerHTML = renderHTML; 
      }
    }
     
     getDayRenderHtml();

     // clear form
     cityInput.value = "";
     dataSelect.value = minLimitDate;
     checkboxSelect.checked = false;
   });
}



const regionNames = new Intl.DisplayNames(
  ['en'], {type: 'region'}
);

console.log(regionNames.of('UA')); // 👉️ "United States"
// console.log(regionNames.of('GB')); // 👉️ "United kingdom"
// console.log(regionNames.of('DE')); // 👉️ "Germany"
// console.log(regionNames.of('AU')); // 👉️ "Australia"


const d1 = new Date(1688808906);
let a = d1.toString(); 
console.log(a);