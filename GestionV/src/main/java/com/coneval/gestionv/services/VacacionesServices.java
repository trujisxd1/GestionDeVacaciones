package com.coneval.gestionv.services;

import com.coneval.gestionv.entity.User;
import com.coneval.gestionv.entity.Vacaciones;
import com.coneval.gestionv.repository.UserRepository;
import com.coneval.gestionv.repository.VacasionesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
public class VacacionesServices {



    @Autowired
    private VacasionesRepository vacasionesRepository;
    @Autowired
    private UserRepository userRepository;


    public List<Vacaciones> getVacaciones(){

        return this.vacasionesRepository.findAll();
    }


    public void save(Vacaciones vacaciones){

        this.vacasionesRepository.save(vacaciones);

    }

    public void delete(Integer id){
        this.vacasionesRepository.deleteById(id);
    }


    public Vacaciones buscarPorId(Integer id){

        Optional<Vacaciones> optional= this.vacasionesRepository.findById(id);

        if (optional.isPresent()){
            optional.get();
        }
            return null;

    }
    public void agregarVacaciones(String emailUsuario, Vacaciones vacaciones) {
        // Buscar al usuario por su correo electrónico
        Optional<User> optionalUser = userRepository.findByEmail(emailUsuario);

        if (optionalUser.isPresent()) {
            User usuario = optionalUser.get();
            // Asociar las vacaciones con el usuario
            vacaciones.setUser(usuario);
            // Guardar las vacaciones en la base de datos
            vacasionesRepository.save(vacaciones);
        } else {
            // Manejar el caso en que el usuario no sea encontrado
            throw new RuntimeException("Usuario no encontrado para el correo electrónico: " + emailUsuario);
        }
    }
}
