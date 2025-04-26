package edu.dcu.moheng.springtest1.controller;

import edu.dcu.moheng.springtest1.dto.PlaceDto;
import edu.dcu.moheng.springtest1.service.PlaceService;
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
    public Map<String, PlaceDto> getRecommendedPlaces(@RequestParam String query) { // HTTP GET 요청을 받음
        Map<String, PlaceDto> result = new HashMap<>(); // 추천 결과를 result에 담음

        PlaceDto place = placeService.getRandomPlace(query, "tourist_attraction");  // 추천 검색어를 기반으로 명소 카테고리에서 랜덤 장소 추천
        if (place == null) {
            place = placeService.getRandomPlace(query, "point_of_interest");        // 추천 장소가 없으면, 다른 관점으로 다시 추천
        }
        PlaceDto food = placeService.getRandomPlace(query, "restaurant");   // 마찬가지로 음식점 검색
        PlaceDto etc = placeService.getRandomPlace(query, "store");         // 가게 검색

        result.put("places", place);    // 결과값 저장
        result.put("foods", food);
        result.put("etc", etc);

        return result;
    }
}