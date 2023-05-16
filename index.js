const buttonGetWeather = document.getElementById('controler-submit');
const widgets = document.getElementById('container-widgets');

let cityInput = document.querySelector('.container-input');
const citySelect = document.querySelector('.select');

buttonGetWeather.addEventListener('click', handleSubmit);
citySelect.addEventListener('change', selectCity);

let select_City = [
  {
    city: 'Kyiv',
    index: 1322343,
    country: 'Ukraine',
  },
  {
    city: 'Kharkiv',
    country: 'Ukraine',
  },
  {
    city: 'Antalia',
    country: 'Turkey',
  },
];

function selectCity(event) {
  console.log('event.target.value', event.target.value); //kiev
  // event.target.value = cityInput.value;
  cityInput.value = event.target.value;
}

function handleSubmit(event) {
  event.preventDefault();

  console.log('button-get-weather: clicked');
  render();
}

function render() {
  const renderHTML = ` 
    <div  class="container-day__small-section container-widgets_color-day">
      <section class="container-day__curent-time-of-day">
        <div>Day</div>
        <div>...</div>
        <div
          class="container-day__figure-small container-widgets_color-sun"
        ></div>
      </section>

      <span class="container-day__temperature-curent">32º</span>
      <button
        class="container-day__button container-day_color-btn-day"
        type="submit" id="button-2"
      >Swipe to see details!
      </button>
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
