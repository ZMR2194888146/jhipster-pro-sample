package xyz.itpath.system.service.mapper;

import org.mapstruct.*;
import xyz.itpath.service.mapper.EntityMapper;
import xyz.itpath.system.domain.*;
import xyz.itpath.system.service.dto.SmsMessageDTO;

/**
 * Mapper for the entity {@link SmsMessage} and its DTO {@link SmsMessageDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SmsMessageMapper extends EntityMapper<SmsMessageDTO, SmsMessage> {}
