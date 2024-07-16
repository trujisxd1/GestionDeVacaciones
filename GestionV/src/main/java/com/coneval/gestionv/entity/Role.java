package com.coneval.gestionv.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "role")
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    public Role(String nombre) {

        this.nombre = nombre;
    }

    public Role() {
    }
}
