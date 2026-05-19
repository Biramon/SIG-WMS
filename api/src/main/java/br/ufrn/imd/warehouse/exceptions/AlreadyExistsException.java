package br.ufrn.imd.warehouse.exceptions;
public class AlreadyExistsException extends BusinessException {
  public AlreadyExistsException(Object... args) {
    super("already.exists", args);
  }

}