package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Connection5")
public class Connection5 {
    @EmbeddedId
    private Connection5Id id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Routine_code", insertable = false, updatable = false)
    private RoutineSchedule routineList5;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code", insertable = false, updatable = false)
    private User userList5;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Tb_code", insertable = false, updatable = false)
    private TimeBlock timeBlockList5;

    public Connection5() {
        this.id = new Connection5Id();
    }
}
@Embeddable
class Connection5Id implements Serializable {

    @Column(name = "Routine_code")
    private Long routineCode;

    @Column(name = "User_code")
    private Long userCode;

    @Column(name = "Tb_code")
    private Long tbCode;

    // Getter and Setter
}