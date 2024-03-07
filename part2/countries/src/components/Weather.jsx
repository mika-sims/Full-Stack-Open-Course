import React, { useState, useEffect } from "react";
import weatherService from "../../services/weather";

const Weather = ({ lat, lon, handleMessages }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await weatherService.getWeather(lat, lon);
        setWeatherData(data);
      } catch (error) {
        handleMessages("Error fetching weather data.", 5000);
      }
    };

    fetchData();
  }, [lat, lon, handleMessages]);

  return (
    <div>
      {weatherData ? (
        <>
          <p>Current weather: {weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} &#8451;</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
