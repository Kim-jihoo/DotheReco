package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
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
    private Date tbDate;

    @Column(name = "Tb_startTime")
    private Time tbStartTime;

    @Column(name = "Tb_endTime")
    private Time tbEndTime;

    @OneToMany (mappedBy = "timeBlockList4")
    private List<Connection4> connection4 = new ArrayList<>();

    @OneToMany (mappedBy = "timeBlockList5")
    private List<Connection5> connection5 = new ArrayList<>();
}
