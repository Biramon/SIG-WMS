package br.ufrn.imd.warehouse.controllers;

import br.ufrn.imd.warehouse.business.MessageUtils;
import br.ufrn.imd.warehouse.business.TipoProdutoService;
import br.ufrn.imd.warehouse.domain.converters.SigWmsConverter;
import br.ufrn.imd.warehouse.domain.converters.TipoProdutoConverter;
import br.ufrn.imd.warehouse.domain.dtos.MessageDto;
import br.ufrn.imd.warehouse.domain.dtos.ProductDto;
import br.ufrn.imd.warehouse.domain.dtos.TipoProdutoDto;
import br.ufrn.imd.warehouse.domain.dtos.UnidadeMedidaDto;
import br.ufrn.imd.warehouse.domain.entities.Product;
import br.ufrn.imd.warehouse.domain.entities.TipoProduto;

import java.util.List;
import java.util.stream.Collectors;

import br.ufrn.imd.warehouse.domain.entities.UnidadeMedida;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/tipos-produto")
public class TipoProdutoController {

    @Autowired
    private TipoProdutoService tipoProdutoService;

    @Autowired
    private TipoProdutoConverter tipoProdutoConverter;

    @Autowired
    private MessageUtils messageUtils;

    @Autowired
    private SigWmsConverter sigWmsConverter;

    @PostMapping("/salvar")
    public ResponseEntity<MessageDto> salvar(@RequestBody TipoProdutoDto tipoProdutoDto) {
        TipoProduto tipoProduto = tipoProdutoConverter.toEntity(tipoProdutoDto);
        tipoProdutoService.salvar(tipoProduto);
        return ResponseEntity.ok(messageUtils.getMessage("success.saved", "Tipo de Produto"));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<TipoProdutoDto>> listar() {
        List<TipoProduto> tiposProduto = tipoProdutoService.listar();
        List<TipoProdutoDto> tiposProdutoDto = tipoProdutoConverter.toListDto(tiposProduto);
        return ResponseEntity.ok(tiposProdutoDto);
    }

    @PatchMapping("/toggle-ativo/{id}")
    public ResponseEntity<MessageDto> toggleAtivo(@PathVariable Long id) {
        tipoProdutoService.toggleAtivo(id);
        return ResponseEntity.ok(messageUtils.getMessage("success.updated", "Status do Tipo Produto"));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<TipoProdutoDto> getById(@PathVariable Long id) {
        TipoProduto tipoProduto = tipoProdutoService.getById(id);
        return ResponseEntity.ok(tipoProdutoConverter.toDto(tipoProduto));
    }

}