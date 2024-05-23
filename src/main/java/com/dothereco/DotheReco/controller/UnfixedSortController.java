package com.dothereco.DotheReco.controller;

import com.dothereco.DotheReco.domain.Unfixed;
import com.dothereco.DotheReco.dto.UnfixedScheduleDTO;
import com.dothereco.DotheReco.service.UnfixedSortService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sorted-unfixed-schedules")
public class UnfixedSortController {
    private final UnfixedSortService unfixedSortService;

    @Autowired
    public UnfixedSortController(UnfixedSortService unfixedSortService) {
        this.unfixedSortService = unfixedSortService;
    }

    @CrossOrigin(origins = "<http://localhost:3000>")
    @GetMapping
    public ResponseEntity<List<UnfixedScheduleDTO>> getAllUnfixedSorted() {
        List<Unfixed> sortedUnfixed = unfixedSortService.getAllUnfixedSorted();
        List<UnfixedScheduleDTO> dtoList = sortedUnfixed.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoList);
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
