

function getLocalTime(latitude, longitude) {
  // do code


  // Функція для отримання поточного часу на основі координат
  const apiUrl = `https://worldtimeapi.org/api/timezone?format=json&lat=${latitude}&lng=${longitude}`;
  
  // Запит до API для отримання інформації про часові зони
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Отримуємо URL API для поточної часової зони
      const timezoneUrl = data[0];
      console.log('!!!!!!', data);
      // Запит до API для отримання поточного часу
      fetch(timezoneUrl)
        .then(response => response.json())
        .then(timeData => {
          // Отримуємо поточний час
          const currentTime = new Date(timeData.datetime);
          console.log('Поточний час:', currentTime);
        })
        .catch(error => {
          console.log('Помилка при отриманні часу:', error);
        });
    })
    .catch(error => {
      console.log('Помилка при отриманні інформації про часові зони:', error);
    });
  

}

  // Виклик функції зі значеннями ширини і довготи
  const latitude = 51.5074; // Приклад: Широта міста Лондон
  const longitude = -0.1278; // Приклад: Довгота міста Лондон
  console.log("time:", getLocalTime(latitude, longitude));  

  export default getLocalTime;