package br.ufrn.imd.warehouse.controllers;

import br.ufrn.imd.warehouse.business.MessageUtils;
import br.ufrn.imd.warehouse.business.TipoProdutoService;
import br.ufrn.imd.warehouse.domain.converters.TipoProdutoConverter;
import br.ufrn.imd.warehouse.domain.dtos.MessageDto;
import br.ufrn.imd.warehouse.domain.dtos.TipoProdutoDto;
import br.ufrn.imd.warehouse.domain.entities.TipoProduto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
