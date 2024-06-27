package com.pj.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pj.web.entity.Forecast;

public interface ForecastRepository extends JpaRepository<Forecast, Long> {

}
