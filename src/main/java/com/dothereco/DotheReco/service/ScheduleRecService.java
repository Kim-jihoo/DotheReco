package com.dothereco.DotheReco.service;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleRecService {
    public List<TimeRange> recommendTimeSlots(List<TimeRange> busySlots, Duration expectedDuration){
        List<TimeRange> recommendedSlots = new ArrayList<>();
        LocalTime dayStart = LocalTime.of(0,0);
        LocalTime dayEnd = LocalTime.of(23, 59);

        busySlots.sort((o1, o2) -> o1.getStartTime().compareTo(o2.getStartTime()));

        LocalTime lastEnd = dayStart;
        for (TimeRange slot : busySlots){
            Duration gap = Duration.between(lastEnd, slot.getStartTime());
            if(!gap.minus(expectedDuration).isNegative()){
                recommendedSlots.add(new TimeRange(lastEnd, slot.getStartTime()));
            }
            lastEnd = slot.getEndTime();
        }
        if(Duration.between(lastEnd, dayEnd).plusMinutes(1).compareTo(expectedDuration)>=0){
            recommendedSlots.add(new TimeRange(lastEnd, dayEnd));
        }

        return recommendedSlots;
    }
}
