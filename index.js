const buttonGetWeather = document.getElementById("controler-submit");
const widgets = document.getElementById("container-widgets");

const cityInput = document.getElementById("city-input"); 
const dataSelect = document.getElementById("date-input");
const checkboxSelect = document.getElementById("checkbox-input");

const selectCityList = document.getElementById("search-list-city");

// !!!!!!!!!!!!!!!!!!!!
cityInput.addEventListener("focus", selectedCity);
selectCityList.addEventListener("change", getSelectListCity)

dataSelect.addEventListener("change", selectDate);
checkboxSelect.addEventListener("change", selectCheckbox);

buttonGetWeather.addEventListener("click", handleSubmit);


function getSelectListCity(event) {
  // console.log("select city:", event.target.value);
  cityInput.value = event.target.value;
  selectCityList.classList.add("hidden");
}

function selectedCity(event) {
  // console.log("focus");
  selectCityList.classList.remove("hidden");
  cityInput.value = event.target.value;
  // console.log(cityInput.value );
}

function selectDate(event) {
  dataSelect.value = event.target.value;
  // console.log('event.target.value_date', event.target.value); //value: date!
  // console.log(document.getElementById('date-input').value); // 2-й вар.
  // !!!!!!!!!!!!!! does not output to console !!!!!!!
}

// Create minLimitDate.
let minLimitDate = new Date().toISOString().split("T")[0];

// Create maxLimitDate and interval of date!!!
let maxLimitDate = new Date(minLimitDate);
maxLimitDate.setDate(maxLimitDate.getDate() + 4);
maxLimitDate = maxLimitDate.toISOString().split("T")[0];

dataSelect.setAttribute("min", minLimitDate);
dataSelect.setAttribute("max", maxLimitDate);

//
function selectCheckbox(event) {
  checkboxSelect.value = event.target.value;
  // console.log('event.target.value_checkbox', event.target.value); //value: date!
  // console.log('checkboxInput.checked', checkboxInput.checked);
}

function handleSubmit(event) {
  event.preventDefault();
  // console.log('button-get-weather: clicked');
// console.log('cityInput.value:', cityInput.value);
  // create object.
  createObject = {
    id: new Date().getTime().toString(),
    city: cityInput.value,
    dateDay: dataSelect.value,
    isSave: checkboxSelect.checked, // on => true
  };

  // console.log("createObject", createObject);

  // Перемещение обьекта createObject в массив widgetsDataArray.
  // (с оригинальными значениями ключей.)
  widgetsDataArray.push(createObject);
  // console.log('widgetsDataArray', widgetsDataArray);
   cityInput.value = '';
  render();
}


// Create obgect.
let createObject;

// Create array.
const widgetsDataArray = [];

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

// !!!
for (let i = 0; i < arrayCity.length; i++) {
  let option = document.createElement("option");
  option.value = arrayCity[i].city;
  option.textContent = arrayCity[i].city + "," + arrayCity[i].country;
  // console.log(option);
  selectCityList.appendChild(option);
}


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
}
