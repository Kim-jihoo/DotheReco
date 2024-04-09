package com.dothereco.DotheReco.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class FixedScheduleDto {

    @NotEmpty
    private String fixedtitle;

    private LocalDate fixedstartday;

    private LocalDate fixedendday;

    private LocalTime fixedstarttime;

    private LocalTime fixedendtime;

    private String fixedmemo;
//private Long categoryCode; 아직 카테고리에 데이터가 없어서 주석처리함.
//private Long placeCode;
}
