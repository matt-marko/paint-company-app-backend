package org.paint;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class UserEntity extends PanacheEntity {
    @Column(length = 32)
    private String name;

    @Column(length = 32)
    private String permission;

    public String getName() {
        return this.name;
    }

    public String getPermission() {
        return this.permission;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }
}