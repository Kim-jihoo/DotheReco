package com.dothereco.DotheReco.service;

import com.dothereco.DotheReco.domain.Category;
import com.dothereco.DotheReco.domain.Fixed;
import com.dothereco.DotheReco.dto.FixedScheduleDTO;
import com.dothereco.DotheReco.mapper.FixedScheduleMapper;
import com.dothereco.DotheReco.repository.CategoryRepository;
import com.dothereco.DotheReco.repository.FixedScheduleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class FixedScheduleService {



    private final FixedScheduleRepository fixedScheduleRepository;
    private final FixedScheduleMapper fixedScheduleMapper;
    private final CategoryRepository categoryRepository;

    private final ScheduleRecService scheduleRecService;

    @Transactional(readOnly = true)
    public List<TimeRange> recommendTimeSlotsForUser(Long userId, LocalDate date, Duration expectedDuration){
        LocalDate startDate = date;
        LocalDate endDate = date;
       // List<Fixed> userSchedules = fixedScheduleRepository.findByUser_IdAndFixedStartDayBetween(userId, startDate, endDate);
        List<Fixed> userSchedules = fixedScheduleRepository.findByFixedStartDayBetween(startDate, endDate);
        List<TimeRange> busySlots = userSchedules.stream()
                .map(schedule -> new TimeRange(schedule.getFixedStartTime(), schedule.getFixedEndTime()))
                .collect(Collectors.toList());
        return scheduleRecService.recommendTimeSlots(busySlots, expectedDuration);
    }
    @Transactional(readOnly = true)
    public List<TimeRange> getBusyTimeSlots(Long userId, LocalDate date) {
        LocalDate startDate = date;
        LocalDate endDate = date.plusDays(1); // 같은 날짜를 의미합니다.
       // List<Fixed> userSchedules = fixedScheduleRepository.findByUser_IdAndFixedStartDayBetween(userId, startDate, endDate);
        List<Fixed> userSchedules = fixedScheduleRepository.findByFixedStartDayBetween(startDate, endDate);
        List<TimeRange> busySlots = userSchedules.stream()
                .map(schedule -> new TimeRange(schedule.getFixedStartTime(), schedule.getFixedEndTime()))
                .collect(Collectors.toList());
        return busySlots;
    }


    @Transactional
    public Fixed addFixed(FixedScheduleDTO fixedScheduleDto) {
        Fixed fixed = fixedScheduleMapper.toEntity(fixedScheduleDto);

        Category category = categoryRepository.findById(fixedScheduleDto.getCategoryCode())
                .orElseThrow(()->new EntityNotFoundException("카테고리가 존재하지 않습니다"+fixedScheduleDto.getCategoryCode()));
        fixed.setCategory(category);
        return fixedScheduleRepository.save(fixed);

    }
    @Transactional(readOnly = true)
    public List<FixedScheduleDTO> getAllFixedSchedules(){
        List<Fixed> fixedSchedules = fixedScheduleRepository.findAll();
        return fixedSchedules.stream()
                .map(fixedScheduleMapper::toDto)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public FixedScheduleDTO getFixedScheduleById(Long id){
        Fixed fixed = fixedScheduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("아이디를 찾을 수 없습니다" + id));
        return fixedScheduleMapper.toDto(fixed);
    }
    @Transactional
    public Fixed updateFixedSchedule(Long id, FixedScheduleDTO fixedScheduleDto){
        Fixed fixed = fixedScheduleRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("아이디를 찾을 수 없습니다"+id));
        fixed.setFixedTitle(fixedScheduleDto.getFixedTitle());
        fixed.setFixedStartDay(fixedScheduleDto.getFixedStartDay());
        fixed.setFixedEndDay(fixedScheduleDto.getFixedEndDay());
        fixed.setFixedStartTime(fixedScheduleDto.getFixedStartTime());
        fixed.setFixedEndTime(fixedScheduleDto.getFixedEndTime());
        fixed.setFixedMemo(fixedScheduleDto.getFixedMemo());

        //카테고리 조회 및 설정
        if(fixedScheduleDto.getCategoryCode() !=null){
            Category category = categoryRepository.findById(fixedScheduleDto.getCategoryCode())
                    .orElseThrow(()->new EntityNotFoundException("카테고리를 찾을 수 없습니다" + fixedScheduleDto.getFixedCode()));
            fixed.setCategory(category);
        }

        return fixedScheduleRepository.save(fixed);
    }
    public void deleteFixedSchedule(Long id){

        fixedScheduleRepository.deleteById(id);
    }
}
