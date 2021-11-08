package xyz.itpath.system.service.mapper;

import org.mapstruct.*;
import xyz.itpath.service.mapper.EntityMapper;
import xyz.itpath.system.domain.*;
import xyz.itpath.system.service.dto.SmsTemplateDTO;

/**
 * Mapper for the entity {@link SmsTemplate} and its DTO {@link SmsTemplateDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SmsTemplateMapper extends EntityMapper<SmsTemplateDTO, SmsTemplate> {}
