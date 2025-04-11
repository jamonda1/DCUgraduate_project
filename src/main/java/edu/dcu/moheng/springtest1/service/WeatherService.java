package edu.dcu.moheng.springtest1.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service    // 비즈니스 로직을 처리하는 비즈니스 게층, 이 클래스는 빈이 되어 스프링 컨테이너가 생성/관리/주입
public class WeatherService {

    private static final String API_URL = "https://archive-api.open-meteo.com/v1/archive";          // open-meteo 주소
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // API의 조건에 맞는 날짜로 설정

    public static class WeatherResult {     // 날씨 API의 결과를 담는 컨테이너. 날씨와 온도값을 하나로 묶어준다.
        public final String weatherText;    // 날씨
        public final double temperature;    // 온도

        public WeatherResult(String weatherText, double temperature) {  // new WeatherResult를 통해 ("맑음", 20.1)처럼 객체 생성 가능
            this.weatherText = weatherText; // String weatherText에 weatherText 값을 삽입
            this.temperature = temperature; // 마찬가지
        }
    }

    public WeatherResult getWeather(double latitude, double longitude, LocalDateTime dateTime) {    // API를 호출해서 필요 정보를 받아오는 메소드
        String dateStr = dateTime.format(DATE_FORMAT);  // 전달받은 시간에서 시간은 버리고 날짜만 뽑아서 dateStr에 저장

        String url = UriComponentsBuilder.fromHttpUrl(API_URL)                    // API에 요청을 보내기 위한 정보들
                .queryParam("latitude", latitude)                           // 위도
                .queryParam("longitude", longitude)                         // 경도
                .queryParam("start_date", dateStr)                          // 시작 날짜
                .queryParam("end_date", dateStr)                            // 끝 날짜(당일의 날씨가 필요하기 때문에 시작과 같음)
                .queryParam("hourly", "temperature_2m,weathercode") // 매 시간의 시간별 온도와 날씨 상태
                .queryParam("timezone", "Asia/Seoul")               // 이미지 시간의 기준은 서울
                .build()                                                          // 해당 내용으로 빌드
                .toUriString();                                                   // 빌드된 내용을 String으로 open-meteo에 전달

        RestTemplate restTemplate = new RestTemplate();                           // Spring에 HTTP 요청을 보낼 수 있게 해주는 객체
        Map<String, Object> response = restTemplate.getForObject(url, Map.class); // GET 요청을 보내, JSON 응답을 받아서 response에 저장

        if (response == null || !response.containsKey("hourly")) {  // 응답 데이터가 없다면
            throw new RuntimeException("날씨 데이터 없음");             // 메시지 출력
        }

        Map<String, List<?>> hourly = (Map<String, List<?>>) response.get("hourly");    // 매 시간의 날씨 정보 리스트 정리
        List<String> times = (List<String>) hourly.get("time");                         // 시간 리스트
        List<Double> temps = (List<Double>) hourly.get("temperature_2m");               // 온도 리스트
        List<Integer> codes = (List<Integer>) hourly.get("weathercode");                // 날씨 코드 리스트

        int closestIndex = findClosestIndex(times, dateTime);       // 시간 리스트 중에서 촬영 시간과 가장 가까운 시간을 closesIndex에 저장

        double temp = temps.get(closestIndex);                      // 그 시간의 온도
        int code = codes.get(closestIndex);                         // 그 시간의 날씨 코드

        return new WeatherResult(weatherCodeToText(code), temp);    // weatherCodeToText에 날씨 코드를 전달해서 switch문으로 문자로 변환 후 온도와 함께 리턴
    }

    private int findClosestIndex(List<String> timeList, LocalDateTime target) { // 요청 시간에서 가장 가까운 시간을 찾기 위한 메소드
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        int closestIdx = 0;
        long minDiff = Long.MAX_VALUE;

        for (int i = 0; i < timeList.size(); i++) {
            LocalDateTime time = LocalDateTime.parse(timeList.get(i), formatter);
            long diff = Math.abs(java.time.Duration.between(target, time).toMinutes());

            if (diff < minDiff) {
                minDiff = diff;
                closestIdx = i;
            }
        }
        return closestIdx;
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
