package com.pj.web.service;

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
        // URI를 동적으로 생성
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("q", city)
                .queryParam("lang", "kr")
                .queryParam("units", "metric")
                .queryParam("appid", apiKey);

        String url = builder.toUriString();

        try {
            // API 호출
            String result = restTemplate.getForObject(url, String.class);

            // 이미 저장된 Weather 정보가 있는지 확인
            Weather weather = weatherRepository.findByCity(city);
            if (weather != null) {
                return weather;
            }

            // JSON 파싱
            JSONObject json = new JSONObject(result);
            JSONObject main = json.getJSONObject("main");
            JSONObject weatherObj = json.getJSONArray("weather").getJSONObject(0);

            // Weather 객체 생성 및 설정
            weather = new Weather(); 

            // Weather 객체 저장
            weatherRepository.save(weather);
	
            // 생성된 엔티티의 ID 가져오기 (return 전에 가져와야 합니다)
            Long id = weather.getId(); 

            return weather;
        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch weather data for city: " + city);
        }
    }
}