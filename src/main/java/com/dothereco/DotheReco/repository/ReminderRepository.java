package com.dothereco.DotheReco.repository;

import com.dothereco.DotheReco.domain.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
}
