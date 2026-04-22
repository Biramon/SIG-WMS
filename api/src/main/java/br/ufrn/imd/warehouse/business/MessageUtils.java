package br.ufrn.imd.warehouse.business;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import br.ufrn.imd.warehouse.domain.dtos.MessageDto;

@Component
public class MessageUtils {

    private static MessageSource messageSource;

    public MessageUtils(MessageSource messageSource) {
        MessageUtils.messageSource = messageSource;
    }

    public static MessageDto get(String key, Object... args) {
        String message = messageSource.getMessage(key, args, LocaleContextHolder.getLocale());
        return new MessageDto(message);
    }
}