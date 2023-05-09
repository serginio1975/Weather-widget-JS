const buttonGetWeather = document.getElementById('controler-submit');
const buttonGetDetails = document.getElementById('button-2');
const widgets = document.getElementById('container-widgets');

buttonGetWeather.addEventListener('click', handleSubmit);
// buttonGetDetails.addEventListener('click', handleClick);
console.log('widgets ', widgets);

let selectCity = [
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

function handleSubmit(event) {
  event.preventDefault();

  console.log('button-1 clicked');
  render();
}

function handleClick(event) {
  event.preventDefault();
  console.log('click');
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
