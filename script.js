console.log("✅ Script loaded");

const apiKey = "6d94c7c2f1194a86c3b8b3e279e4ec8f"; // Replace with your actual key

// Search weather by city
function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

// Get weather using geolocation
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        fetchWeather(url);
      },
      () => alert("Location access denied.")
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Fetch weather and update UI
function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const weather = data.weather[0].main.toLowerCase();
      console.log("🌤️ Weather received:", weather);

      document.getElementById("city").textContent = data.name;
      document.getElementById("temp").textContent = `🌡️ ${data.main.temp}°C`;
      document.getElementById("desc").textContent = `☁️ ${data.weather[0].description}`;
      document.getElementById("icon").src = `assets/icons/${weather}.png`;
      document.getElementById("weatherBox").style.display = "block";

      changeBackground(weather);
    })
    .catch(error => {
      alert(error.message);
    });
}

// Change background based on weather
function changeBackground(weather) {
  const app = document.getElementById("app");

  const backgrounds = {
    clear: 'sunny.png',
    clouds: 'cloudy.png',
    rain: 'rainy.png',
    snow: 'snowy.png',
    mist: 'misty.jpg',
    haze: 'misty.jpg',
    fog: 'misty.jpg',
    drizzle: 'rainy.png',
    thunderstorm: 'rainy.png',
    default: 'default.jpeg'
  };

  const bgImage = backgrounds[weather] || backgrounds.default;
  console.log("🎨 Changing background to:", bgImage);

  app.style.backgroundImage = `url('assets/images/${bgImage}')`;
}
