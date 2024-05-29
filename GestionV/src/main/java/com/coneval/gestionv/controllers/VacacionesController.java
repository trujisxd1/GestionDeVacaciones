package com.coneval.gestionv.controllers;


import com.coneval.gestionv.entity.Vacaciones;
import com.coneval.gestionv.services.VacacionesServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vacaciones")
public class VacacionesController {
@Autowired
private VacacionesServices vacacionesServices;


    @PostMapping("/{emailUsuario}")
    public ResponseEntity<?> agregarVacaciones(@PathVariable String emailUsuario, @RequestBody Vacaciones vacaciones) {
        try {
            vacacionesServices.agregarVacaciones(emailUsuario, vacaciones);
            return ResponseEntity.status(HttpStatus.CREATED).body("Vacaciones agregadas exitosamente para el usuario con correo electrónico: " + emailUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar vacaciones para el usuario con correo electrónico: " + emailUsuario);
        }
    }

//    {
//        "fechaInicio": "2024-06-01",
//            "fechaFin": "2024-06-15",
//            "estado": "Pendiente",
//            "periodo": "Periodo de vacaciones 2",
//            "diasSolicitados": 15,
//            "diasRestantes": 10
//    }

}
