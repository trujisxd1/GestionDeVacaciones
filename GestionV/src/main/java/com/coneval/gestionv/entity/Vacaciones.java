package com.coneval.gestionv.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@Data
public class Vacaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private String estado; // e.g., "Aprobado", "Pendiente", "Rechazado"


    @NotBlank
    private String periodo;

    private int diasSolicitados;

    private int diasRestantes;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
