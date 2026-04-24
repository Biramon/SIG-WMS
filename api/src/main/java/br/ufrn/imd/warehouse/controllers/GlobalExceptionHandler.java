package br.ufrn.imd.warehouse.controllers;

import br.ufrn.imd.warehouse.business.MessageUtils;
import br.ufrn.imd.warehouse.domain.dtos.MessageDto;
import br.ufrn.imd.warehouse.exceptions.AlreadyExistsException;
import br.ufrn.imd.warehouse.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

   @Autowired
   private MessageUtils messageUtils;

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public MessageDto handleNotFoundException(NotFoundException ex) {
        return messageUtils.getMessage(ex.getMessage(), ex.getArgs());
    }

    @ExceptionHandler(AlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public MessageDto handleAlreadyExistsException(AlreadyExistsException ex) {
        return messageUtils.getMessage(ex.getMessage(), ex.getArgs());
    }
}