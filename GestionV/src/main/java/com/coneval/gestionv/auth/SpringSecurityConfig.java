package com.coneval.gestionv.auth;


import com.coneval.gestionv.auth.filter.JwtAuthenticationFilter;
import com.coneval.gestionv.auth.filter.JwtValidationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.lang.reflect.Array;
import java.util.Arrays;

@Configuration
public class SpringSecurityConfig {


    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;
    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder(){

        return new BCryptPasswordEncoder();
    }
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.GET,"/api/v1/listar").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/v1/puestos").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/v1/cordinaciones/listar").permitAll()

                        .requestMatchers(HttpMethod.POST,"/api/v1").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"api/v1/editar/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"api/v1/vacaciones/**").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                         .addFilter(new JwtAuthenticationFilter(authenticationManager()))
                          .addFilter(new JwtValidationFilter(authenticationManager()))

                        .csrf(config -> config.disable())
                         .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                         .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration=new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("POST","GET","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization","Cache-Control","Content-Type"));
        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**",configuration);

        return source;

    }

    @Bean
    FilterRegistrationBean<CorsFilter>corsfilter(){
        FilterRegistrationBean<CorsFilter>corsFilter=new FilterRegistrationBean<CorsFilter>(new CorsFilter(this.corsConfigurationSource()));

        corsFilter.setOrder(Ordered.HIGHEST_PRECEDENCE);

        return corsFilter;
    }
}
