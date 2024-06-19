package com.pj.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pj.web.entity.Weather;
import com.pj.web.service.WeatherService;

@RestController
@RequestMapping("/api")
public class WeatherController {

	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{city}")
    public ResponseEntity<Weather> getWeather(@PathVariable("city") String city) {
        Weather weather = weatherService.getWeather(city);
        if (weather != null) {
            return ResponseEntity.ok(weather);
        } else {
            return ResponseEntity.notFound().build();
        }
    }           
    
//    @GetMapping("/cities")
//    public List<String> getCities(){
//        List<String> cities = jdbcTemplate.queryForList("SELECT DISTINCT city FROM weather", String.class);
//        return cities;
//    }
}