package com.dothereco.DotheReco.repository;

import com.dothereco.DotheReco.domain.Fixed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FixedScheduleRepository extends JpaRepository<Fixed, Long> {
}
