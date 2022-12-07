// Date

let date = new Date();
let day = date.getDay();
let hour = date.getHours();
let minute = date.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}

if (minute < 10) {
  minute = `0${minute}`;
}

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = `${weekDays[day]} ${hour}:${minute}`;

// Weather

function getWeather(position) {
  let temperature = Math.round(position.data.main.temp);
  let city = position.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Currently ${temperature}°F`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

// Get Geo Location

function getLocation(response) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(getWeather);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", geoLocation);

function geoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

// City Search Box

function search(event) {
  event.preventDefault();
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let searchCity = document.querySelector("#search-city");
  let cityName = `${searchCity.value}`;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  let city = document.querySelector("#city");

  city.innerHTML = `${cityName}`;

  axios.get(apiUrl).then(getWeather);
}

let searchBox = document.querySelector(".search-box");
searchBox.addEventListener("submit", search);
