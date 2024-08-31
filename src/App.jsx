import { useState, useEffect } from "react";
import swal from "sweetalert";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [city, setCity] = useState("karachi");

  const apiKey = "9505fd1df737e20152fbd78cdb289b6a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

  useEffect(() => {
    if (city) {
      getWeather();
    }
  }, [city]);

  const getWeather = async () => {
    try {
      const response = await fetch(`${apiUrl}&q=${city}`);
      if (!city.trim()) {
        swal("Enter the location", "Please enter a location.", "warning");
        return;
      }
      const data = await response.json();
      if (response.ok) {
        setCurrentWeather(data);
      } else {
        swal("Error", "City not found. Please try another location.", "error");
      }
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };

  const temp = currentWeather?.main?.temp;
  const feelsLike = currentWeather?.main?.feels_like;
  const weatherCondition = currentWeather?.weather?.[0]?.main;
  const iconUrl = currentWeather?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`
    : "";

  const handleCityChange = (event) => {
    event.preventDefault();
    const cityInput = event.target.elements.cityName.value;
    if (cityInput) {
      setCity(cityInput);
    }
  };

  return (
    <div className="main">
      <h1>Weather App</h1>
      <div className="search">
        <form className="weatherForm" onSubmit={handleCityChange}>
          <input type="text" name="cityName" placeholder="Enter City Name" />
          <button type="submit">
            <img src="img/search.png" alt="Search" />
          </button>
        </form>
      </div>

      {currentWeather.main && (
        <div className="weather-info">
          <h2>Weather in {city}</h2>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{weatherCondition}</h2>
            <img src={iconUrl} alt={weatherCondition} className="w-12 h-12" />
          </div>
          <p>Temperature: {temp}°C</p>
          <p>Feels Like: {feelsLike}°C</p>
        </div>
      )}
    </div>
  );
}

export default App;
