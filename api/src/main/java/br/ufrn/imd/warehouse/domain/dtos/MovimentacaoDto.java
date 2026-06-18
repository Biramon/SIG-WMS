package br.ufrn.imd.warehouse.domain.dtos;

import java.time.LocalDateTime;

public record MovimentacaoDto(
        Long id,
        int quantidade,
        String observacao,
        TipoMovimentacaoDto tipoMovimentacao,
        LocalDateTime createdAt,
        Boolean ativo
) {
    
}
