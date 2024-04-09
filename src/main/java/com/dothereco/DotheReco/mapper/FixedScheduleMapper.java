package com.dothereco.DotheReco.mapper;

import com.dothereco.DotheReco.domain.Fixed;
import com.dothereco.DotheReco.dto.FixedScheduleDTO;
import org.springframework.stereotype.Component;

@Component
public class FixedScheduleMapper {

    public Fixed toEntity(FixedScheduleDTO fixedDto) {
        Fixed entity = new Fixed();
        entity.setFixedCode(fixedDto.getFixedCode());
        entity.setFixedTitle(fixedDto.getFixedTitle());
        entity.setFixedStartDay(fixedDto.getFixedStartDay());
        entity.setFixedEndDay(fixedDto.getFixedEndDay());
        entity.setFixedStartTime(fixedDto.getFixedStartTime());
        entity.setFixedEndTime(fixedDto.getFixedEndTime());
        entity.setFixedMemo(fixedDto.getFixedMemo());
        return entity;
    }
    public FixedScheduleDTO toDto(Fixed fixed){
        FixedScheduleDTO dto = new FixedScheduleDTO();
        dto.setFixedCode(fixed.getFixedCode());
        dto.setFixedTitle(fixed.getFixedTitle());
        dto.setFixedStartDay(fixed.getFixedStartDay());
        dto.setFixedEndDay(fixed.getFixedEndDay());
        dto.setFixedStartTime(fixed.getFixedStartTime());
        dto.setFixedEndTime(fixed.getFixedEndTime());
        dto.setFixedMemo(fixed.getFixedMemo());
        if(fixed.getCategory() !=null){
            dto.setCategoryCode(fixed.getCategory().getCategoryCode());
            dto.setCategoryName(fixed.getCategory().getCategoryName());
            dto.setCategoryColor(fixed.getCategory().getColor().toString());
        }

        return dto;
    }
}
