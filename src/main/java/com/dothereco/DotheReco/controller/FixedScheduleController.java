package com.dothereco.DotheReco.controller;

import com.dothereco.DotheReco.dto.FixedScheduleDTO;
import com.dothereco.DotheReco.service.FixedScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fixed")
public class FixedScheduleController {


    private final FixedScheduleService fixedScheduleService;
    @GetMapping
    public ResponseEntity<List<FixedScheduleDTO>> getAllFixedSchedules(){
        List<FixedScheduleDTO> schedules = fixedScheduleService.getAllFixedSchedules();
        return ResponseEntity.ok(schedules);
    }
    @GetMapping("/{id}")
    public ResponseEntity<FixedScheduleDTO> getFixedScheduleById(@PathVariable("id") Long id){
        FixedScheduleDTO scheduleDto = fixedScheduleService.getFixedScheduleById(id);
        return ResponseEntity.ok(scheduleDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateFixedSchedule(@PathVariable("id") Long id, @RequestBody FixedScheduleDTO fixedScheduleDto){
        fixedScheduleService.updateFixedSchedule(id, fixedScheduleDto);
        return ResponseEntity.ok("일정이 성공적으로 업데이트되었습니다.");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFixedSchedule(@PathVariable("id") Long id){
        fixedScheduleService.deleteFixedSchedule(id);
        return ResponseEntity.ok("일정이 성공적으로 삭제되었습니다.");
    }
    @PostMapping
    public ResponseEntity<String> addFixed(@RequestBody @Valid FixedScheduleDTO fixedScheduleDto) {
        fixedScheduleService.addFixed(fixedScheduleDto);
        return ResponseEntity.ok("일정추가가 완료되었습니다.");
    }
}
