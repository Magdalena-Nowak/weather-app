const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".badge");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const API_LINK = "http://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=e2ae453678cc7a9c9e2f0267a7df42e7";
const API_UNITS = "&units=metric";
const API_LANG = "&lang=pl";

const getWeather = () => {
  const city = input.value || "Warszawa";
  const URL = API_LINK + city + API_KEY + API_UNITS + API_LANG;

  axios
    .get(URL)
    .then((res) => {
      const temp = res.data.main.temp;
      const weath = res.data.weather[0].description;
      const weatherId = res.data.weather[0].id;
      const hum = res.data.main.humidity;
      const win = res.data.wind.speed;
      cityName.textContent = res.data.name;
      temperature.textContent = Math.floor(temp) + " °C";
      humidity.textContent = hum + " %";
      wind.textContent = `${Math.floor(win * 3.6)} km/h`;
      weather.textContent = weath;
      if (weatherId >= 200 && weatherId <= 232) {
        photo.setAttribute("src", "/dist/images/thunderstorm.png");
      } else if (weatherId >= 300 && weatherId <= 321) {
        photo.setAttribute("src", "/dist/images/rain.png");
      } else if (weatherId >= 500 && weatherId <= 531) {
        photo.setAttribute("src", "/dist/images/sun-rain.png");
      } else if (weatherId >= 600 && weatherId <= 622) {
        photo.setAttribute("src", "/dist/images/snow.png");
      } else if (weatherId >= 701 && weatherId <= 781) {
        photo.setAttribute("src", "/dist/images/fog.png");
      } else if (weatherId === 800) {
        photo.setAttribute("src", "/dist/images/sun.png");
      } else if (weatherId === 801) {
        photo.setAttribute("src", "/dist/images/sun-clouds.png");
      } else if (weatherId >= 802 && weatherId <= 804) {
        photo.setAttribute("src", "/dist/images/clouds.png");
      }
    })
    .catch(() => (warning.textContent = "Wpisz poprawną nazwę miasta!"));
};

const enterCheck = (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
};
input.addEventListener("keyup", enterCheck);
button.addEventListener("click", getWeather);
