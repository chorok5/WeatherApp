import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(null);
    const navigate = useNavigate();

    const fetchWeather = async () => {
        if(!city){
            setError('Please enter a city name.');
            return;
        }
    
        try {
            const response = await axios.get(`/api/${city}`);
            const weatherData = response.data;
            setError(null);
    
            setWeather(weatherData); // 올바른 변수 weatherData를 전달해야 합니다.
            navigate('/weather', { state: { weather: weatherData } });
        } catch (err) {
            setError('Error fetching weather data. Please try again.');
        }
    };
    

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Weather App</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="border p-2 mr-2"
                />
                <button onClick={fetchWeather} className="bg-blue-500 text-white p-2 rounded">Get Weather</button>
            </div>

        </div>
    );
}

export default Home;
