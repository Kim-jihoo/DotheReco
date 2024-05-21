package com.dothereco.DotheReco.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class UnfixedScheduleDTO {
    private String unfixedTitle;
    private LocalDate scheduleDate;
    private LocalTime unfixedTime;
    private LocalDate unfixedDeadline;
    private Integer unfixedImportance =3;
    private String unfixedMemo;
    private Boolean reminderMark;
    private Long categoryId;
    private Long placeId;

}
