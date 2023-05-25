//
const buttonGetWeather = document.getElementById('controler-submit');
const widgets = document.getElementById('container-widgets');
//
let cityInput = document.getElementById('city-input');
let dateInput = document.getElementById('date-input');
let checkboxInput = document.getElementById('checkbox-input');
let selectorCity = document.getElementById('select-city');
const citySelect = document.querySelector('.select');
const dataSelect = document.querySelector('.controler-date');
const checkboxSelect = document.querySelector('.row-checkbox');
//
buttonGetWeather.addEventListener('click', handleSubmit);
citySelect.addEventListener('change', selectedCity);
dataSelect.addEventListener('change', selectDate);
checkboxSelect.addEventListener('change', selectCheckbox);

// Create minLimitDate.
let minLimitDate = new Date().toISOString().split('T')[0];

// Create maxLimitDate and interval of date!!!
let maxLimitDate = new Date(minLimitDate);
maxLimitDate.setDate(maxLimitDate.getDate() + 4);
maxLimitDate = maxLimitDate.toISOString().split('T')[0];

dataSelect.setAttribute('min', minLimitDate);
dataSelect.setAttribute('max', maxLimitDate);

console.log('minLimitDate ', minLimitDate);
console.log('maxLimitDate:', maxLimitDate);

console.log(' dateInput.min', dateInput.min);
console.log(' dateInput.max', dateInput.max);

//
let createObject;
const widgetsDataArray = [
  // { id: '23232', city: 'Lviv', dateDay: '', isSave: true },
  // { id: '1111', city: 'Paris', dateDay: '', isSave: true },
  // { id: '09080', city: '', dateDay: '', isSave: true },
  // { id: '342421', city: '', dateDay: '', isSave: true },
];

const selectCity = [
  {
    id: 1300343,
    city: 'Kyiv',
    country: 'Ukraine',
  },
  {
    id: 1322343,
    city: 'Kharkiv',
    country: 'Ukraine',
  },
  {
    id: 1320943,
    city: 'Antalia',
    country: 'Turkey',
  },
];

// loop
// for(let obj  of selectCity ){
//   console.log(obj.city);
// };
const options = citySelect.options;
console.log('options', options);

for (let i = 0; i < selectCity.length; i++) {
  console.log('loop city', selectCity[i].city);

  //  take options in select html
}

function selectedCity(event) {
  console.log('event.target.value_city', event.target.value); //value: city!
  // event.target.value = cityInput.value;
  cityInput.value = event.target.value;
}
//
function selectDate(event) {
  dateInput.value = event.target.value;
  console.log('event.target.value_date', event.target.value); //value: date!
  console.log(document.getElementById('date-input').value); // 2-й вар.
  // !!!!!!!!!!!!!! does not output to console !!!!!!!
}
//
function selectCheckbox(event) {
  checkboxInput.value = event.target.value;
  // console.log('event.target.value_checkbox', event.target.value); //value: date!
  console.log('checkboxInput.checked', checkboxInput.checked);
}

function handleSubmit(event) {
  event.preventDefault();

  console.log('button-get-weather: clicked');

  // new obj
  createObject = {
    id: new Date().getTime().toString(),
    city: citySelect.value,
    dateDay: dataSelect.value,
    isSave: checkboxInput.checked, // on => true
  };

  console.log('createObject', createObject);

  // push to Array widgetsData;
  widgetsDataArray.push(createObject);

  console.log('widgetsDataArray', widgetsDataArray);

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

// function myClick1() {
//   let enterCity = document.querySelector('.container-input').value;
//   console.log(enterCity);
// }
//

// document
//   .querySelector('.button-get-weather')
//   .addEventListener('click', myClick2);
// function myClick2() {
//   let input2 = document.querySelector('.select').value;
//   console.log(input2);
// }
// to day
