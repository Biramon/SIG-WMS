package br.ufrn.imd.warehouse.domain.converters;

import br.ufrn.imd.warehouse.domain.dtos.TipoProdutoDto;
import br.ufrn.imd.warehouse.domain.dtos.TipoProdutoResumoDto;
import br.ufrn.imd.warehouse.domain.entities.TipoProduto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ProductConverter.class})
public interface TipoProdutoConverter {

    @Mapping(target = "produtos", ignore = true)
    TipoProduto toEntity(TipoProdutoDto dto);

    TipoProdutoDto toDto(TipoProduto entity);

    TipoProdutoResumoDto toResumoDto(TipoProduto entity);

    List<TipoProdutoDto> toListDto(List<TipoProduto> entities);
}