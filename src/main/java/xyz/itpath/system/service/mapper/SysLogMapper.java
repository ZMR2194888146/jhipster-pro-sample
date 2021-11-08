package xyz.itpath.system.service.mapper;

import org.mapstruct.*;
import xyz.itpath.service.mapper.EntityMapper;
import xyz.itpath.system.domain.*;
import xyz.itpath.system.service.dto.SysLogDTO;

/**
 * Mapper for the entity {@link SysLog} and its DTO {@link SysLogDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SysLogMapper extends EntityMapper<SysLogDTO, SysLog> {}
