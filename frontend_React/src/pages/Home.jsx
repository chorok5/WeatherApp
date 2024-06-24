import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { WeatherSvg } from "weather-icons-animated";

function Home() {
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(null);
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const fetchWeather = async () => {
        if (!city) {
            setError('Please enter a city name.');
            return;
        }

        try {
            const response = await axios.get(`/api/${city}`);
            const weatherData = response.data;
            setError(null);
            setWeather(weatherData);
            // navigate('/weather', { state: { weather: weatherData } });
        } catch (err) {
            setError('Error fetching weather data. Please try again.');
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/news');
                const newsData = response.data;
                setArticles(newsData);
            } catch (err) {
                console.error('Error fetching news data:', err);
            }
        };

        fetchNews();
    }, []);


    const getWeatherIcon = (description) => {
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
        <div className="p-6 flex">
            <div className="w-1/2 p-4">
                <h1 className="text-2xl font-bold mb-4">Weather App</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                        className="border p-2 mr-2"
                    />
                    <button onClick={fetchWeather} className="bg-blue-500 text-white p-2 rounded">
                        Get Weather
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {weather && (
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-3xl font-semibold mb-2">Weather for {weather.city}</h2>
                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                <WeatherSvg state={getWeatherIcon(weather.description)} className="h-24 w-24 mr-2" />
                                <div>
                                    <p className="text-lg font-semibold">{weather.description}</p>
                                    <p className="text-gray-500">Temperature: {weather.temperature} °C</p>
                                    <p className="text-gray-500">Humidity: {weather.humidity} %</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="w-1/2 p-4">
                <h1 className="text-2xl font-bold mb-4">기후 변화 뉴스</h1>
                {articles.length > 0 ? (
                    <ul>
                    {articles.map((article, index) => (
                        <li key={index} className="mb-4 flex">
                            <img src={article.image} alt={article.title} className="w-24 h-24 mr-4 object-cover" />
                            <div className="flex flex-col justify-between">
                                <h2 className="text-xl mt-2 font-semibold">{article.title}</h2>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mb-2">
                                    Read more
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
                ) : (
                    <p>Loading climate news...</p>
                )}
            </div>
        </div>
    );
}

export default Home;
