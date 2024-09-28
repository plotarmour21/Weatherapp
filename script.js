// Initialize AOS (Animate On Scroll)
AOS.init();

// Your OpenWeatherMap API key
const apiKey = "ae48dc26bf1b673c21855d718341650c";

document.getElementById("searchBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
  } else {
    showError("Please enter a valid city name.");
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      // Update weather icon based on weather condition
      const weatherCode = data.weather[0].id;
      const weatherIcon = getWeatherIcon(weatherCode);

      // Display weather info
      document.getElementById(
        "cityName"
      ).innerText = `${data.name}, ${data.sys.country}`;
      document.getElementById(
        "weatherDescription"
      ).innerText = `Weather: ${data.weather[0].description}`;
      document.getElementById(
        "temperature"
      ).innerText = `Temperature: ${data.main.temp}°C`;
      document.getElementById("weatherIcon").className = weatherIcon;

      document.getElementById("weatherResult").style.display = "block";
      document.getElementById("errorMessage").style.display = "none";
    })
    .catch((error) => {
      showError(error.message);
      document.getElementById("weatherResult").style.display = "none";
    });
}

function getWeatherIcon(weatherCode) {
  if (weatherCode >= 200 && weatherCode < 300) {
    return "fas fa-bolt"; // Thunderstorm
  } else if (weatherCode >= 300 && weatherCode < 500) {
    return "fas fa-cloud-rain"; // Drizzle
  } else if (weatherCode >= 500 && weatherCode < 600) {
    return "fas fa-cloud-showers-heavy"; // Rain
  } else if (weatherCode >= 600 && weatherCode < 700) {
    return "fas fa-snowflake"; // Snow
  } else if (weatherCode >= 700 && weatherCode < 800) {
    return "fas fa-smog"; // Atmosphere (fog, mist, etc.)
  } else if (weatherCode === 800) {
    return "fas fa-sun"; // Clear
  } else if (weatherCode > 800 && weatherCode < 900) {
    return "fas fa-cloud"; // Clouds
  } else {
    return "fas fa-question"; // Unknown
  }
}

function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.innerText = message;
  errorMessage.style.display = "block";
}
