package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = "Connection1")
public class Connection1 {
    @EmbeddedId
    private Connection1Id id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Unfixed_code", insertable = false, updatable = false)
    private Unfixed unfixedList1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code", insertable = false, updatable = false)
    private User userList1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Calendar_date", insertable = false, updatable = false)
    private Calendar calendarList1;

    public Connection1() { this.id = new Connection1Id();}


}

@Embeddable
class Connection1Id implements Serializable {

    @Column(name = "Calendar_date")
    private Date calendarDate;

    @Column(name = "Unfixed_code")
    private Long unfixedCode;

    @Column(name = "User_code")
    private Long userCode;

    // Getter and Setter
}
