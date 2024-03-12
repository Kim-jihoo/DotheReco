package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Entity
@Setter
@Getter
@Table(name = "UnscheduledTime")
public class UnscheduledTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Unscheduled_code")
    private Long unscheduledCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code")
    private User user;

    @Column(name = "Unscheduled_week")
    private String unscheduledWeek;

    @Column(name = "Unscheduled_startTime")
    private Time unscheduledStartTime;

    @Column(name = "Unscheduled_endTime")
    private Time unscheduledEndTime;

}
