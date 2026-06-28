package br.ufrn.imd.warehouse.unidade;

import br.ufrn.imd.warehouse.business.ProductService;
import br.ufrn.imd.warehouse.domain.entities.Product;
import br.ufrn.imd.warehouse.domain.entities.TipoProduto;
import br.ufrn.imd.warehouse.persistence.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    private Product product;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private TipoProduto tipoProduto;

    @BeforeEach
    void setUp() {
        tipoProduto = new TipoProduto();
        tipoProduto.setDenominacao("teste");
        tipoProduto.setId(1L);
        tipoProduto.setAtivo(true);
        tipoProduto.setCreatedAt(LocalDateTime.now());

        product = new Product();
        product.setId(null);
        product.setTipoProduto(tipoProduto);
        product.setNome("teste");
        product.setPreco(new BigDecimal(1));
        product.setDescricao("teste");
    }

    @Test
    void deveDefinirSaldoComoZeroAoSalvarNovoProduto(){
        when(productRepository.countBySkuStartingWith(anyString())).thenReturn(0L);
        when(productRepository.save(product)).thenAnswer(invocation -> invocation.getArgument(0));

        Product salvo = productService.salvar(product);

        assertNotNull(salvo);
        assertEquals(0, salvo.getSaldo());
        assertNotNull(salvo.getSku());
    }
}