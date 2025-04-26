package edu.dcu.moheng.springtest1.controller;

import edu.dcu.moheng.springtest1.entity.Schedule;
import edu.dcu.moheng.springtest1.entity.User;
import edu.dcu.moheng.springtest1.jwt.JwtUtil;
import edu.dcu.moheng.springtest1.repository.ScheduleRepository;
import edu.dcu.moheng.springtest1.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins = "*")
public class ScheduleController {   // 일정 등록, 조회, 수정, 삭제하는 컨트롤러

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public ScheduleController(ScheduleRepository scheduleRepository, UserRepository userRepository, JwtUtil jwtUtil) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    /**
     * ✅ 일정 등록
     */
    @PostMapping
    public ResponseEntity<?> addSchedule(@RequestBody Schedule schedule,
                                         @RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        schedule.setUserId(userId);

        List<Schedule> overlapping = scheduleRepository
                .findByUserIdAndDateAndStartTimeLessThanAndEndTimeGreaterThan(
                        userId, schedule.getDate(), schedule.getEndTime(), schedule.getStartTime());

        if (!overlapping.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "같은 시간대에 일정이 존재합니다."
            ));
        }

        Schedule saved = scheduleRepository.save(schedule);
        return ResponseEntity.ok(saved);
    }

    /**
     * 📅 일정 조회 (토큰 기반)
     */
    @GetMapping
    public List<Schedule> getSchedules(@RequestParam String date,
                                       @RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        LocalDate parsedDate = LocalDate.parse(date);
        return scheduleRepository.findByUserIdAndDate(userId, parsedDate);
    }

    /**
     * ✏️ 일정 수정
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable Long id,
                                            @RequestBody Schedule updated,
                                            @RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        Schedule existing = scheduleRepository.findById(id).orElseThrow();

        List<Schedule> overlapping = scheduleRepository
                .findByUserIdAndDateAndStartTimeLessThanAndEndTimeGreaterThan(
                        userId, updated.getDate(), updated.getEndTime(), updated.getStartTime());

        // 자기 자신 제외
        overlapping.removeIf(s -> s.getId().equals(id));

        if (!overlapping.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "❌ 수정하려는 시간대에 같은 일정이 존재합니다."
            ));
        }

        existing.setTitle(updated.getTitle());
        existing.setStartTime(updated.getStartTime());
        existing.setEndTime(updated.getEndTime());
        existing.setAddress(updated.getAddress());
        existing.setLat(updated.getLat());
        existing.setLng(updated.getLng());
        existing.setCategory(updated.getCategory());

        Schedule saved = scheduleRepository.save(existing);
        return ResponseEntity.ok(saved);
    }

    /**
     * 🗑 일정 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id,
                                            @RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        Schedule schedule = scheduleRepository.findById(id).orElseThrow();

        if (!schedule.getUserId().equals(userId)) {
            return ResponseEntity.status(403).body("권한이 없습니다.");
        }

        scheduleRepository.deleteById(id);
        return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "✅ 일정이 삭제되었습니다."
        ));
    }

    /**
     * ✅ JWT 토큰에서 사용자 ID 추출
     */
    private Long extractUserId(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.getEmailFromToken(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        return user.getId();
    }
}
