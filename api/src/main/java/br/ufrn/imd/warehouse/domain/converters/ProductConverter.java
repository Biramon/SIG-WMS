package br.ufrn.imd.warehouse.domain.converters;

import br.ufrn.imd.warehouse.domain.dtos.ProductDto;

import br.ufrn.imd.warehouse.domain.entities.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {SigWmsConverter.class})
public interface ProductConverter {

    Product toEntity(ProductDto dto);

    ProductDto toDto(Product product);

    List<ProductDto> toListDto(List<Product> products);
}