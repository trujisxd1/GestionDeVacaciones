package com.coneval.gestionv.auth.filter;

import ch.qos.logback.core.util.SystemInfo;
import com.coneval.gestionv.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.coneval.gestionv.auth.TokenJwtConfig.*;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {



    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {

        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        String email=null;
        String password=null;



        try {
            User user=new ObjectMapper().readValue(request.getInputStream(),User.class);
            email=user.getEmail();
            password=user.getPassword();



        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken(email,password);


        return this.authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        org.springframework.security.core.userdetails.User user= ( org.springframework.security.core.userdetails.User) authResult.getPrincipal();
        String email=user.getUsername();




        Collection<? extends GrantedAuthority>roles= authResult.getAuthorities();

        Claims claims = Jwts.claims().add("authorities",new ObjectMapper().writeValueAsString(roles)).add("email",email).build();



        String jwt=Jwts.builder()
                .subject(email).claims(claims)
                .signWith(SECRET_KEY).issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+ 3600000))
                .compact();

        response.addHeader(HEADER,PREFIX_TOKEN + jwt);

        Map<String,String> body= new HashMap<>();

        body.put("token",jwt);
        body.put("Email",email);

        body.put("mensaje", String.format("Hola %s has iniciado sesion con exito",user.getUsername()));

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));

        response.setContentType(CONTENT_TYPE);

        response.setStatus(200);

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {

        Map<String,String>body = new HashMap<>();

        body.put("mensaje","error en la autenticacion con username y password incorrecto");
        body.put("error",failed.getMessage());

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setContentType(CONTENT_TYPE);
        response.setStatus(401);
    }
}
