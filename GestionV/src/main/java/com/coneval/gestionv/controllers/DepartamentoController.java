package com.coneval.gestionv.controllers;


import com.coneval.gestionv.entity.Departamento;
import com.coneval.gestionv.repository.DepartamentoRepository;
import com.coneval.gestionv.services.DepartamentoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class DepartamentoController {


    @Autowired
    private DepartamentoServices departamentoServices;

    @GetMapping("/puesto/{id}")

    public ResponseEntity<?>buscarPorId(@PathVariable Integer id){

        return ResponseEntity.status(HttpStatus.OK).body(this.departamentoServices.buscarPorId(id));

    }

    @GetMapping("/puestos")

    public ResponseEntity<?> listarDepartamentos() {

        return ResponseEntity.status(HttpStatus.OK).body(this.departamentoServices.listar());
    }


    @PostMapping("/puestos")
    public ResponseEntity<?> addDepartamento(Departamento departamento) {

        this.departamentoServices.save(departamento);

        return ResponseEntity.status(HttpStatus.CREATED).body(departamento);
    }

    @DeleteMapping("/puestos")
    public ResponseEntity<?>eliminarDepartamento(Integer id) {

        try {
            this.departamentoServices.eliminar(id);

            return ResponseEntity.status(HttpStatus.OK).body(new HashMap<>(){
                {
                    put("Mensaje","se elimino el departamento con exito" );
                }
            });
        }catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }


    }

}
