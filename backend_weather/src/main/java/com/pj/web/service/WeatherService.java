package com.pj.web.service;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.pj.web.entity.Forecast;
import com.pj.web.entity.ForecastItem;
import com.pj.web.entity.Weather;
import com.pj.web.repository.ForecastRepository;
import com.pj.web.repository.WeatherRepository;

@Service
public class WeatherService {

	@Autowired
	private WeatherRepository weatherRepository;

	@Autowired
	private ForecastRepository forecastRepository;

	@Autowired
	private RestTemplate restTemplate;

	@Value("${weather.api.key}")
	private String apiKey;

	@Value("${weather.api.url}")
	private String apiUrl;

	@Value("${forecast.api.url}")
	private String forecastUrl;

	public Weather getWeather(String city) {
		// URI를 동적으로 생성
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl).queryParam("q", city)
				.queryParam("lang", "kr").queryParam("units", "metric").queryParam("appid", apiKey);

		String url = builder.toUriString();

		try {
			ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				String result = response.getBody();
				JSONObject json = new JSONObject(result);
				JSONObject main = json.getJSONObject("main");
				JSONObject weatherObj = json.getJSONArray("weather").getJSONObject(0);

				Weather weather = new Weather();
				weather.setCity(city);
				weather.setTemperature(main.getDouble("temp"));
				weather.setHumidity(main.getInt("humidity"));
				weather.setDescription(weatherObj.getString("description"));

				return weather;
			} else {
				throw new RuntimeException("API returned status code: " + response.getStatusCodeValue());
			}
		} catch (Exception e) {
			throw new RuntimeException("Failed to fetch weather data for city: " + city + ". Error: " + e.getMessage());
		}
	}

	public Forecast getForecast(String city) {
        // URI를 동적으로 생성
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(forecastUrl)
                .queryParam("q", city)
//                .queryParam("lang", "kr")
                .queryParam("units", "metric")
                .queryParam("appid", apiKey);

        String url = builder.toUriString();

        try {
        	ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            
        	if (response.getStatusCode() == HttpStatus.OK) {
                String result = response.getBody();
                JSONObject json = new JSONObject(result);
                JSONArray forecastList = json.getJSONArray("list");

                Forecast forecast = new Forecast();
                forecast.setCity(city);
                forecast.setList(new ArrayList<>()); // 예보 리스트 초기화

                // 5일치 예보 데이터 설정
                for (int i = 0; i < forecastList.length(); i++) {
                    JSONObject forecastData = forecastList.getJSONObject(i);
                    JSONObject main = forecastData.getJSONObject("main");
                    JSONArray weatherArray = forecastData.getJSONArray("weather");
                    JSONObject weatherObj = weatherArray.getJSONObject(0);

                    // 각 시간대의 예보 정보를 ForecastItem 객체에 저장
                    ForecastItem item = new ForecastItem();
                    item.setDate(forecastData.getString("dt_txt")); // 날짜 정보 추가
                    item.setTemperature(main.getDouble("temp"));
                    item.setHumidity(main.getDouble("humidity"));
                    item.setDescription(weatherObj.getString("description"));

                    forecast.getList().add(item); // 예보 리스트에 추가
                }
            return forecast;
            
            } else {
                throw new RuntimeException("API returned status code: " + response.getStatusCodeValue());
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch forecast data for city: " + city + ". Error: " + e.getMessage());
        }
    }
}