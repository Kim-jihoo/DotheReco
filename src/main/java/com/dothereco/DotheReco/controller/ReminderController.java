package com.dothereco.DotheReco.controller;

import com.dothereco.DotheReco.domain.Reminder;
import com.dothereco.DotheReco.service.ReminderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {
    private final ReminderService reminderService;

    @Autowired
    public ReminderController(ReminderService reminderService) {
        this.reminderService = reminderService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Reminder> getReminderById(@PathVariable(value = "id") Long reminderId){
        Reminder reminder = reminderService.getReminderById(reminderId)
                .orElseThrow(()-> new RuntimeException("해당 일정을 찾을 수 없습니다."+ reminderId));
        return ResponseEntity.ok().body(reminder);
    }
    @PostMapping
    public Reminder createReminder(@RequestBody Reminder reminder){
        return reminderService.saveReminder(reminder);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Reminder> updateReminder(@PathVariable(value = "id")Long reminderId, @RequestBody Reminder reminderDetails){
        Reminder updatedReminder = reminderService.updateReminder(reminderId, reminderDetails);
        return ResponseEntity.ok(updatedReminder);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReminder(@PathVariable(value = "id") Long reminderId){
        reminderService.deleteReminder(reminderId);
        return ResponseEntity.ok().build();
    }
}
