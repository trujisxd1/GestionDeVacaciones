package com.coneval.gestionv.controllers;


import com.coneval.gestionv.services.CordinacionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cordinaciones")
@CrossOrigin("*")
public class CordinacionesController {

    @Autowired
    private CordinacionServices cordinacionServices;

    @GetMapping("/listar")
    public ResponseEntity<?>listar(){
        return ResponseEntity.status(HttpStatus.OK).body(this.cordinacionServices.listar());
    }
}
