const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityinput");
const card = document.querySelector(".card");

const apiKey = "88bb44b818bca585fdc23d72213ab5f3";

weatherForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityInput.value.trim();

    if(city === ""){
        displayError("Please enter a city");
        return;
    }

    try{

        const weatherData = await getWeatherData(city);

        displayWeatherInfo(weatherData);

    }
    catch(error){

        console.error(error);

        displayError("Could not fetch weather data");

    }

});

async function getWeatherData(city){

    const apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();

}

function displayWeatherInfo(data){

    const {
        name: city,
        main: {temp, humidity},
        weather: [{id, description}]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp.toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("citydisplay");
    tempDisplay.classList.add("tempdisplay");
    humidityDisplay.classList.add("Humiditydisplay");
    descDisplay.classList.add("descdisplay");
    weatherEmoji.classList.add("weatheremoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){

    switch(true){

        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";

        case(weatherId >= 300 && weatherId < 500):
            return "🌦️";

        case(weatherId >= 500 && weatherId < 600):
            return "🌧️";

        case(weatherId >= 600 && weatherId < 700):
            return "❄️";

        case(weatherId >= 700 && weatherId < 800):
            return "🌫️";

        case(weatherId === 800):
            return "☀️";

        case(weatherId >= 801 && weatherId < 810):
            return "☁️";

        default:
            return "❓";

    }

}

function displayError(message){

    card.textContent = "";
    card.style.display = "flex";

    const errorDisplay = document.createElement("p");

    errorDisplay.textContent = message;
    errorDisplay.classList.add("errordisplay");

    card.appendChild(errorDisplay);

}