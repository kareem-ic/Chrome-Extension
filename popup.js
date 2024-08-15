// Function to fetch and display weather data based on the user's input city
function getWeather() {
  const apiKey = "3ad92564629b9ab36db3dc5733f5cef2"; 
  const city = document.getElementById("city").value;
// Check if the user has entered a city name
  if (!city) {
    alert("Please enter a city"); // Alert the user if no city is entered
    return; // Exit the function if no city is entered
  }

  let testData;
    // URLs to fetch current weather data and 5-day forecast data for the entered city
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
// Fetch current weather data
  fetch(currentWeatherUrl)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      displayWeather(data); // Call the function to display current weather data
      console.log(data); // Log the data to the console for debugging purposes
    })

    .catch((error) => {
      console.error("Error fetching current weather data", error); // Log the error in case of failure
      alert("Error fetching current weather data. Please try again."); // Alert the user of the error
    });
// Fetch weather forecast data (next 5 days, every 3 hours)
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching current weather data", error);
      alert("Error fetching current weather data. Please try again.");
    });
}
// Function to display current weather data
function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  // Clear previous weather information
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";
 // Check if the API returned an error (e.g., city not found)
  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name; // Extract the city name from the API response
    // const temperature = Math.round(data.main.temp - 273.15);     celsius formula
    const temperature = Math.round(((data.main.temp - 273.15) * 9) / 5 + 32); // fahrenheit formula
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
// HTML for displaying temperature
    const temperatureHTML = `
            <p>${temperature}ºF</p>  
        `; // degrees symbol might be incorrect
// HTML for displaying city name and weather description
    const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;
// Update the DOM with the fetched weather information
    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}
// Function to display the hourly forecast for the next 24 hours
function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  const next24Hours = hourlyData.slice(0, 8); // Get the first 8 items (representing the next 24 hours, as each item is 3 hours apart)
// Loop through each hourly forecast item and create HTML to display it
  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // Convert the Unix timestamp to a JavaScript Date object
    const hour = dateTime.getHours(); // Get the hour from the Date object
    // const temperature = Math.round(item.main.temp - 273.15);  celsius formula
    const temperature = Math.round(((item.main.temp - 273.15) * 9) / 5 + 32); // fahrenheit formula

    const iconCode = item.weather[0].icon; // Extract the weather icon code
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}ºF</span>    
            </div>
        `; // degrees symbol might be incorrect
    hourlyForecastDiv.innerHTML += hourlyItemHtml; // Append the hourly forecast item to the hourly forecast div
  });
}
// Function to display the weather icon image
function showImage() {
  const weatherIcon = document.getElementById("weather-icon"); // Get the weather icon image element
  weatherIcon.style.display = "block";
}
