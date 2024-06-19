package com.pj.web.service;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.pj.web.entity.Weather;
import com.pj.web.repository.WeatherRepository;

@Service
public class WeatherService {

    @Autowired
    private WeatherRepository weatherRepository;
    
    @Autowired
    private RestTemplate restTemplate;

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;


    public Weather getWeather(String city) {
        Weather weather = weatherRepository.findByCity(city);
        if (weather == null) {
            String uri = UriComponentsBuilder.fromHttpUrl(apiUrl)
                    .queryParam("q", city)
                    .queryParam("appid", apiKey)
                    .queryParam("units", "metric")
                    .toUriString();

            String response = restTemplate.getForObject(uri, String.class);
            if (response != null) {
                JSONObject jsonObject = new JSONObject(response);
                weather = new Weather();
                weather.setCity(city);
                weather.setDescription(jsonObject.getJSONArray("weather").getJSONObject(0).getString("description"));
                weather.setTemperature(jsonObject.getJSONObject("main").getDouble("temp"));
                weather.setHumidity(jsonObject.getJSONObject("main").getInt("humidity"));
                weather.setWindSpeed(jsonObject.getJSONObject("wind").getDouble("speed"));
                weatherRepository.save(weather);
            }
        }
        return weather;
    }


//	public List<String> getCities() {
//		return weatherRepository.findAll().stream().map(Weather::getCity).toList();
//	}
}