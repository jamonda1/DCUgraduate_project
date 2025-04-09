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

    private static final String API_URL = "https://api.open-meteo.com/v1/forecast";                         // open-meteo 주소
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:00");   // 요청에 필요한 날짜와 시간

    public static class WeatherResult {     // 날씨 정보를 하나로 묶어서 반환하기 위한 class
        public final String weatherText;    // 날씨의 상태를 저장(맑음, 비 등)
        public final double temperature;    // 그 날의 온도를 저장

        public WeatherResult(String weatherText, double temperature) {  // 객체를 만들 때 날씨와 온도값을 전달받고 각각의 필드에 저장
            this.weatherText = weatherText;
            this.temperature = temperature;
        }
    }

    public WeatherResult getWeather(double latitude, double longitude, LocalDateTime datetime) {    // 위도 경도 시간을 전달받음
        // 시간 범위 설정 (1시간 단위)
        String time = datetime.format(FORMATTER);   // 시간을 2025-04-09T15:00 형태로 변환

        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("latitude", latitude)               // 위도
                .queryParam("longitude", longitude)             // 경도
                .queryParam("hourly", "temperature_2m,weathercode")
                .queryParam("start", time)                      // 시작 시간과
                .queryParam("end", time)                        // 끝나는 시간을 동일하게 해서 특정 시간의 데이터를 요청
                .queryParam("timezone", "Asia/Seoul")   // 시간의 기준은 서울
                .build()
                .toUriString();

        RestTemplate restTemplate = new RestTemplate();                             // HTTP 요청을 보내는 spring의 도구
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);   // GET 요청을 보낸 결과를 Map<String, Object> 형태로 받음

        if (response == null || !response.containsKey("hourly")) {  // 결과값이 null이면
            throw new RuntimeException("날씨 정보 불러오기 실패");        // 아래 메시지 출력
        }

        Map<String, List<?>> hourly = (Map<String, List<?>>) response.get("hourly");
                            /* hourly의 반환값 예시
                            "hourly": {
                                "time": ["2025-03-27T15:00"],
                                "temperature_2m": [13.2],
                                "weathercode": [3]
                            }
                            */
        List<Integer> weathercodes = (List<Integer>) hourly.get("weathercode");     // 응답에서 날씨 코드 추출
        List<Double> temperatures = (List<Double>) hourly.get("temperature_2m");    // 응답에서 온도 추출

        int code = weathercodes.get(0);     // 날씨 코드는 응답 리스트의 날씨 부분 첫 번째 배열에 있어서 0
        double temp = temperatures.get(0);  // 온도 코드는 온도 부분의 첫 번쨰 배열에 있어서 0

        return new WeatherResult(weatherCodeToText(code), temp);    // 날씨 코드를 아래 switch 문을 통해 문자로 변환한 후 온도와 함께 리턴
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
