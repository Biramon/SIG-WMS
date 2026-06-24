package br.ufrn.imd.warehouse.domain.converters;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.ufrn.imd.warehouse.domain.dtos.MovimentacaoDto;
import br.ufrn.imd.warehouse.domain.entities.Movimentacao;

@Mapper(componentModel = "spring", uses = {ProductConverter.class, SigWmsConverter.class})
public interface MovimentacaoConverter {

    @Mapping(target = "tipoMovimentacao", qualifiedByName = "toEntityTipoMovimentacao")
    Movimentacao toEntity(MovimentacaoDto movimentacaoDto);

    @Mapping(target = "tipoMovimentacao", qualifiedByName = "toDtoTipoMovimentacao")
    MovimentacaoDto toDto(Movimentacao movimentacao);

    List<MovimentacaoDto> toListDto(List<Movimentacao> movimentacoes);
}