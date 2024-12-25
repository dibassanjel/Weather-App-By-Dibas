document.addEventListener('DOMContentLoaded', () => {
  // Navbar button functionality
  document.getElementById('home').addEventListener('click', () => {
    location.reload(); // Refresh the page
  });

  document.getElementById('search-weather').addEventListener('click', () => {
    document.getElementById('city').focus(); // Focus on the search input
  });

  document.getElementById('about').addEventListener('click', () => {
    alert("Welcome to Dibas's Weather Sphere!\nYour go-to app for real-time weather updates.");
  });

  // Weather search functionality
  const searchButton = document.getElementById('search');
  const cityInput = document.getElementById('city');

  // Function to handle the search
  const handleSearch = () => {
    const city = cityInput.value.trim(); // Trim to remove extra spaces
    const apiKey = '03727ae99c2d0e1b08d48ea16fd6a17f'; // Replace with your API key

    // Check if the input is empty
    if (city === '') {
      displayMessage('Enter a city name');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          // Update weather information
          document.querySelector('.temperature').textContent = `${data.main.temp}°C`;
          document.querySelector('.description').textContent = data.weather[0].description;
          document.querySelector('.weather-icon').textContent = getWeatherEmoji(data.weather[0].main);
          document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
          document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed}Km/h`;
          document.getElementById('country').textContent = `${data.name}, ${data.sys.country}`;
        } else {
          displayMessage(data.message); // Display the API's error message
        }
      })
      .catch((error) => {
        console.error('Error fetching the weather data:', error);
        displayMessage('Something went wrong. Please try again.');
      });
  };

  // Event listener for the search button
  searchButton.addEventListener('click', handleSearch);

  // Event listener for pressing "Enter" in the input field
  cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
});

// Function to display messages
function displayMessage(message) {
  const result = document.getElementById('result');
  result.innerHTML = `<p style="color: #ff7a7a; font-size: 16px; font-weight: bold;">${message}</p>`;
}

// Function to return weather emojis based on conditions
function getWeatherEmoji(condition) {
  switch (condition.toLowerCase()) {
    case 'clear':
      return '☀️';
    case 'clouds':
      return '☁️';
    case 'rain':
      return '🌧️';
    case 'snow':
      return '❄️';
    case 'thunderstorm':
      return '⛈️';
    default:
      return '🌈';
  }
}
