package edu.dcu.moheng.springtest1.service;

import edu.dcu.moheng.springtest1.dto.PlaceDto;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@Service
public class PlaceService { // Google Places API를 통해 랜덤 장소를 추천

    @Value("${google.places.api-key}")  // Google Places API 키
    private String googleApiKey;                       // 해당 키를 googleApiKey에 저장

    private final RestTemplate restTemplate = new RestTemplate();   // Google Places API에 HTTP 요청을 보낼 때 사용

    public PlaceDto getRandomPlace(String keyword, String type) {   // 다른 클래스에서 키워드와 장소 타입을 받아와서 url에 사용
        String url = String.format(                                 // 키워드와 장소 타입을 사용하여 요청 url 생성
                "https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s&language=ko&type=%s&key=%s",
                keyword, type, googleApiKey);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class); // url로 GET 요청을 보내고
        JSONObject json = new JSONObject(response.getBody());   // 응답 본문을 파싱(구조 해석)
        JSONArray results = json.getJSONArray("results");  // 장소 검색 결과 배열로 정렬

        if (!"OK".equals(json.optString("status"))) {      // 응답 결과가 OK가 아닐 경우 예외
            throw new RuntimeException("Google API 에러: " + json.optString("status"));
        }

        JSONObject place = results.getJSONObject(new Random().nextInt(results.length()));   // 검색된 장소들 중 하나를 랜덤으로 선택
        String name = place.optString("name");                                         // 장소의 이름
        String address = place.optString("formatted_address");                         // 장소의 주소
        JSONObject location = place.getJSONObject("geometry").getJSONObject("location");    // 위도 경도가 들어있는 객체
        double lat = location.getDouble("lat");                                        // 객체에서 위도와
        double lng = location.getDouble("lng");                                        // 경도값 추출

        return new PlaceDto(name, null, address, lat, lng);                      // DTO에 이름과 주소, 위도, 경도 반환
    }
}

