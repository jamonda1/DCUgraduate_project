package com.example.mohangpj.scheduleapp.service;

import com.example.mohangpj.scheduleapp.dto.PlaceDto;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

/**
 * Google Places API를 통해 랜덤 장소 추천을 수행하는 서비스
 */
@Service
public class PlaceService {

    @Value("${google.places.api-key}")
    private String googleApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public PlaceDto getRandomPlace(String keyword, String type) {
        String url = String.format(
                "https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s&language=ko&type=%s&key=%s",
                keyword, type, googleApiKey);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        JSONObject json = new JSONObject(response.getBody());
        JSONArray results = json.getJSONArray("results");

        if (results.isEmpty()) return null;

        JSONObject place = results.getJSONObject(new Random().nextInt(results.length()));
        String name = place.optString("name");
        String address = place.optString("formatted_address");
        JSONObject location = place.getJSONObject("geometry").getJSONObject("location");
        double lat = location.getDouble("lat");
        double lng = location.getDouble("lng");

        return new PlaceDto(name, null, address, lat, lng);
    }
}
