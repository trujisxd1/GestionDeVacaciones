package com.coneval.gestionv.dto;

import com.coneval.gestionv.entity.Cordinaciones;
import com.coneval.gestionv.entity.Departamento;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {



    private String nombre;
    private String apellidoM;
    private String apellidoP;
    private String email;
    private String rfc;
    private boolean admin;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private String fechaDeIngreso;
    private Integer puestoId;
    private Integer cordinacionId;

}
