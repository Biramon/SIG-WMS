package br.ufrn.imd.warehouse.domain.dtos;

import java.time.LocalDateTime;

public record TipoProdutoDto(
        Long id,
        String denominacao,
        LocalDateTime createdAt,
        Boolean ativo
) {}