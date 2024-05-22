package com.dothereco.DotheReco.service;

import com.dothereco.DotheReco.domain.Unfixed;
import com.dothereco.DotheReco.dto.UnfixedScheduleDTO;
import com.dothereco.DotheReco.domain.Category;
import com.dothereco.DotheReco.repository.UnfixedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UnfixedService {
    private final UnfixedRepository unfixedRepository;
    private final CategoryService categoryService;


    @Autowired
    public UnfixedService(UnfixedRepository unfixedRepository, CategoryService categoryService/*,PlaceRepository placeRepository*/){
        this.unfixedRepository = unfixedRepository;
        this.categoryService = categoryService;
    }

    //유동 스케줄 저장
    public Unfixed createUnfixed(UnfixedScheduleDTO dto) {
        Unfixed unfixed = new Unfixed();
        mapDtoToUnfixed(dto, unfixed);
        return unfixedRepository.save(unfixed);
    }
    // 유동 스케줄 수정
    public Unfixed updateUnfixed(Long id, UnfixedScheduleDTO dto) {
        Unfixed unfixed = unfixedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("유동 스케줄을 찾을 수 없습니다: " + id));
        mapDtoToUnfixed(dto, unfixed);
        return unfixedRepository.save(unfixed);
    }

    // 모든 유동 스케줄 조회
    public List<Unfixed> getAllUnfixed() {
        List<Unfixed> allUnfixed = unfixedRepository.findAll();
        return allUnfixed.stream()
                .sorted(Comparator.comparing(Unfixed::isUnfixedCompleted)
                        .thenComparing(Unfixed::getScheduleDate))
                .collect(Collectors.toList());

    }

    // 특정 유동 스케줄 조회
    public Optional<Unfixed> getUnfixedById(Long id) {
        return unfixedRepository.findById(id);
    }

    // 유동 스케줄 삭제
    public void deleteUnfixed(Long id) {
        Unfixed unfixed = unfixedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("유동 스케줄을 찾을 수 없습니다: " + id));
        unfixedRepository.delete(unfixed);
    }

    private void mapDtoToUnfixed(UnfixedScheduleDTO dto, Unfixed unfixed){
        unfixed.setUnfixedTitle(dto.getUnfixedTitle());
        unfixed.setScheduleDate(dto.getScheduleDate());
        unfixed.setUnfixedTime(dto.getUnfixedTime());
        unfixed.setUnfixedDeadline(dto.getUnfixedDeadline());
        unfixed.setUnfixedImportance(Optional.ofNullable(dto.getUnfixedImportance()).orElse(3));
        unfixed.setUnfixedMemo(dto.getUnfixedMemo());
        //unfixed.setReminderMark(dto.getReminderMark());
        unfixed.setUnfixedCompleted(false);
        unfixed.setUnfixedRecommended(false);
        unfixed.setReminderMark(false);

        // 카테고리 설정
        if (dto.getCategoryId() != null) {
            unfixed.setCategory(categoryService.getCategoryById(dto.getCategoryId()));
        } else {
            unfixed.setCategory(null);
        }
        // 장소 설정 로직 추가 가능
    }

}
