document.addEventListener("DOMContentLoaded", () => {
  const time = document.querySelector(".time"),
    date = document.querySelector(".date"),
    greeting = document.querySelector(".greeting"),
    name = document.querySelector(".name"),
    body = document.querySelector("body"),
    slidePrev = document.querySelector(".slide-prev"),
    slideNext = document.querySelector(".slide-next");

  let randomNum = getRandomNum(1, 20);

  function showTime() {
    const date = new Date(),
      currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    getRandomNum();
    setTimeout(showTime, 1000);
  }
  showTime();

  function showDate() {
    const localDate = new Date(),
      options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      },
      currentDate = localDate.toLocaleDateString("en-US", options);
    date.textContent = currentDate;
  }

  function getTimeOfDay() {
    const localDate = new Date();
    const hours = localDate.getHours();
    if (hours < 6) {
      return "night";
    } else if (hours < 12) {
      return "morning";
    } else if (hours < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

  function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}, `;
    greeting.textContent = greetingText;
  }

  function setLocalStorage() {
    localStorage.setItem("name", name.value);
    localStorage.setItem("city", city.value);
  }

  function getLocalStorage() {
    if (localStorage.getItem("name")) {
      name.value = localStorage.getItem("name");
    } else {
      name.placeholder = "[Enter name]";
    }
    if (localStorage.getItem("city")) {
      city.value = localStorage.getItem("city");
    }
  }

  function getRandomNum(min, max) {
    return Math.round(min - 0.5 + Math.random() * max);
  }

  function setBg() {
    const img = new Image();
    const timeOfDay = getTimeOfDay(),
      bgNum = String(randomNum).padStart(2, 0);
    img.src = `https://raw.githubusercontent.com/skiffong/momentum-backgrounds/main/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/skiffong/momentum-backgrounds/main/${timeOfDay}/${bgNum}.jpg')`;
    };
  }

  setBg();

  function getSlideNext() {
    if (randomNum == 20) {
      randomNum = 1;
      setBg();
    } else {
      randomNum++;
      setBg();
    }
  }

  function getSlidePrev() {
    if (randomNum == 1) {
      randomNum = 20;
      setBg();
    } else {
      randomNum--;
      setBg();
    }
  }

/*momentum-quotes */
let quote = document.querySelector(".quote");
let author = document.querySelector(".author");
let buttonQuotesRefresh = document.querySelector(".change-quote");

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  let numderQuotes = getRandomNum(0, 3);
  console.log(numderQuotes);
  quote.textContent = `${data[numderQuotes].text}`;
  author.textContent = `${data[numderQuotes].author}`;
}
getQuotes();

buttonQuotesRefresh.addEventListener("click", getQuotes);

 /*global events*/
 slideNext.addEventListener("click", getSlideNext);
 slidePrev.addEventListener("click", getSlidePrev);
 window.addEventListener("beforeunload", setLocalStorage);
 window.addEventListener("load", getLocalStorage);
 window.addEventListener('load', () => { clockTimer(); });

  /* momentum-weather*/
let weatherIcon = document.querySelector(".weather-icon");
let temperature = document.querySelector(".temperature");
let weatherDescription = document.querySelector(".weather-description");
let inputCity = document.querySelector(".city");
inputCity.value = localStorage.getItem("cityWeather")
  ? localStorage.getItem("cityWeather")
  : "Minsk";
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");

inputCity.addEventListener("change", getWeather);

async function getWeather() {
  localStorage.setItem("cityWeather", inputCity.value);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=a1096fafdeea10e797c7aadda66c4825&units=metric`;
  let res = await fetch(url);
  let error = document.querySelector(".weather-error");
  if (res.ok) {
    let data = await res.json();
    let ceilTemperature = Math.ceil(data.main.temp);
    let ceilWind = Math.ceil(data.wind.speed);

    error.textContent = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${ceilTemperature}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${ceilWind} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  } else {
    error.textContent = `Error! city not found for ${inputCity.value}`;
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherIcon.className = "";
  }
}
getWeather();
});