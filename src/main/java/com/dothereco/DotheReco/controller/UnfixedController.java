package com.dothereco.DotheReco.controller;


import com.dothereco.DotheReco.domain.Unfixed;
import com.dothereco.DotheReco.dto.UnfixedScheduleDTO;
import com.dothereco.DotheReco.service.UnfixedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/unfixed-schedules")
public class UnfixedController {

    private final UnfixedService unfixedService;

    @Autowired
    public UnfixedController(UnfixedService unfixedService) {
        this.unfixedService = unfixedService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public ResponseEntity<List<UnfixedScheduleDTO>> getAllUnfixedSorted() {
        List<Unfixed> sortedUnfixed = unfixedService.getAllUnfixed();
        List<UnfixedScheduleDTO> dtoList = sortedUnfixed.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoList);
    }


    // 특정 유동 스케줄 조회
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<Unfixed> getUnfixedScheduleById(@PathVariable("id") Long id) {
        Optional<Unfixed> unfixed = unfixedService.getUnfixedById(id);
        return unfixed.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 유동 스케줄 생성
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<Unfixed> createUnfixedSchedule(@RequestBody UnfixedScheduleDTO unfixedDto) {
        Unfixed unfixed = unfixedService.createUnfixed(unfixedDto);
        return ResponseEntity.ok(unfixed);
    }

    // 유동 스케줄 수정
    @PutMapping("/{id}")
    public ResponseEntity<Unfixed> updateUnfixedSchedule(@PathVariable("id") Long id, @RequestBody UnfixedScheduleDTO unfixedDto) {
        Unfixed unfixed = unfixedService.updateUnfixed(id, unfixedDto);
        return ResponseEntity.ok(unfixed);
    }

    // 유동 스케줄 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnfixedSchedule(@PathVariable("id") Long id) {
        unfixedService.deleteUnfixed(id);
        return ResponseEntity.noContent().build();
    }

    private UnfixedScheduleDTO convertToDto(Unfixed unfixed) {
        UnfixedScheduleDTO dto = new UnfixedScheduleDTO();
        dto.setUnfixedTitle(unfixed.getUnfixedTitle());
        dto.setScheduleDate(unfixed.getScheduleDate());
        dto.setUnfixedTime(unfixed.getUnfixedTime());
        dto.setUnfixedDeadline(unfixed.getUnfixedDeadline());
        dto.setUnfixedImportance(unfixed.getUnfixedImportance());
        dto.setUnfixedMemo(unfixed.getUnfixedMemo());
        dto.setCategoryId(unfixed.getCategory() != null ? unfixed.getCategory().getCategoryCode() : null);
        dto.setPlaceId(unfixed.getPlace() != null ? unfixed.getPlace().getPlaceCode() : null);
        return dto;
    }
}
