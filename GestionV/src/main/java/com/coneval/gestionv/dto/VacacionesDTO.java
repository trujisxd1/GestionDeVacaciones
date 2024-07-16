package com.coneval.gestionv.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VacacionesDTO {

    private Integer id;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estado;
    private String periodo;
    private int diasSolicitados;
    private int diasRestantes;
    private Integer userId;
    private String nombreP;
    private String apellidoP;
    private String apellidoM;
    private String correo;



}
