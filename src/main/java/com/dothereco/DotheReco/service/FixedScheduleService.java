package com.dothereco.DotheReco.service;

import com.dothereco.DotheReco.domain.Category;
import com.dothereco.DotheReco.domain.Fixed;
import com.dothereco.DotheReco.dto.FixedScheduleDto;
import com.dothereco.DotheReco.repository.CategoryRepository;
import com.dothereco.DotheReco.repository.FixedScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.time.LocalDate;


@Service
@RequiredArgsConstructor
public class FixedScheduleService {


    @Autowired
    private FixedScheduleRepository fixedScheduleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public Fixed addFixed(FixedScheduleDto fixedScheduleDto) {
        Fixed fixed = new Fixed();
        fixed.setFixedTitle(fixed.getFixedTitle());
        fixed.setFixedStartDay(fixed.getFixedStartDay());
        fixed.setFixedEndDay(fixed.getFixedEndDay());
        fixed.setFixedStartTime(fixed.getFixedStartTime());
        fixed.setFixedEndTime(fixed.getFixedEndTime());
        fixed.setFixedMemo(fixed.getFixedMemo());


        /*Long categoryCode = fixedScheduleDto.getCategoryCode();
        Optional<Category> optionalCategory = categoryRepository.findById(categoryCode);
        Category category = optionalCategory.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        fixed.setCategory(category);*/ //카테고리에 데이터 없어서 일단 주석처리함.

        return fixedScheduleRepository.save(fixed);

    }
}
