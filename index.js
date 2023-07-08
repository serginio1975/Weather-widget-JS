// API ?
// fetch methods 
// async
// rest method "GET"
// http & https

// import { showPosition } from "./getlocation.js";
// console.log("showPosition", showPosition());
let valueCheckbox;
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

// Сreate List city select.
// get from localStorage
const arrayCity = [
  {
    id: 1300343,
    city: "Kyiv",
    country: "Ukraine",
  },
  {
    id: 1322343,
    city: "Kharkiv",
    country: "Ukraine",
  },
  {
    id: 1320943,
    city: "Antalya",
    country: "Turkey",

    id: 1320945,
    city: "Lviv",
    country: "Ukraine",
  },
];

// "http://api.openweathermap.org/data/2.5/weather?q=Kyiv,ua&date={date}&exclude=hourly,daily&appid=79e9565b6d45f0a48a3ff121a711792c"

// Create array
let filterArrayCity1 = [];

// Create obgect.
let createObject;


let option = document.createElement("li");

// Create array.
const widgetsDataArray = [];

function searchCity(event) {
  // clear list location
  selectCityList.innerHTML = "";

  // search city by word key
  if (cityInput.value != "") {
    cityInput.value = event.target.value;

    

    // // filter list city:
    const writingWords = cityInput.value; // event.target from input search city
    const searchWords = writingWords.split(" "); // "Bila Tserkva, Kyivska obl Ukraine"
    filterArrayCity1 = arrayCity.filter((obj) =>  // місто, країна 
      searchWords.every((word) =>
        obj.city.toLowerCase().includes(word.toLowerCase()) 
        || obj.country.toLowerCase().includes(word.toLowerCase()) 
      )
    );

    console.log("filterArrayCity length", filterArrayCity1.length); // ok  2obj
    //add item to list city

    for (let i = 0; i < filterArrayCity1.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", filterArrayCity1[i].city);
      option.textContent =
        filterArrayCity1[i].city + "," + filterArrayCity1[i].country;

      selectCityList.appendChild(option); // !
    }
    // show list city
    selectCityList.classList.remove("hidden");
  }
}

function getSelectListCity(event) {
  // console.log("select city:", event.target.value);
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

dataSelect.setAttribute("min", minLimitDate);
dataSelect.setAttribute("max", maxLimitDate);

function selectDate(event) {
  dataSelect.value = event.target.value;
}

function selectCheckbox(event) {
  checkboxSelect.value = event.target.value;
  valueCheckbox = true;
}

function handleSubmit(event) {
  event.preventDefault();

  createObject = {
    id: new Date().getTime().toString(),
    city: cityInput.value,
    dateDay: dataSelect.value,
    isSave: checkboxSelect.checked, // on => true
  };

  // (с оригинальными значениями ключей.)
  widgetsDataArray.push(createObject);

  
  // http://api.openweathermap.org/data/2.5/weather?q=Київ,ua.lat=39.099724&lon=-94.578331&appid=79e9565b6d45f0a48a3ff121a711792c

  // fetch(`http://api.openweathermap.org/data/2.5/weather?q=Київ,ua&appid=79e9565b6d45f0a48a3ff121a711792c`)
   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${createObject.city},ua&appid=79e9565b6d45f0a48a3ff121a711792c`)
  .then((response) => {
     return response.json();
    })
   .then((data) => {
    console.log(data);
    console.log('cityInput.value==', createObject.city);
    
    //document.getElementById('sity').innerHTML = Math.round(data.main.temp - 273) + '&deg;'; 
    let temperatureCurent = Math.round(data.main.temp - 273); // Out-??????????????
    let scoreWind = Math.round(data.wind.speed);
    let curentPressure = Math.round(data.main.pressure / 1.33322);

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
        <span>Precipitation</span>
      </section>
    
      <div class="container-day__value-measurement">
        <div>
          ${scoreWind}<span class="container-day__units-measurement">m/c</span>
        </div>
        <div>${curentPressure}<span class="container-day__units-measurement">mm</span></div>
        <span
          >87<span class="container-day__units-measurement">%</span></span
        >
      </div>
    </div>
    `;

      if (valueCheckbox === true && cityInput.value != "") {
        widgets.innerHTML += renderHTML
      } else if (cityInput.value !== "") {
        widgets.innerHTML = renderHTML
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