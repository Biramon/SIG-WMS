package br.ufrn.imd.warehouse.controllers;

import br.ufrn.imd.warehouse.business.MessageUtils;
import br.ufrn.imd.warehouse.business.TipoProdutoService;
import br.ufrn.imd.warehouse.domain.converters.TipoProdutoConverter;
import br.ufrn.imd.warehouse.domain.dtos.MessageDto;
import br.ufrn.imd.warehouse.domain.dtos.TipoProdutoDto;
import br.ufrn.imd.warehouse.domain.entities.TipoProduto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/tipos-produto")
public class TipoProdutoController {

    @Autowired
    private TipoProdutoService tipoProdutoService;

    @Autowired
    private TipoProdutoConverter tipoProdutoConverter;

    @Autowired
    private MessageUtils messageUtils;

    @PostMapping("/salvar")
    public ResponseEntity<MessageDto> cadastrar(@RequestBody TipoProdutoDto tipoProdutoDto) {
        TipoProduto tipoProduto = tipoProdutoConverter.toEntity(tipoProdutoDto);
        tipoProdutoService.salvar(tipoProduto);
        return ResponseEntity.ok(messageUtils.getMessage("success.created", "Tipo de Produto"));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<TipoProdutoDto>> listar() {
        List<TipoProduto> tiposProduto = tipoProdutoService.listar();
        List<TipoProdutoDto> tiposProdutoDto = tiposProduto.stream()
                .map(tipoProdutoConverter::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tiposProdutoDto);
    }
    
    @GetMapping("/listarordenado")
    public ResponseEntity<List<TipoProdutoDto>> listarOrdenado() {
        List<TipoProduto> tiposProduto = tipoProdutoService.listarOrdenado();
        List<TipoProdutoDto> tiposProdutoDto = tiposProduto.stream()
                .map(tipoProdutoConverter::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tiposProdutoDto);
    }

}