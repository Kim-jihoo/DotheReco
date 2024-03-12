package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "Calendar")
public class Calendar {
    @Id
    @Column(name = "Calendar_date")
    private Date calendarDate;

    @OneToMany (mappedBy = "calendarList2")
    private List<Connection2> connections2 = new ArrayList<>();

    @OneToMany(mappedBy = "calendarList1")
    private List<Connection1> connections1 = new ArrayList<>();

    @OneToMany(mappedBy = "calendarList3")
    private List<Connection3> connections3 = new ArrayList<>();
}
