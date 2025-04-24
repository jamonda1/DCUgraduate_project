package com.example.mohangpj.scheduleapp.controller;

import com.example.mohangpj.scheduleapp.dto.PlaceDto;
import com.example.mohangpj.scheduleapp.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 사용자로부터 장소 검색어를 받아 추천 장소 3가지를 제공하는 컨트롤러
 */
@RestController
@RequestMapping("/api/ai-schedule")
public class ScheduleAiController {

    @Autowired
    private PlaceService placeService;

    @GetMapping
    public Map<String, PlaceDto> getRecommendedPlaces(@RequestParam String query) {
        Map<String, PlaceDto> result = new HashMap<>();

        PlaceDto place = placeService.getRandomPlace(query, "tourist_attraction");
        if (place == null) {
            place = placeService.getRandomPlace(query, "point_of_interest");
        }
        PlaceDto food = placeService.getRandomPlace(query, "restaurant");
        PlaceDto etc = placeService.getRandomPlace(query, "store");

        result.put("places", place);
        result.put("foods", food);
        result.put("etc", etc);

        return result;
    }
}
