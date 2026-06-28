package br.ufrn.imd.warehouse.unidade;

import br.ufrn.imd.warehouse.business.TipoProdutoService;
import br.ufrn.imd.warehouse.domain.entities.TipoProduto;
import br.ufrn.imd.warehouse.persistence.TipoProdutoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TipoProdutoServiceTest {

    @Mock
    private TipoProdutoRepository tipoProdutoRepository;

    @InjectMocks
    private TipoProdutoService tipoProdutoService;

    private TipoProduto tipoProduto;

    @BeforeEach
    void setUp() {
        tipoProduto = new TipoProduto();
        tipoProduto.setId(1L);
        tipoProduto.setDenominacao("teste");
    }

    @Test
    void salvar(){
        when(tipoProdutoRepository.findByDenominacao("teste")).thenReturn(null);
        when(tipoProdutoRepository.save(tipoProduto)).thenReturn(tipoProduto);

        TipoProduto salvo = tipoProdutoService.salvar(tipoProduto);

        assertNotNull(salvo);
        assertEquals(1L, salvo.getId());
    }
}