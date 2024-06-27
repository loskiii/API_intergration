const apiKey = '800e647167cc41cc21273962576c08bc';
const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const weatherIcon = document.getElementById('weather-icon');
const loadingContainer = document.getElementById('loading-container');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');
const weatherContainer = document.getElementById('weather-container');

searchBtn.addEventListener('click', () => {
  const location = locationInput.value;
  fetchWeatherData(location);
});

async function fetchWeatherData(location) {
  try {
    showLoading();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      updateWeatherInfo(data);
      showWeatherContainer();
    } else {
      showErrorMessage(data.message);
    }
  } catch (error) {
    showErrorMessage('An error occurred while fetching the weather data.');
  } finally {
    hideLoading();
  }
}

function updateWeatherInfo(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
  updateWeatherIcon(data.weather[0].icon);
}

function updateWeatherIcon(iconCode) {
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const iconImg = document.createElement('img');
  iconImg.src = iconUrl;
  iconImg.alt = 'Weather Icon';
  weatherIcon.innerHTML = '';
  weatherIcon.appendChild(iconImg);
}

function showLoading() {
  loadingContainer.style.display = 'block';
}

function hideLoading() {
  loadingContainer.style.display = 'none';
}

function showWeatherContainer() {
  weatherContainer.style.display = 'flex';
}

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorContainer.style.display = 'block';
}
