package org.paint;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class PaintEntity extends PanacheEntity {
    @Column(length = 16)
    public String colour;

    @Column(length = 16)
    public String status;
}
