package com.coneval.gestionv.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @NotBlank
   private String nombre;

   @NotNull
   @NotBlank
   private String apellidoM;

   @NotNull
   @NotBlank
   private String apellidoP;

   @Column(unique = true)
   @Email
   @NotBlank
   private String email;

   private String password;

   private String puesto;

   private String status;

   private String cordinaciones;

   @NotNull
   @NotBlank
   private String rfc;


    @JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
     @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",joinColumns = @JoinColumn(name = "user_id")
            ,inverseJoinColumns = @JoinColumn(name = "role_id"),
            uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id","role_id"})})
   private List<Role>roles;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate fechaDeIngreso;

    @ManyToOne
    @JoinColumn(name = "departamento_id")
    private Departamento departamento;

    @OneToMany(mappedBy = "user")
    private List<Vacaciones> vacaciones;

}
