package br.ufrn.imd.warehouse.domain.dtos;

import java.time.LocalDateTime;
import java.util.List;

public record TipoProdutoDto(
        Long id,
        String denominacao,
        List<ProductDto> produtos,
        LocalDateTime createdAt
) {}