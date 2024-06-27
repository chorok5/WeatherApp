package com.pj.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pj.web.entity.WeatherNews;

public interface WeatherNewsRepository extends JpaRepository<WeatherNews, Long> {

}
