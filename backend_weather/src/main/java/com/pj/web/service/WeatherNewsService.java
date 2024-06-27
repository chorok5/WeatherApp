package com.pj.web.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.lang.model.util.Elements;

import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.pj.web.entity.WeatherNews;

@Service
public class WeatherNewsService {

    @Value("${naver.client.id}")
    private String clientId;

    @Value("${naver.client.secret}")
    private String clientSecret;

    private final String newsUrl = "https://www.hkbs.co.kr/news/articleList.html?sc_sub_section_code=S2N5&view_type=sm";

    public List<WeatherNews> getAllWeatherNews() throws IOException {
        List<WeatherNews> newsList = new ArrayList<>();
        Document document = Jsoup.connect(newsUrl).get();
        Elements contents = document.select("section ul.type2 li");

        for (Element content : contents) {
            WeatherNews weatherNews = WeatherNews.builder()
                    .image(content.select("a img").attr("abs:src")) // 이미지
                    .subject(content.select("h4 a").text())        // 제목
                    .url(content.select("a").attr("abs:href"))      // 링크
                    .build();
            newsList.add(weatherNews);
        }
}
