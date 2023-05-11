const buttonGetWeather = document.getElementById('controler-submit');
const widgets = document.getElementById('container-widgets');

buttonGetWeather.addEventListener('click', handleSubmit);

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

  console.log('button-get-weather: clicked');
  render();
}

// function handleClick(event) {
// event.preventDefault();
// console.log('click');
// }

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

//

document
  .querySelector('.button-get-weather')
  .addEventListener('click', myClick1);

function myClick1() {
  let input1 = document.querySelector('.container-input').value;
  console.log(input1);
}
//

document
  .querySelector('.button-get-weather')
  .addEventListener('click', myClick2);
function myClick2() {
  let input2 = document.querySelector('.select').value;
  console.log(input2);
}
