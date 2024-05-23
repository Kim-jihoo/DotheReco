package com.dothereco.DotheReco.service;

import com.dothereco.DotheReco.domain.TimeBlock;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScheduleRecService {
    private final FixedScheduleService fixedScheduleService;

    public ScheduleRecService(FixedScheduleService fixedScheduleService) {
        this.fixedScheduleService = fixedScheduleService;
    }

    public List<Map<String, Object>> recommendTimeSlotsForMultipleDates(List<String> dates, Duration expectedDuration) {
        List<Map<String, Object>> recommendedSlots = new ArrayList<>();

        for (String dateString : dates) {
            LocalDate date = LocalDate.parse(dateString);
            List<TimeBlock> busySlots = fixedScheduleService.getBusyTimeSlots(date);
            List<TimeBlock> availableSlots = recommendTimeSlots(busySlots, expectedDuration, date);

            for (TimeBlock slot : availableSlots) {
                Map<String, Object> slotMap = new HashMap<>();
                slotMap.put("date", slot.getTbDate());
                slotMap.put("startTime", slot.getTbStartTime());
                slotMap.put("endTime", slot.getTbEndTime());
                recommendedSlots.add(slotMap);
            }
        }

        return recommendedSlots;
    }

    public List<TimeBlock> recommendTimeSlots(List<TimeBlock> busySlots, Duration expectedDuration, LocalDate currentDate) {
        List<TimeBlock> recommendedSlots = new ArrayList<>();
        LocalTime dayStart = LocalTime.of(7, 0); //7시까지 추천 x
        LocalTime dayEnd = LocalTime.of(23, 59);
        LocalDate nextDate = currentDate.plusDays(1);

        busySlots.sort((o1, o2) -> o1.getTbStartTime().compareTo(o2.getTbStartTime()));

        LocalTime lastEnd = dayStart;
        for (TimeBlock slot : busySlots) {
            if (lastEnd.isBefore(slot.getTbStartTime())) {
                Duration gap = Duration.between(lastEnd, slot.getTbStartTime());
                while (gap.compareTo(expectedDuration) >= 0) {
                    recommendedSlots.add(createTimeBlock(currentDate, lastEnd, lastEnd.plus(expectedDuration)));
                    lastEnd = lastEnd.plus(expectedDuration);
                    gap = Duration.between(lastEnd, slot.getTbStartTime());
                }
            }
            if (lastEnd.isBefore(slot.getTbEndTime())) {
                lastEnd = slot.getTbEndTime();
            }
        }

        if (lastEnd.isBefore(dayEnd)) {
            Duration gap = Duration.between(lastEnd, dayEnd);
            while (gap.compareTo(expectedDuration) >= 0) {
                recommendedSlots.add(createTimeBlock(currentDate, lastEnd, lastEnd.plus(expectedDuration)));
                lastEnd = lastEnd.plus(expectedDuration);
                gap = Duration.between(lastEnd, dayEnd);
            }
        }

        // Check if there's a gap that extends to the next day
        if (lastEnd.isBefore(LocalTime.MIDNIGHT)) {
            Duration gap = Duration.between(lastEnd, LocalTime.MIDNIGHT);
            if (gap.compareTo(expectedDuration) >= 0) {
                recommendedSlots.add(createTimeBlock(currentDate, lastEnd, LocalTime.MIDNIGHT));
            } else {
                recommendedSlots.add(createTimeBlock(currentDate, lastEnd, LocalTime.MIDNIGHT));
                Duration remainingDuration = expectedDuration.minus(gap);
                if (!remainingDuration.isNegative() && !remainingDuration.isZero()) {
                    LocalTime nextStartTime = LocalTime.MIDNIGHT.plus(remainingDuration);
                    recommendedSlots.add(createTimeBlock(nextDate, LocalTime.MIDNIGHT, nextStartTime));
                }
            }
        }

        return recommendedSlots;
    }

    private TimeBlock createTimeBlock(LocalDate date, LocalTime startTime, LocalTime endTime) {
        TimeBlock timeBlock = new TimeBlock();
        timeBlock.setTbDate(date);
        timeBlock.setTbStartTime(startTime);
        timeBlock.setTbEndTime(endTime);
        return timeBlock;
    }
}
