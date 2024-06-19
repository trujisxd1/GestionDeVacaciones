package com.coneval.gestionv.controllers;

import com.coneval.gestionv.dto.UserRequest;
import com.coneval.gestionv.entity.User;
import com.coneval.gestionv.services.UserServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserServices service;

    @GetMapping("/listar")
    public List<User> listar() {
        return service.findAll();
    }


    @GetMapping("/listarPage/{page}")
    public Page<User> listarPage(@PathVariable Integer page) {

        Pageable pageable= PageRequest.of(page,5);
        return service.findAllPage(pageable);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<?>    buscarPorId(@PathVariable Integer id) {
        Optional<User> userOptional = service.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(userOptional.orElseThrow());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error", "el usuario no se encontro por el id:" + id));
    }

    @PostMapping("/crear")
    public ResponseEntity<?> Crear(@Valid @RequestBody User user,BindingResult result) {
        if(result.hasFieldErrors()){
            return  validation(result);
        }
        //JSON para editar

//        {
//            "nombre": "NuevoNombre",
//                "apellidoM": "NuevoApellidoM",
//                "apellidoP": "NuevoApellidoP",
//                "email": "nuevoemail@example.com",
//                "rfc": "NUEVORFC123",
//                "fechaDeIngreso": "25-05-2024",
//                "puestoId": 2
//
//        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> Actualizar(@Valid @PathVariable Integer id, @RequestBody User user, BindingResult result) {
        Optional<User> userOptional = service.actualizar(user,id);

        if(result.hasFieldErrors()){
            return  validation(result);
        }
        if (userOptional.isPresent()) {

            return ResponseEntity.ok(userOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> Borrar(@PathVariable Integer id) {
        Optional<User> userOptional = service.findById(id);
        if (userOptional.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/bus/{email}")

    public ResponseEntity<?> buscarPorEmail(@PathVariable String email) {

        return ResponseEntity.status(HttpStatus.OK).body(this.service.buscarPorEmail(email));
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String,String> errors = new HashMap<>();

        result.getFieldErrors().forEach(err->{
            errors.put(err.getField(),"El campo " + err.getField() + " " + err.getDefaultMessage());
        });

        return ResponseEntity.badRequest().body(errors);
    }
}
