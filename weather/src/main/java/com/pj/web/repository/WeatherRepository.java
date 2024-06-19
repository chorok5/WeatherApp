package com.pj.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pj.web.entity.Weather;

public interface WeatherRepository  extends JpaRepository<Weather, Long> {
	
	Weather findByCity(String city);
}
