const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warninng = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const API_LINK = "http://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=e2ae453678cc7a9c9e2f0267a7df42e7";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value || "Warszawa";
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios.get(URL).then((res) => {
    console.log(res.data);
    const temp = res.data.main.temp;
    const weath = res.data.weather[0].main;
    const hum = res.data.main.humidity;
    const win = res.data.wind.speed;
    cityName.textContent = res.data.name;
    temperature.textContent = Math.floor(temp) + " °C";
    humidity.textContent = hum + " %";
    wind.textContent = `${win * 3.6} km/h`;
    weather.textContent = weath;
  });
};

getWeather();
