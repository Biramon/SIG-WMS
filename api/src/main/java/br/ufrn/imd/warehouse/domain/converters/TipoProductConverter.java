package br.ufrn.imd.warehouse.domain.converters;

import br.ufrn.imd.warehouse.domain.dtos.ProductDto;
import br.ufrn.imd.warehouse.domain.dtos.TipoProdutoDto;
import br.ufrn.imd.warehouse.domain.entities.Product;
import br.ufrn.imd.warehouse.domain.entities.TipoProduto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {SigWmsConverter.class})
public interface TipoProductConverter {
    Product toEntity(TipoProdutoDto dto);

    ProductDto toDto(TipoProduto entity);

    List<TipoProdutoDto> toListDto(List<TipoProduto> entity);
}
