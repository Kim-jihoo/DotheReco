package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "Connection4")
public class Connection4 {
    @EmbeddedId
    private Connection4Id id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Fixed_code", insertable = false, updatable = false)
    private Fixed fixedList4;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code", insertable = false, updatable = false)
    private User userList4;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Tb_code", insertable = false, updatable = false)

    private TimeBlock timeBlockList4;

    public Connection4() {
        this.id = new Connection4Id();
    }
}
@Embeddable
class Connection4Id implements Serializable {

    @Column(name = "Fixed_code")
    private Long fixedCode;

    @Column(name = "User_code")
    private Long userCode;

    @Column(name = "Tb_code")
    private Long tbCode;

    // Getter and Setter
}