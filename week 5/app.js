// Replace with your OpenWeatherMap API key
const apiKey = 'b3822d0e1e5309754ad42100be3ff7e5';

// Default location (can be changed to user input or geolocation)
let latitude = 37.7749; // San Francisco
let longitude = -122.4194;

// Function to fetch weather data
function fetchWeather() {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const location = `${data.name}, ${data.sys.country}`;
            const temp = `${Math.round(data.main.temp)}°C`;
            const humidity = `${data.main.humidity}%`;
            const windSpeed = `${data.wind.speed} m/s`;
            const description = data.weather[0].description;

            // Update the UI with fetched data
            document.getElementById('location').textContent = location;
            document.getElementById('temp').textContent = `Temperature: ${temp}`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}`;
            document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed}`;
            document.getElementById('weather-description').textContent = `Description: ${description}`;
        })
        .catch(err => console.error('Error fetching weather data: ', err));
}

// Initialize Leaflet map
function initializeMap() {
    const map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Current Location')
        .openPopup();
}

// Load weather and initialize map
function loadApp() {
    fetchWeather();
    initializeMap();
}

// Run the app
loadApp();
