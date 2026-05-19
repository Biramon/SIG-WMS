package br.ufrn.imd.warehouse.exceptions;
//Comentário teste 2
public class AlreadyExistsException extends BusinessException {
  public AlreadyExistsException(Object... args) {
    super("already.exists", args);
  }
}