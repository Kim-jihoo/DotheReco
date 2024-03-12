package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = "Connection2")
public class Connection2 {
    @EmbeddedId
    private Connection2Id id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Fixed_code", insertable = false, updatable = false)
    private Fixed fixedList2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code", insertable = false, updatable = false)
    private User userList2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Calendar_date", insertable = false, updatable = false)
    private Calendar calendarList2;

    public Connection2() {this.id = new Connection2Id();}

}
@Embeddable
class Connection2Id implements Serializable {

    @Column(name = "Calendar_date")
    private Date calendarDate;

    @Column(name = "Fixed_code")
    private Long fixedCode;

    @Column(name = "User_code")
    private Long userCode;

    // Getter and Setter
}