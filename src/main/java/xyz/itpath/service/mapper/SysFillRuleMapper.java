package xyz.itpath.service.mapper;

import org.mapstruct.*;
import xyz.itpath.domain.*;
import xyz.itpath.service.dto.SysFillRuleDTO;

/**
 * Mapper for the entity {@link SysFillRule} and its DTO {@link SysFillRuleDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SysFillRuleMapper extends EntityMapper<SysFillRuleDTO, SysFillRule> {}
