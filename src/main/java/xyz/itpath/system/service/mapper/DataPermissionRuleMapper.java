package xyz.itpath.system.service.mapper;

import org.mapstruct.*;
import xyz.itpath.service.mapper.EntityMapper;
import xyz.itpath.system.domain.*;
import xyz.itpath.system.service.dto.DataPermissionRuleDTO;

/**
 * Mapper for the entity {@link DataPermissionRule} and its DTO {@link DataPermissionRuleDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DataPermissionRuleMapper extends EntityMapper<DataPermissionRuleDTO, DataPermissionRule> {}
