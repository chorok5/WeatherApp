import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { WeatherSvg } from "weather-icons-animated";
import Topbar from './Topbar';

function Home() {
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const fetchWeather = async () => {
        if (!city) {
            setError('Please enter a city name.');
            return;
        }
        try {
            const weatherResponse = await axios.get(`/api/weather/${city}`);
            const forecastResponse = await axios.get(`/api/forecast/${city}`);

            const weatherData = weatherResponse.data;
            const forecastData = forecastResponse.data;

            setError(null);
            setWeather(weatherData);
            setForecast(forecastData);
            // navigate('/weather', { state: { weather: weatherData } });
        } catch (err) {
            setError('Error fetching weather data. Please try again.');
        }
    };

    useEffect(() => {

        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/news', { withCredentials: true });
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

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/login');
    };


    return (
        <div className='flex'>
            <Topbar handleSignup={handleSignup} handleLogin={handleLogin} />
            <div className="grid grid-cols-3 w-full">
                <div className="col-span-2 p-4">
                    <h1 className="text-2xl font-bold mb-4 mt-20">Weather App</h1>
                    {/* 날씨 검색 부분 */}
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
                    {/* 날씨 정보 표시 부분 */}
                    {error && <p className="text-red-500">{error}</p>}
                    {weather && (
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-3xl font-semibold mb-2">Weather for {weather.city}</h2>
                            <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                    <WeatherSvg state={getWeatherIcon(weather.description)} className="h-24 w-24 mr-2" />
                                    <div>
                                        <p className="text-lg font-semibold">{weather.description}</p>
                                        <p className="text-gray-500">기온 {weather.temperature} °C</p>
                                        <p className="text-gray-500">습도 {weather.humidity} %</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden">{console.log(weather.description)}</div>
                        </div>
                    )}
                    {/* 5일 예보 표시 부분 */}
                    {forecast && forecast.list && (
                        <div className="mt-8 bg-white p-8 rounded-lg shadow-md"> {/* Add mt-8 for spacing */}
                            <h2 className="text-3xl font-semibold mb-12">5 Day Forecast for {forecast.city}</h2>
                            <div className="grid grid-cols-5 gap-4">
                                {forecast.list.map((item, index) => (
                                    <div key={index} className="bg-gray-200 p-4 rounded-md">
                                        <p className="font-semibold">{item.date}</p>
                                        <WeatherSvg state={getWeatherIcon(item.description)} className="h-20 w-20 mr-2 pr-5" />
                                        <p>{item.description}</p>
                                        <p>{item.temperature} °C</p>
                                        <p>{item.humidity} %</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 기후 뉴스 표시 부분 */}
                <div className="col-span-1 p-4">
                    <h1 className="text-2xl font-bold mb-4 mt-20">기후 변화 뉴스</h1>
                    {articles.length > 0 ? (
                        <ul>
                            {articles.map((article, index) => (
                                <li key={index} className="mb-4 flex">
                                    <img src={article.image} alt={article.title} className="w-24 h-24 mr-4 object-cover" />
                                    <div className="flex flex-col justify-between">
                                        <h2 className="text-xl mt-2 font-semibold">{article.title}</h2>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mb-2">
                                            자세히 보기
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>기후 뉴스를 불러오는 중입니다...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
