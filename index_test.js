// Declaring variables.

const buttonGetWeather = document.getElementById("controler-submit");
const widgets = document.getElementById("container-widgets");

const citySelect = document.getElementById("city-input");  //!
const selectOption = document.getElementById("select-city");

const dataSelect = document.querySelector(".controler-date");
const checkboxSelect = document.querySelector(".row-checkbox");


citySelect.addEventListener("click", selectedCity);
dataSelect.addEventListener("change", selectDate);
checkboxSelect.addEventListener("change", selectCheckbox);
buttonGetWeather.addEventListener("click", handleSubmit);

// Create minLimitDate.
let minLimitDate = new Date().toISOString().split("T")[0];

// Create maxLimitDate and interval of date!!!
let maxLimitDate = new Date(minLimitDate);
maxLimitDate.setDate(maxLimitDate.getDate() + 4);
maxLimitDate = maxLimitDate.toISOString().split("T")[0];


dataSelect.setAttribute("min", minLimitDate);
dataSelect.setAttribute("max", maxLimitDate);


// Create obgect.
let createObject;

// Create array.
const widgetsDataArray = [];

// Create array.
const selectCity = [
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
for (let i = 0; i < selectCity.length; i++) {
  const option = document.createElement("option"); // create element option in html
  option.value = selectCity[i].city; // записуемо в value міста
  option.textContent = selectCity[i].city + "," + selectCity[i].country; // в option додаем текст міста та краіни
  selectOption.appendChild(option); //В citySelect додаем option)
}
// !!!



//
function selectedCity(event) {
  console.log("event.target.value_city"); //value: city!
  event.target.value = citySelect.value;
  citySelect.value = event.target.value;
dataSelect.value = event.target.value;
 // console.log('event.target.value_date', event.target.value); //value: date!
  //console.log(document.getElementById('date-input').value); // 2-й вар.
 // !!!!!!!!!!!!!! does not output to console !!!!!!!
};



//
function selectDate(event) {
  dataSelect.value = event.target.value;
  // console.log('event.target.value_date', event.target.value); //value: date!
  // console.log(document.getElementById('date-input').value); // 2-й вар.
  // !!!!!!!!!!!!!! does not output to console !!!!!!!
}
//
function selectCheckbox(event) {
  checkboxSelect.value = event.target.value;
  // console.log('event.target.value_checkbox', event.target.value); //value: date!
  // console.log('checkboxInput.checked', checkboxInput.checked);
}

function handleSubmit(event) {
  event.preventDefault();
  // console.log('button-get-weather: clicked');

  // create object.
  createObject = {
    id: new Date().getTime().toString(),
    city: citySelect.value,
    dateDay: dataSelect.value,
    isSave: checkboxSelect.checked, // on => true
  };

  console.log("createObject", createObject);

  // Перемещение обьекта createObject в массив widgetsDataArray.
  // (с оригинальными значениями ключей.)
  widgetsDataArray.push(createObject);
  // console.log('widgetsDataArray', widgetsDataArray);

  render();
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
