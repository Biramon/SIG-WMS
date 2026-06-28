package br.ufrn.imd.warehouse.integration;

import br.ufrn.imd.warehouse.domain.dtos.MessageDto;
import br.ufrn.imd.warehouse.domain.dtos.TipoProdutoDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TipoProdutoControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private TipoProdutoDto tipoProdutoDto;

    @BeforeEach
    void setUp() {
        tipoProdutoDto = new TipoProdutoDto(
                null,
                "Eletrônicos",
                LocalDateTime.now(),
                true
        );
    }

    @Test
    void deveSalvarTipoProdutoComSucesso() {
        ResponseEntity<MessageDto> resposta = restTemplate.postForEntity(
                "/tipos-produto/salvar",
                tipoProdutoDto,
                MessageDto.class
        );

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertNotNull(resposta.getBody());
    }
}