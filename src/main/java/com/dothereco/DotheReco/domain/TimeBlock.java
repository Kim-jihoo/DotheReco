package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "TimeBlock")
public class TimeBlock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Tb_code")
    private Long tbCode;

    @Column(name = "Tb_date")
    private LocalDate tbDate;

    @Column(name = "Tb_startTime")
    private LocalTime tbStartTime;

    @Column(name = "Tb_endTime")
    private LocalTime tbEndTime;

    @OneToMany (mappedBy = "timeBlockList4")
    private List<Connection4> connection4 = new ArrayList<>();

    @OneToMany (mappedBy = "timeBlockList5")
    private List<Connection5> connection5 = new ArrayList<>();
}
