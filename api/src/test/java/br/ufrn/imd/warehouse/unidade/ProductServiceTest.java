package br.ufrn.imd.warehouse.unidade;

import br.ufrn.imd.warehouse.business.ProductService;
import br.ufrn.imd.warehouse.domain.entities.Product;
import br.ufrn.imd.warehouse.domain.entities.TipoProduto;
import br.ufrn.imd.warehouse.exceptions.NotFoundException;
import br.ufrn.imd.warehouse.persistence.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
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
    void salvar(){
        when(productRepository.countBySkuStartingWith(anyString())).thenReturn(0L);
        when(productRepository.save(product)).thenReturn(product);

        Product salvo = productService.salvar(product);

        assertNotNull(salvo);
        assertEquals(0, salvo.getSaldo());
        assertNotNull(salvo.getSku());
    }

    @Test
    void getById(){
        product.setId(1L);
        productRepository.save(product);
        when(productRepository.getById(1L)).thenReturn(product);
        product = productService.getById(1L);
        assertNotNull(product);
        assertEquals(1L, product.getId());
    }

    @Test
    void getByIdNotFound(){
        when(productRepository.getById(2L)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> {
            productService.getById(2L);
        });
    }

    @Test
    void listar(){
        productRepository.save(product);
        when(productRepository.findAll()).thenReturn(List.of(product));
        List<Product> products = productService.listar();
        assertNotNull(products);
        assertEquals(1, products.size());
    }
}