package com.dothereco.DotheReco.service;

import com.dothereco.DotheReco.domain.Reminder;
import com.dothereco.DotheReco.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*예외 처리,관계 설정(ManyToOne 처리 -> @Transactional 고려해보기 */
@Service
public class ReminderService {
    private final ReminderRepository reminderRepository;

    @Autowired
    public ReminderService(ReminderRepository reminderRepository){
        this.reminderRepository = reminderRepository;
    }

    public Reminder saveReminder(Reminder reminder){
        return reminderRepository.save(reminder);
    }
    public List<Reminder> getAllReminders(){
        return reminderRepository.findAll();
    }
    public Optional<Reminder> getReminderById(Long id){
        return reminderRepository.findById(id);
    }
    public Reminder updateReminder(Long id, Reminder reminderDetails){
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 일정을 찾을 수 없습니다."+id));
        reminder.setReminderTitle(reminderDetails.getReminderTitle());
        reminder.setReminderCheck(reminderDetails.getReminderCheck());
        reminder.setReminderDate(reminderDetails.getReminderDate());
        reminder.setReminderWeek(reminder.getReminderWeek());
        reminder.setReminderTime(reminderDetails.getReminderTime());

        final Reminder updateReminder = reminderRepository.save(reminder);
        return updateReminder;
    }
    public void deleteReminder(Long id){
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 일정입니다." + id));
        reminderRepository.delete(reminder);
    }

    public List<Reminder> getRemindersByDate(LocalDate date){
        return reminderRepository.findAll().stream()
                .filter(reminder -> reminder.getReminderDate().equals(date))
                .collect(Collectors.toList());
    }

}
