package com.dothereco.DotheReco.mapper;

import com.dothereco.DotheReco.domain.Fixed;
import com.dothereco.DotheReco.dto.FixedScheduleDto;
import org.springframework.stereotype.Component;

@Component
public class FixedScheduleMapper {

    public Fixed toEntity(FixedScheduleDto fixedDto) {
        Fixed entity = new Fixed();
        entity.setFixedTitle(fixedDto.getFixedtitle());
        entity.setFixedStartDay(fixedDto.getFixedstartday());
        entity.setFixedEndDay(fixedDto.getFixedendday());
        entity.setFixedStartTime(fixedDto.getFixedstarttime());
        entity.setFixedEndTime(fixedDto.getFixedendtime());
        entity.setFixedMemo(fixedDto.getFixedmemo());
        return entity;
    }
}
