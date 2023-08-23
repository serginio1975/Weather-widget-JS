import { getData } from "./API_requests.js";
import { showPosition } from "./getlocation.js";
// import getLocalTime from "./getTime.js";

const buttonGetWeather = document.getElementById("controler-submit");
const widgets = document.getElementById("container-widgets");
const cityInput = document.getElementById("city-input");
const dataSelect = document.getElementById("date-input");
const checkboxSelect = document.getElementById("checkbox-input");
const selectCityList = document.getElementById("search-list-city");

cityInput.addEventListener("input", searchCity);
selectCityList.addEventListener("click", getSelectListCity);
dataSelect.addEventListener("click", selectDate);
checkboxSelect.addEventListener("change", selectCheckbox);
buttonGetWeather.addEventListener("click", handleSubmit);

let option = document.createElement("li");
let minLimitDate = new Date().toISOString().split("T")[0];
// Create maxLimitDate and interval of date!!!
let maxLimitDate = new Date(minLimitDate);
maxLimitDate.setDate(maxLimitDate.getDate() + 4);
maxLimitDate = maxLimitDate.toISOString().split("T")[0];

let curentDate = new Date();
let timeZone = curentDate.getTimezoneOffset();
dataSelect.setAttribute("min", minLimitDate);
dataSelect.setAttribute("max", maxLimitDate);

// Variables.
// let data;?????????????????????????????
let filterArrayCity = [];
let createObject = {};
const widgetsDataArray = [];
let requestLocationArchive = [];

function searchCity(event) {
  // clear list location
  selectCityList.innerHTML = "";
  // search city by word key
  if (cityInput.value != "") {
    cityInput.value = event.target.value;
    // filter list city:
    const writingWords = cityInput.value; // event.target from input search city
    const searchWords = writingWords.split(" "); // "Bila Tserkva, Kyivska obl Ukraine"
    if (requestLocationArchive.length > 0) {
      filterArrayCity = requestLocationArchive.filter(
        (
          obj // місто, країна
        ) =>
          searchWords.every((word) =>
            obj.city.toLowerCase().includes(word.toLowerCase())
          )
      );
    }
    //add item to list city
    for (let i = 0; i < filterArrayCity.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", filterArrayCity[i].city);
      option.textContent =
        filterArrayCity[i].city + "," + filterArrayCity[i].country;
      selectCityList.appendChild(option);
    }
    // show list city
    if (filterArrayCity.length !== 0 && cityInput.value !== "") {
      selectCityList.classList.remove("hidden");
    }
  }
};
function getSelectListCity(event) {
  const selectedValue = event.target.getAttribute("value");
  console.log("selectedValue=", selectedValue);
  cityInput.value = selectedValue;
  selectCityList.classList.add("hidden");
}
function selectDate(event) {
  dataSelect.value = event.target.value;
}
// bug!!!!!!!!!!!!!!!!!!!!!!!!!!
function selectCheckbox(event) {
  checkboxSelect.value = event.target.value;
  console.log("checkboxSelect.value===", checkboxSelect.checked);
}


// get widjets
function handleSubmit(event) {
    event.preventDefault();

  if (cityInput.value !== "") {
      getData(cityInput.value).then(data => {
      console.log('open_weather_map_data', data);

      createObject = {
      city: data.name,
      country: data.sys.country,
      };

      if (requestLocationArchive.every((el) => el.city !== createObject.city)) {
        requestLocationArchive.push(createObject);
        localStorage.setItem(
          "requestLocationArchive",
          JSON.stringify(requestLocationArchive)
        );
        requestLocationArchive = JSON.parse(
          localStorage.getItem("requestLocationArchive")
        );
      }
      });
    } else {
    showPosition().then(data => console.log("get Location default:", data));
   
   
    localStorage.setItem(
      "requestLocationArchive",
      JSON.stringify(requestLocationArchive)
    );
    requestLocationArchive = JSON.parse(
      localStorage.getItem("requestLocationArchive")
    );
  }

   console.log("get from localStorage:", requestLocationArchive); // getFromLocalStorage

   if (requestLocationArchive.length < 1) {
     createObject.city = "kharkiv"; // ?????????????????
   }

  getData(cityInput.value).then((data) => {
    let temperatureCurent = Math.round(data.main.temp - 273);
    let scoreWind = Math.round(data.wind.speed);
    let curentPressure = Math.round(data.main.pressure / 1.33322);
    let curentHumidity = data.main.humidity;
    let getCountry = data.sys.country;

    renderWidget({
      temperatureCurent,
      scoreWind,
      curentPressure,
      curentHumidity,
      getCountry,
    });
  });

  
}

function renderWidget({
  temperatureCurent,
  scoreWind,
  curentPressure,
  curentHumidity,
  getCountry,
}) {
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
    widgets.innerHTML += renderHTML;
  } else if (cityInput.value !== " ") {
    widgets.innerHTML = renderHTML;
  }

// clear form
cityInput.value = "";
dataSelect.value = minLimitDate;
checkboxSelect.checked = false;
selectCityList.classList.add("hidden");
}
