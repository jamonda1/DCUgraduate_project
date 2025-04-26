package edu.dcu.moheng.springtest1.repository;

import edu.dcu.moheng.springtest1.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * 일정 정보를 관리하는 JPA 레포지토리
 */
@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // 사용자별 일정 조회
    List<Schedule> findByUserId(Long userId);

    // 특정 날짜의 사용자 일정 조회
    List<Schedule> findByUserIdAndDate(Long userId, LocalDate date);

    // 일정 시간 겹침 체크 (예: 시작/끝 사이에 있는 다른 일정들)
    List<Schedule> findByUserIdAndDateAndStartTimeLessThanAndEndTimeGreaterThan(
            Long userId, LocalDate date, java.time.LocalTime endTime, java.time.LocalTime startTime
    );
}

