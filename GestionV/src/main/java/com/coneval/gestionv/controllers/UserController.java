package com.coneval.gestionv.controllers;

import com.coneval.gestionv.entity.User;
import com.coneval.gestionv.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer id) {
        Optional<User> userOptional = service.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(userOptional.orElseThrow());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error", "el usuario no se encontro por el id:" + id));
    }

    @PostMapping
    public ResponseEntity<User> Crear(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> Actualizar(@PathVariable Integer id, @RequestBody User user) {
        Optional<User> userOptional = service.findById(id);

        if (userOptional.isPresent()) {
            User userDb = userOptional.get();
            userDb.setEmail(user.getEmail());
            userDb.setApellidoM(user.getApellidoM());
            userDb.setApellidoP(user.getApellidoP());
            userDb.setNombre(user.getNombre());
            userDb.setPassword(user.getPassword());
            userDb.setRfc(user.getRfc());
            return ResponseEntity.ok(service.save(userDb));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> Borrar(@PathVariable Integer id) {
        Optional<User> userOptional = service.findById(id);
        if (userOptional.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
