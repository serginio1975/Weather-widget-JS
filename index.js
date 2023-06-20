const buttonGetWeather = document.getElementById("controler-submit");
const widgets = document.getElementById("container-widgets");
const cityInput = document.getElementById("city-input");
const dataSelect = document.getElementById("date-input");
const checkboxSelect = document.getElementById("checkbox-input");
const selectCityList = document.getElementById("search-list-city");

// cityInput.addEventListener("focus", searchCity);
cityInput.addEventListener("input", searchCity);
selectCityList.addEventListener("click", getSelectListCity);
dataSelect.addEventListener("change", selectDate);
checkboxSelect.addEventListener("change", selectCheckbox);
buttonGetWeather.addEventListener("click", handleSubmit);


// Сreate List city select.
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
    city: "Antalia",
    country: "Turkey",
  },
];

// Create array
let filterArrayCity = [];

// Create obgect.
let createObject;

 let option = document.createElement("li");

// Create array.
const widgetsDataArray = [];


function searchCity(event) {
  // search city by word key
  if (cityInput.value != "") {
    cityInput.value = event.target.value;
    console.log("search city by word key:", cityInput.value);

    // filter list city
    filterArrayCity = arrayCity.filter(   // 1 add include()
      (el) => el.city.toLowerCase() === cityInput.value.toLowerCase()  // 2 condition for country  - some & every methods
    );
    console.log("filterArrayCity in searchCity;", filterArrayCity);


    
    //add item to list city
    for (let i = 0; i < filterArrayCity.length; i++) {
     
      // option.value = arrayCity[i].city;
      option.setAttribute("value", filterArrayCity[i].city);
      option.textContent =
        filterArrayCity[i].city + "," + filterArrayCity[i].country;
      console.log("option:", option);
      // option.addEventListener("click", getSelectListCity);
      selectCityList.appendChild(option); // змiнна.
      
      filterArrayCity = [];
    }

    // show list city
    selectCityList.classList.remove("hidden");
  }
};

function getSelectListCity(event) {
  // console.log("select city:", event.target.value);
  const selectedValue = event.target.getAttribute("value");
  console.log("select", selectedValue); // ??????
  cityInput.value = selectedValue;
  selectCityList.classList.add("hidden");
  
  filterArrayCity = [];
  console.log("getSelectListCity   filterArrayCity",  filterArrayCity);
  // clear selectCityList
    //  selectCityList.appendChild(option);
  selectCityList.removeChild(option);
};


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
};


function selectCheckbox(event) {
  checkboxSelect.value = event.target.value;
};

function handleSubmit(event) {
  event.preventDefault();

  createObject = {
    id: new Date().getTime().toString(),
    city: cityInput.value,
    dateDay: dataSelect.value,
    isSave: checkboxSelect.checked, // on => true
  };

  // Перемещение обьекта createObject в массив widgetsDataArray.
  // (с оригинальными значениями ключей.)
  widgetsDataArray.push(createObject);
  console.log("createObject", createObject);

  // clear form
  cityInput.value = "";
  dataSelect.value = minLimitDate;
  checkboxSelect.checked = false;

  render();
};

function render() {
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
  <div class="container-day__temperature-curent" id="temp">32cº</div>
  <div class="container-day__city-curent out" id="sity">${createObject.city}</div>
  <section class="container-day__parametrs">
    <span>Wind now</span>
    <span>Humidity</span>
    <span>Precipitation</span>
  </section>

  <div class="container-day__value-measurement">
    <div>
      15<span class="container-day__units-measurement">km</span>
    </div>
    <div>32<span class="container-day__units-measurement">%</span></div>
    <span
      >87<span class="container-day__units-measurement">%</span></span
    >
  </div>
</div>
`;
  widgets.innerHTML += renderHTML;
};
