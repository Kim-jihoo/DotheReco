package com.dothereco.DotheReco.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Entity
@Setter
@Getter
@Table(name = "BedTime")
public class BedTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Bed_code")
    private Long bedCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code")
    private User user;

    @Column(name = "Bed_startWeek")
    private String bedStartWeek;

    @Column(name = "Bed_endWeek")
    private String bedEndWeek;

    @Column(name = "Bed_startTime")
    private Time bedStartTime;

    @Column(name = "Bed_endTime")
    private Time bedEndTime;
}
