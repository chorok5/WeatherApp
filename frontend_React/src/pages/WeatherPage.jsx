import React from 'react'
import { useLocation } from 'react-router-dom';
import { WeatherSvg } from "weather-icons-animated";

const WeatherPage = () => {
  const location = useLocation();
  const { weather } = location.state || {};

  const getWeatherIcon = (description) => {

    console.log("Matching case:", description);

    switch (description) {
      case 'thunderstorm with light rain':
      case 'thunderstorm with rain':
      case 'thunderstorm with heavy rain':
      case 'light thunderstorm':
      case 'thunderstorm':
      case 'heavy thunderstorm':
      case 'ragged thunderstorm':
      case 'thunderstorm with light drizzle':
      case 'thunderstorm with drizzle':
      case 'thunderstorm with heavy drizzle':
        return 'thunderstorm';
      case 'light intensity drizzle':
      case 'drizzle':
      case 'heavy intensity drizzle':
      case 'light intensity drizzle rain':
      case 'drizzle rain':
      case 'heavy intensity drizzle rain':
      case 'shower rain and drizzle':
      case 'heavy shower rain and drizzle':
      case 'shower drizzle':
        return 'drizzle';
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'extreme rain':
      case 'freezing rain':
      case 'light intensity shower rain':
      case 'shower rain':
      case 'heavy intensity shower rain':
      case 'ragged shower rain':
        return 'rainy';
      case 'light snow':
      case 'snow':
      case 'heavy snow':
      case 'light shower snow':
      case 'shower snow':
      case 'heavy shower snow':
        return 'snowy';
      case 'sleet':
      case 'light shower sleet':
      case 'shower sleet':
      case 'light rain and snow':
      case 'rain and snow':
        return 'snowy-rainy';
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'sand/dust whirls':
      case 'fog':
      case 'sand':
      case 'dust':
      case 'volcanic ash':
      case 'squalls':
      case 'tornado':
        return 'fog';
      case 'few clouds':
        return 'partlycloudy';
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return 'cloudy';
      default:
        return 'sunny';
    }
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Weather Details</h1>
      {weather ? (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-2">Weather for {weather.city}</h2>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
            <WeatherSvg state={getWeatherIcon(weather.description)} className="h-24 w-24 mr-2"/>
              
              <div>
                <p className="text-lg font-semibold">{weather.description}</p>
                <p className="text-gray-500">Temperature: {weather.temperature} °C</p>
                <p className="text-gray-500">Humidity: {weather.humidity} %</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No weather data available. Please go back and enter a city.</p>
      )}
    </div>
  );
};

export default WeatherPage;