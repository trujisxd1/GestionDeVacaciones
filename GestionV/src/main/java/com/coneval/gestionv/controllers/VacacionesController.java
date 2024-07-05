package com.coneval.gestionv.controllers;


import com.coneval.gestionv.dto.VacacionesDTO;
import com.coneval.gestionv.entity.Vacaciones;
import com.coneval.gestionv.services.VacacionesServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vacaciones")
public class VacacionesController {
@Autowired
private VacacionesServices vacacionesServices;



    @GetMapping("/listar")

    public List<Vacaciones> listar(){

        return this.vacacionesServices.getVacaciones();
    }

    @GetMapping("/all")
    public List<VacacionesDTO> getAllVacaciones() {
        return vacacionesServices.findAll();
    }

    @PostMapping("/crear")
    public ResponseEntity<Vacaciones> crear(@RequestBody Vacaciones vacaciones){
        this.vacacionesServices.save(vacaciones);

        return ResponseEntity.status(HttpStatus.CREATED).body(vacaciones);
    }


    @PostMapping("/crear/{emailUsuario}")
    public ResponseEntity<?> agregarVacaciones(@PathVariable String emailUsuario, @RequestBody Vacaciones vacaciones) {
        try {
            vacacionesServices.agregarVacaciones(emailUsuario, vacaciones);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Vacaciones agregadas exitosamente para el usuario con correo electrónico: " + emailUsuario);
            return ResponseEntity.status(HttpStatus.CREATED).contentType(MediaType.APPLICATION_JSON).body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error al agregar vacaciones para el usuario con correo electrónico: " + emailUsuario);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).contentType(MediaType.APPLICATION_JSON).body(response);
        }
    }

    @PutMapping("/editar/{id}")

    public ResponseEntity<?>ActalizarVa(@Valid @PathVariable Integer id, @RequestBody Vacaciones vacaciones, BindingResult result){
        Optional<Vacaciones>vacacionesOptional=this.vacacionesServices.actualizar(vacaciones,id);

        if (result.hasFieldErrors()){

            return validation(result);
        }
        if (vacacionesOptional.isPresent()){
            return ResponseEntity.ok(vacacionesOptional.orElseThrow());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
    }


//    {
//        "fechaInicio": "2024-06-01",
//            "fechaFin": "2024-06-15",
//            "estado": "Pendiente",
//            "periodo": "Periodo de vacaciones 2",
//            "diasSolicitados": 15,
//            "diasRestantes": 10
//    }
private ResponseEntity<?> validation(BindingResult result) {
    Map<String,String> errors = new HashMap<>();

    result.getFieldErrors().forEach(err->{
        errors.put(err.getField(),"El campo " + err.getField() + " " + err.getDefaultMessage());
    });

    return ResponseEntity.badRequest().body(errors);
}
}
