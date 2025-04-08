package edu.dcu.moheng.springtest1.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    private static final String API_URL = "https://api.open-meteo.com/v1/forecast";
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:00");

    public static class WeatherResult {
        public final String weatherText;
        public final double temperature;

        public WeatherResult(String weatherText, double temperature) {
            this.weatherText = weatherText;
            this.temperature = temperature;
        }
    }

    public WeatherResult getWeather(double latitude, double longitude, LocalDateTime datetime) {
        // 시간 범위 설정 (1시간 단위)
        String time = datetime.format(FORMATTER);

        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("latitude", latitude)
                .queryParam("longitude", longitude)
                .queryParam("hourly", "temperature_2m,weathercode")
                .queryParam("start", time)
                .queryParam("end", time)
                .queryParam("timezone", "Asia/Seoul")
                .build()
                .toUriString();

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        if (response == null || !response.containsKey("hourly")) {
            throw new RuntimeException("날씨 정보 불러오기 실패");
        }

        Map<String, List<?>> hourly = (Map<String, List<?>>) response.get("hourly");

        List<Integer> weathercodes = (List<Integer>) hourly.get("weathercode");
        List<Double> temperatures = (List<Double>) hourly.get("temperature_2m");

        int code = weathercodes.get(0);
        double temp = temperatures.get(0);

        return new WeatherResult(weatherCodeToText(code), temp);
    }

    private String weatherCodeToText(int code) {
        return switch (code) {
            case 0 -> "맑음";
            case 1, 2, 3 -> "부분 흐림";
            case 45, 48 -> "안개";
            case 51, 53, 55 -> "이슬비";
            case 61, 63, 65 -> "비";
            case 71, 73, 75 -> "눈";
            case 80, 81, 82 -> "소나기";
            case 95 -> "뇌우";
            default -> "기타";
        };
    }
}
