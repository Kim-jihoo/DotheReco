package com.dothereco.DotheReco.service;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class TimeRange {
    private LocalTime startTime;
    private LocalTime endTime;

    public TimeRange(LocalTime startTime, LocalTime endTime){
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public LocalTime getStartTime(){
        return startTime;
    }
    public LocalTime getEndTime(){
        return endTime;
    }
    public void setEndTime(LocalTime endTime){
        this.endTime = endTime;
    }

}
