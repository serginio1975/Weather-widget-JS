import getDate from "./API.js";

const buttonGetWeather = document.getElementById("controler-submit");
const widgets = document.getElementById("container-widgets");
const cityInput = document.getElementById("city-input");
const dataSelect = document.getElementById("date-input");
const checkboxSelect = document.getElementById("checkbox-input");
const selectCityList = document.getElementById("search-list-city");
let option = document.createElement("li");
//
cityInput.addEventListener("input", searchCity);
selectCityList.addEventListener("click", getSelectListCity);
dataSelect.addEventListener("click", selectDate);
checkboxSelect.addEventListener("change", selectCheckbox);
buttonGetWeather.addEventListener("click", handleSubmit);
//
// Create minLimitDate.
let minLimitDate = new Date().toISOString().split("T")[0];
// Create maxLimitDate and interval of date!!!
let maxLimitDate = new Date(minLimitDate);
maxLimitDate.setDate(maxLimitDate.getDate() + 4);
maxLimitDate = maxLimitDate.toISOString().split("T")[0];

// have
let curentDate = new Date();
// let curentTime = curentDate.getHours();
let timeZone = curentDate.getTimezoneOffset();
console.log("timeZone :", timeZone);
dataSelect.setAttribute("min", minLimitDate);
dataSelect.setAttribute("max", maxLimitDate);

// Create array
let filterArrayCity = [];
// Create obgect.
let createObject = {};
// Create array.
const widgetsDataArray = [];
//
let requestLocationArchive = [];

requestLocationArchive = JSON.parse(
  localStorage.getItem("requestLocationArchive")
);
console.log("requestLocationArchive-BEFORE=", requestLocationArchive);

requestLocationArchive = [{ city: "Kharkiv", country: "" }]; // Початкова локацiя (input = '') !!! Геолокацiя !!!!!!!!!!!!!!!!!!!
//localStorage.setItem('city', 'Kharkiv');

function searchCity(event) {
  // clear list location
  selectCityList.innerHTML = "";

  // search city by word key
  if (cityInput.value != "") {
    cityInput.value = event.target.value;
    // filter list city:
    const writingWords = cityInput.value; // event.target from input search city
    const searchWords = writingWords.split(" "); // "Bila Tserkva, Kyivska obl Ukraine"
    filterArrayCity = requestLocationArchive.filter(
      (
        obj // місто, країна
      ) =>
        searchWords.every(
          (word) => obj.city.toLowerCase().includes(word.toLowerCase())
          // || obj.country.toLowerCase().includes(word.toLowerCase())
        )
    );
    console.log("filterArrayCity", filterArrayCity);
    //add item to list city

    for (let i = 0; i < filterArrayCity.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", filterArrayCity[i].city);
      option.textContent =
        filterArrayCity[i].city + "," + filterArrayCity[i].country;
      selectCityList.appendChild(option);
    }
    // show list city
    // console.log('filterArrayCity', filterArrayCity);
    if (filterArrayCity.length !== 0 && cityInput.value !== "") {
      selectCityList.classList.remove("hidden");
    }
  }
}

function getSelectListCity(event) {
  const selectedValue = event.target.getAttribute("value");
  console.log("selectedValue=", selectedValue);
  cityInput.value = selectedValue;
  // if
  selectCityList.classList.add("hidden");

  filterArrayCity = [];
  // clear selectCityList
  //  selectCityList.appendChild(option);
  // selectCityList.removeChild(option);
  console.log("cityInput.value=", cityInput.value);
}

function selectDate(event) {
  dataSelect.value = event.target.value;
}

function selectCheckbox(event) {
  checkboxSelect.value = event.target.value;
  console.log("checkboxSelect.value===", checkboxSelect.checked);
}

// get widjets
function handleSubmit(event) {
  event.preventDefault();

  //&& !dublicateLocal()
  if (cityInput.value !== "") {

    createObject = {
      city: cityInput.value,
      country: "",
      // dateDay: dataSelect.value,
      // isSave: checkboxSelect.checked, // on => true,
      // id: new Date().getTime().toString()
    };

    if (requestLocationArchive.every((el) => el.city !== createObject.city)) {
      requestLocationArchive.push(createObject);
    }
    localStorage.setItem(
      "requestLocationArchive",
      JSON.stringify(requestLocationArchive)
    );
    console.log("localStorageArrayBefore", requestLocationArchive);
  } else {
    localStorage.setItem(
      "requestLocationArchive",
      JSON.stringify(requestLocationArchive)
    );
  }

  requestLocationArchive = JSON.parse(
    localStorage.getItem("requestLocationArchive")
  );

  console.log("get from localStorage:", requestLocationArchive); // getFromLocalStorage

  console.log(
    "filter",
    requestLocationArchive.filter(
      (location) => location.city == cityInput.value
    )
  );
  let requestLocationArchiveFilter = requestLocationArchive.filter(
    (location) => location.city == cityInput.value
  );

  // localStorageArray.push(createObject);
  // console.log("localStorageObject=", requestLocationArchive);

  // console.log("createObject===", createObject);
  // (с оригинальными значениями ключей.)
  // widgetsDataArray.push(createObject);

  // console.log("requestLocationArchive.length", requestLocationArchive.length);

  if (requestLocationArchive.length < 2) {
    createObject.city = "kharkiv";
    console.log("createObject.city=", createObject.city);
  }

getDate("Kharkiv").then(data => {

    console.log("get data:", data);
    
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
  }
    );


  // clear form
  cityInput.value = "";
  dataSelect.value = minLimitDate;
  checkboxSelect.checked = false;
  selectCityList.classList.add("hidden");
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
}
