package com.example.mohangpj.scheduleapp.controller;

import com.example.mohangpj.scheduleapp.entity.Schedule;
import com.example.mohangpj.scheduleapp.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * 🌐 일정 관리 API Controller
 */
@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins = "*")
public class ScheduleController {

    @Autowired
    private ScheduleRepository repo;

    /**
     * ✅ 사용자 가정의 일정 등록
     */
    @PostMapping
    public Object addSchedule(@RequestBody Schedule schedule) {
        List<Schedule> overlapping = repo.findByUserIdAndDateAndStartTimeLessThanAndEndTimeGreaterThan(
                schedule.getUserId(),
                schedule.getDate(),
                schedule.getEndTime(),
                schedule.getStartTime()
        );

        if (!overlapping.isEmpty()) {
            return "❌ 같은 시간대에 기존 일정이 존재합니다.";
        }

        return repo.save(schedule);
    }

    /**
     * 🗓 일정 조회 (userId + date)
     */
    @GetMapping
    public List<Schedule> getSchedules(@RequestParam Long userId, @RequestParam String date) {
        LocalDate parsedDate = LocalDate.parse(date); // String → LocalDate
        return repo.findByUserIdAndDate(userId, parsedDate);
    }

    /**
     * ✏️ 일정 수정 (userId + 같은 시간과 결침 체크)
     */
    @PutMapping("/{id}")
    public Object updateSchedule(@PathVariable Long id, @RequestBody Schedule updated) {
        Schedule existing = repo.findById(id).orElseThrow();

        List<Schedule> overlapping = repo.findByUserIdAndDateAndStartTimeLessThanAndEndTimeGreaterThan(
                updated.getUserId(),
                updated.getDate(),
                updated.getEndTime(),
                updated.getStartTime()
        );

        overlapping.removeIf(s -> s.getId().equals(id));

        if (!overlapping.isEmpty()) {
            return "❌ 수정하려는 시간대에 같은 일정이 존재합니다.";
        }

        existing.setTitle(updated.getTitle());
        existing.setStartTime(updated.getStartTime());
        existing.setEndTime(updated.getEndTime());

        return repo.save(existing);
    }

    /**
     * 🗑 일정 삭제
     */
    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
