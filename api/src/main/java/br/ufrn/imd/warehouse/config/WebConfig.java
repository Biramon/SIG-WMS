package br.ufrn.imd.warehouse.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Libera todas as rotas da API (products, tipo-produto, etc)
                .allowedOrigins("http://localhost:5174") // URL exata do seu servidor de dev do React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD") // Métodos HTTP permitidos
                .allowedHeaders("*") // Permite qualquer cabeçalho na requisição
                .allowCredentials(true); // Permite o envio de cookies/autenticação se precisar no futuro
    }
}