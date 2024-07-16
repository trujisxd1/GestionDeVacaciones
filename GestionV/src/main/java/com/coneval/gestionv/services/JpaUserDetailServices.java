package com.coneval.gestionv.services;

import com.coneval.gestionv.entity.User;
import com.coneval.gestionv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JpaUserDetailServices implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User>optional=this.userRepository.findByEmail(email);

        if (optional.isEmpty()){
            throw new UsernameNotFoundException(String.format("El correo %s no existe en el sistema ",email));
        }

        User user=optional.get();
        List<GrantedAuthority>authorities=user.getRoles().stream().map(role
                -> new SimpleGrantedAuthority(role.getNombre())).collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(email,user.getPassword()
                ,true,
                true,true,true,authorities);
    }
}
