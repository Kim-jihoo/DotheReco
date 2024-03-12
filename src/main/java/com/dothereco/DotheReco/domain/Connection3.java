package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = "Connection3")
public class Connection3 {
    @EmbeddedId
    private Connection3Id id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Routine_code", insertable = false, updatable = false)
    private RoutineSchedule routineList3;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code", insertable = false, updatable = false)
    private User userList3;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Calendar_date", insertable = false, updatable = false)
    private Calendar calendarList3;

    public Connection3() {this.id = new Connection3Id();}
}
@Embeddable
class Connection3Id implements Serializable {

    @Column(name = "Calendar_date")
    private Date calendarDate;

    @Column(name = "Routine_code")
    private Long routineCode;

    @Column(name = "User_code")
    private Long userCode;

    // Getter and Setter
}

