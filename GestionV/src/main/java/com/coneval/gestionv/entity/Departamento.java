package com.coneval.gestionv.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "puestos")
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String puesto;

    @ManyToOne
    @JoinColumn(name = "cordinacion_id")
    private Cordinaciones cordinacion;
}
