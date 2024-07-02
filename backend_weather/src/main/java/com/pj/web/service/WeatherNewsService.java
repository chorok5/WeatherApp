package com.pj.web.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import com.pj.web.entity.WeatherNews;

@Service
public class WeatherNewsService {

    private final String NewsUrl = "https://www.hkbs.co.kr/news/articleList.html?sc_sub_section_code=S2N5&view_type=sm";

    public List<WeatherNews> getAllWeatherNews() throws IOException  {
        List<WeatherNews> newsList = new ArrayList<>();
        Document document = Jsoup.connect(NewsUrl)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")
                .get();
        org.jsoup.select.Elements contents = document.select("section ul.type2 li");

        for (Element content : contents) {
            String image = content.select("a.thumb img").attr("abs:src");
            String title = content.select("h4.titles a").text();
            String url = content.select("h4.titles a").attr("abs:href");
            String summary = content.select("p.lead").text();

            WeatherNews weatherNews = WeatherNews.builder()
                    .image(image)
                    .title(title)
                    .url(url)
                    .summary(summary)
                    .build();
            newsList.add(weatherNews);
        }


        return newsList;
    }
}
