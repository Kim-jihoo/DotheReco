package com.dothereco.DotheReco.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "RoutineSchedule")
public class RoutineSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Routine_code")
    private Long routineCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code")
    private User user;

    @Column(name = "Routine_title")
    private String routineTitle;

    @Column(name = "Routine_week")
    private String routineWeek;

    @Column(name = "Routine_startDay")
    private Time routineStartDay;

    @Column(name = "Routine_endDay")
    private Time routineEndDay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Place_Code")
    private Place place;

    @OneToMany(mappedBy = "routineList3")
    private List<Connection3> connections3 = new ArrayList<>();

    @OneToMany (mappedBy = "routineList5")
    private List<Connection5> connection5 = new ArrayList<>();
}
