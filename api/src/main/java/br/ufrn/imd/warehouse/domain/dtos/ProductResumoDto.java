package br.ufrn.imd.warehouse.domain.dtos;

import java.time.LocalDateTime;

public record ProductResumoDto(
        Long id,
        String sku,
        String nome,
        String descricao,
        UnidadeMedidaDto unidadeMedida,
        Integer saldo,
        Boolean ativo,
        LocalDateTime createdAt
) {}