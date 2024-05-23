package com.dothereco.DotheReco.repository;

import com.dothereco.DotheReco.domain.Fixed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FixedScheduleRepository extends JpaRepository<Fixed, Long> {
    // 로그인 기능 구현 후 수정
    //  List<Fixed> findByUser_IdAndFixedStartDayBetween(Long userId, LocalDate startDate, LocalDate endDate);
  List<Fixed> findByFixedStartDayBetween(LocalDate startDate, LocalDate endDate);
    List<Fixed> findAllByFixedStartDay(LocalDate fixedStartDay);

}
