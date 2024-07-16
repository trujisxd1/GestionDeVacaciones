package com.coneval.gestionv.entity;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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

    @NotEmpty
    @NotBlank
   private String nombre;


   @NotBlank
   @NotEmpty
   private String apellidoM;


   @NotBlank
   @NotEmpty
   private String apellidoP;

   @Column(unique = true)
   private String email;

   private String autorizador;

   private String validador;

   private String password;

   @Transient
   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   private boolean admin;




   @NotBlank
   @NotEmpty
   private String rfc;


    @JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
     @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",joinColumns = @JoinColumn(name = "user_id")
            ,inverseJoinColumns = @JoinColumn(name = "role_id"),
            uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id","role_id"})})
   private List<Role>roles;

    @NotEmpty
    private String fechaDeIngreso;

    @ManyToOne
    @JoinColumn(name = "puesto_id")
    private Departamento puesto;

    @ManyToOne
    @JoinColumn(name = "cordinacion_id")
    private Cordinaciones cordinacion;

    @OneToMany(mappedBy = "user")
    private List<Vacaciones> vacaciones;

}
