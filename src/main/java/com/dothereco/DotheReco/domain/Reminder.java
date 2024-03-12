package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Entity
@Setter
@Getter
@Table(name = "Reminder")
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Reminder_code")
    private Long reminderCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code")
    private User user;

    @Column(name = "Reminder_title")
    private String reminderTitle;

    @Column(name = "Reminder_check")
    private Boolean reminderCheck;

    @Column(name = "Reminder_date")
    private Date reminderDate;

    @Column(name = "Reminder_week")
    private String reminderWeek;

    @Column(name = "Reminder_time")
    private Time reminderTime;
}
