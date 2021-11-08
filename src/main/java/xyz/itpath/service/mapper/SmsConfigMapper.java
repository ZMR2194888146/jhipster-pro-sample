package xyz.itpath.service.mapper;

import org.mapstruct.*;
import xyz.itpath.domain.*;
import xyz.itpath.service.dto.SmsConfigDTO;

/**
 * Mapper for the entity {@link SmsConfig} and its DTO {@link SmsConfigDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SmsConfigMapper extends EntityMapper<SmsConfigDTO, SmsConfig> {}
