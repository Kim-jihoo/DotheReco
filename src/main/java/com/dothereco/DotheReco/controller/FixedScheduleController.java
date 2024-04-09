package com.dothereco.DotheReco.controller;

import com.dothereco.DotheReco.dto.FixedScheduleDto;
import com.dothereco.DotheReco.dto.MemberFormDto;
import com.dothereco.DotheReco.repository.FixedScheduleRepository;
import com.dothereco.DotheReco.service.FixedScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;


@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class FixedScheduleController {

    @Autowired
    private final FixedScheduleService fixedScheduleService;

    @PostMapping("/addFixedSchedule")
    public ResponseEntity<String> addFixed(@RequestBody FixedScheduleDto fixedScheduleDto) {
        fixedScheduleService.addFixed(fixedScheduleDto);
        return ResponseEntity.ok("일정추가가 완료되었습니다.");
    }
}
