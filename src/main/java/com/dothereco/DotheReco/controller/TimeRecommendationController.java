package com.dothereco.DotheReco.controller;

import com.dothereco.DotheReco.service.FixedScheduleService;
import com.dothereco.DotheReco.service.ScheduleRecService;
import com.dothereco.DotheReco.service.TimeRange;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/time")
public class TimeRecommendationController {
    private final FixedScheduleService fixedScheduleService;
    private final ScheduleRecService scheduleRecService;

    public TimeRecommendationController(FixedScheduleService fixedScheduleService, ScheduleRecService scheduleRecService) {
        this.fixedScheduleService = fixedScheduleService;
        this.scheduleRecService = scheduleRecService;
    }
    @GetMapping("/recommend")
    public ResponseEntity<List<TimeRange>> recommendTimeSlots(
            //@RequestParam("userId") Long userId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam("expectedDuration") Duration expectedDuration) {

        // 사용자의 바쁜 시간대 조회
        //List<TimeRange> busySlots = fixedScheduleService.getBusyTimeSlots(userId, date);
        List<TimeRange> busySlots = fixedScheduleService.getBusyTimeSlots(date);
        // 추천 가능한 시간대 계산
        List<TimeRange> recommendedSlots = scheduleRecService.recommendTimeSlots(busySlots, expectedDuration);
        return ResponseEntity.ok(recommendedSlots);
    }


}
