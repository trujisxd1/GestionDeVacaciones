package com.coneval.gestionv.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

   private String nombre;

   private String apellidoM;

   private String apellidoP;

   @Column(unique = true)
   private String email;

   private String password;

   private String rfc;

   private Date fechaDeIngreso;

    @ManyToOne
    @JoinColumn(name = "departamento_id")
    private Departamento departamento;

    @OneToMany(mappedBy = "user")
    private List<Vacaciones> vacaciones;

}
