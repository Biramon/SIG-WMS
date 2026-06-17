package br.ufrn.imd.warehouse.domain.dtos;

import java.time.LocalDateTime;

public record TipoProdutoResumoDto(
        Long id,
        String denominacao,
        LocalDateTime createdAt
) {}