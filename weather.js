// Dom Selection--
// Select the input and button
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

// Select the display elements
const messageArea = document.getElementById('message-area');
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const tempMain= document.getElementById('temperature-main')
const description = document.getElementById('weather-description')
const humidityValue = document.getElementById('humidity-value')
const windSpeedValue = document.getElementById('wind-Speed-Value')
const tempMaxValue = document.getElementById('temp-max-value')
const tempMinValue = document.getElementById('temp-min-value')

// -- API CONFIGURATION
const API_KEY = '2535279031f6a9fa40abd81fa2f7ce50'
BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function
function showMessage(msg,isError = false){
    messageArea.textContent = msg;
    messageArea.classList.remove('hidden','bg-red-200','bg-yellow-200')
    weatherDisplay.classList.add('hidden');
    if(isError){
        messageArea.classList.add('bg-red-200','text-red-700')
    }else {
        messageArea.classList.add('bg-red-200','text-red-700')
    }
}
// Helper Function to display weather data
function displayWeather(data) {
    weatherDisplay.classList.remove('hidden');
    messageArea.classList.add('hidden')

    /// Dom Manipulation(updating content)
    cityName.textContent = `${data.name},${data.sys.country}`;
    // Use Math.round for clean integer temperature
    tempMain.textContent = Math.round(data.main.temp)
    // Access nested properties
    description.textContent = data.weather[0].description;
    // update the details grid
    humidityValue.textContent  = `${data.main.humidity} %`;
    windSpeedValue.textContent = `${data.wind.speed} m/s`
    tempMaxValue.textContent = `${data.Math.round(data.main.temp_max)
        
    }*C`
    tempMinValue.textContent = `${data.Math.round(data.main.temp_min)}*C`

}
// -- ASYCHRONOUS FUNCTION
async function fetchWeather(city){
    if(API_KEY === 'YOUR_OPENWEATHER_API_KEY'){
        showMessage('please replace "YOUR_OPENWEATHER_API_KEY" in the /javascript code file')
        return;

    }
    // Construct the fulll Api using Template Literals
    const url = `${BASE_URL} ?q=${city}& appid=${API_KEY}&units=metric`;
    showMessage('Loading weather data...')
    try {
        // 1 Use etch to make the HTTP request
        const response = await fetch(url);
        // 2 Convert the response stream to a JSON
        const data = await response.json();
        // Check for HTTP error
        if (!response.ok) {
            // Access the message property in the error JsON
            showMessage(`show Error:${data.message || 'city not found '}`, true);
            return;

        }
        displayWeather(data);

    }catch (error){
        console.error('Network or parsing error:',error)
        showMessage('An unexpected error occurred. Please try again later.')
    }
}
// Event listener
function handleSearch(event){
    // prevent the default form submission behaviour
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city){
        // call the async function
        fetchWeather(city);

    }else {
        showMessage('Please enter a city name');
    }
}
// Attach the function to the search button
searchButton.addEventListener("keypress", (e)=>{
    cityInput.addEventListener("keypress", (e)=>{
        if (e.key === 'Enter'){
            handleSearch(e)
        }
    })
})