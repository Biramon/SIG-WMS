package br.ufrn.imd.warehouse.domain.converters;

import br.ufrn.imd.warehouse.domain.dtos.ProductDto;
import br.ufrn.imd.warehouse.domain.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {SigWmsConverter.class})
public interface ProductConverter {

    @Mapping(target = "unidadeMedida", qualifiedByName = "toEntityUnidadeMedida")
    Product toEntity(ProductDto dto);

    @Mapping(target = "unidadeMedida", qualifiedByName = "toDtoUnidadeMedida")
    ProductDto toDto(Product entity);

    List<ProductDto> toListDto(List<Product> entities);
}