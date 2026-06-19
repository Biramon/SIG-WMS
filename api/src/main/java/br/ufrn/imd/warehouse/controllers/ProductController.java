package br.ufrn.imd.warehouse.controllers;

import br.ufrn.imd.warehouse.business.MessageUtils;
import br.ufrn.imd.warehouse.business.ProductService;
import br.ufrn.imd.warehouse.domain.converters.ProductConverter;
import br.ufrn.imd.warehouse.domain.converters.SigWmsConverter;
import br.ufrn.imd.warehouse.domain.dtos.MessageDto;
import br.ufrn.imd.warehouse.domain.dtos.ProductDto;
import br.ufrn.imd.warehouse.domain.dtos.UnidadeMedidaDto;
import br.ufrn.imd.warehouse.domain.entities.Product;

import java.util.List;

import br.ufrn.imd.warehouse.domain.entities.UnidadeMedida;
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
    @Autowired
    private SigWmsConverter sigWmsConverter;

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

    @PatchMapping("/toggle-ativo/{id}")
    public ResponseEntity<MessageDto> toggleAtivo(@PathVariable Long id) {
        productService.toggleAtivo(id);
        return ResponseEntity.ok(messageUtils.getMessage("success.updated", "Status do produto"));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProductDto>> listar() {
        List<Product> products = productService.listar();
        return ResponseEntity.ok(productConverter.toListDto(products));
    }

    @GetMapping("/unidades-medida")
    public ResponseEntity<List<UnidadeMedidaDto>> listarUnidadesMedidas() {
        List<UnidadeMedida> unidades = productService.unidadesMedida();
        return ResponseEntity.ok(sigWmsConverter.toDtoList(unidades));
    }

}
