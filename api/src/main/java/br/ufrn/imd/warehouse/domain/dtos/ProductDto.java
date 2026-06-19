package br.ufrn.imd.warehouse.domain.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductDto(
        Long id,
        String sku,
        String nome,
        String descricao,
        UnidadeMedidaDto unidadeMedida,
        TipoProdutoDto tipoProduto,
        Integer saldo,
        Boolean ativo,
        LocalDateTime createdAt,
        BigDecimal preco
) {}
