package com.pj.web.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pj.web.entity.Forecast;
import com.pj.web.entity.Weather;
import com.pj.web.entity.WeatherNews;
import com.pj.web.service.WeatherNewsService;
import com.pj.web.service.WeatherService;

@RestController
@RequestMapping("/api")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

	@Autowired
	private WeatherNewsService weatherNewsService;
	
    @GetMapping("/weather/{city}")
    public ResponseEntity<Weather> getWeather(@PathVariable("city") String city) {
        Weather weather = weatherService.getWeather(city);
        if (weather != null) {
            return ResponseEntity.ok(weather);
        } else {
            return ResponseEntity.notFound().build();
        }
    }        
    
    @GetMapping("/forecast/{city}")
    public ResponseEntity<Forecast> getForecast(@PathVariable("city") String city) {
        try {
            Forecast forecast = weatherService.getForecast(city);
            return ResponseEntity.ok(forecast);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
	@GetMapping("/news")
	public ResponseEntity<List<WeatherNews>> getWeatherNews() throws IOException {
		List<WeatherNews> newsList = weatherNewsService.getAllWeatherNews();
		if (newsList != null && !newsList.isEmpty()) {
			return ResponseEntity.ok(newsList);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}