package com.dothereco.DotheReco.controller;

import com.dothereco.DotheReco.service.FixedScheduleService;
import com.dothereco.DotheReco.service.ScheduleRecService;
import com.dothereco.DotheReco.service.TimeRange;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/time")
@CrossOrigin(origins = "http://localhost:3000")
public class TimeRecommendationController {
    private final FixedScheduleService fixedScheduleService;
    private final ScheduleRecService scheduleRecService;

    public TimeRecommendationController(FixedScheduleService fixedScheduleService, ScheduleRecService scheduleRecService) {
        this.fixedScheduleService = fixedScheduleService;
        this.scheduleRecService = scheduleRecService;
    }
    /*
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
    }*/
    @PostMapping("/recommend")
    public ResponseEntity<List<Map<String, Object>>> recommendTimeSlots(
            @RequestBody Map<String, Object> request) {

        List<String> dates = (List<String>) request.get("dates");
        Duration expectedDuration = Duration.parse((String) request.get("expectedDuration"));

        List<Map<String, Object>> recommendedSlots = scheduleRecService.recommendTimeSlotsForMultipleDates(dates, expectedDuration);
        return ResponseEntity.ok(recommendedSlots);
    }


}
