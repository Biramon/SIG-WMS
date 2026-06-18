package br.ufrn.imd.warehouse.controllers;

import br.ufrn.imd.warehouse.business.MessageUtils;
import br.ufrn.imd.warehouse.business.ProductService;
import br.ufrn.imd.warehouse.domain.converters.ProductConverter;
import br.ufrn.imd.warehouse.domain.dtos.MessageDto;
import br.ufrn.imd.warehouse.domain.dtos.ProductDto;
import br.ufrn.imd.warehouse.domain.entities.Product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductConverter productConverter;

    @Autowired
    private MessageUtils messageUtils;

    @PostMapping("/salvar")
    public ResponseEntity<MessageDto> salvar(@RequestBody ProductDto productDto) {
        Product product = productConverter.toEntity(productDto);
        productService.salvar(product);
        return ResponseEntity.ok(messageUtils.getMessage("success.saved", "Produto"));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable Long id) {
        Product product = productService.getById(id);
        return ResponseEntity.ok(productConverter.toDto(product));
    }

    @DeleteMapping("/desativar/{id}")
    public ResponseEntity<MessageDto> desativar(@PathVariable Long id) {
        productService.desativar(id);
        return ResponseEntity.ok(messageUtils.getMessage("success.deleted", "Produto"));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProductDto>> listar() {
        List<Product> products = productService.listar();
        return ResponseEntity.ok(productConverter.toListDto(products));
    }

}
