package com.coneval.gestionv.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(title = "Vacaciones Coneval", version = "1.0.0", description = "Gestor de Vacaciones"))
public class OpenApi {
}
