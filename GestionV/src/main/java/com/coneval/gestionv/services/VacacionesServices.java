package com.coneval.gestionv.services;

import com.coneval.gestionv.config.VacacionesMapper;
import com.coneval.gestionv.dto.VacacionesDTO;
import com.coneval.gestionv.entity.User;
import com.coneval.gestionv.entity.Vacaciones;
import com.coneval.gestionv.repository.UserRepository;
import com.coneval.gestionv.repository.VacasionesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Primary
public class VacacionesServices {



    @Autowired
    private VacasionesRepository vacasionesRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VacacionesMapper vacacionesMapper;


    public List<VacacionesDTO> findAll() {
        return vacasionesRepository.findAll().stream()
                .map(vacacionesMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<VacacionesDTO> findByEmail(String email) {
        return vacasionesRepository.findByUserEmail(email).stream()
                .map(vacacionesMapper::toDTO)
                .collect(Collectors.toList());
    }
    public List<Vacaciones> getVacaciones(){

        return this.vacasionesRepository.findAll();
    }


    public void save(Vacaciones vacaciones){

        this.vacasionesRepository.save(vacaciones);

    }

    public void delete(Integer id){
        this.vacasionesRepository.deleteById(id);
    }

    public Optional<Vacaciones>actualizar(Vacaciones vacaciones,Integer id){

        Optional<Vacaciones> vacacionesAux = this.vacasionesRepository.findById(id);

        if(vacacionesAux.isPresent()){
            Vacaciones vacaDb=vacacionesAux.get();
            vacaDb.setEstado(vacaciones.getEstado());
            vacaDb.setDiasRestantes(vacaciones.getDiasRestantes());
            vacaDb.setDiasSolicitados(vacaciones.getDiasSolicitados());
            vacaDb.setPeriodo(vacaciones.getPeriodo());
            vacaDb.setFechaInicio(vacaciones.getFechaInicio());
            vacaDb.setFechaFin(vacaciones.getFechaFin());


            return Optional.of(vacasionesRepository.save(vacaDb));
        }
        return Optional.empty();

    }


    public Optional<Vacaciones> findById(Integer id) {
        return vacasionesRepository.findById(id);
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
