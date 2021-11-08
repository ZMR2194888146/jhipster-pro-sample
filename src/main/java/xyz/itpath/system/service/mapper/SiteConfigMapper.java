package xyz.itpath.system.service.mapper;

import org.mapstruct.*;
import xyz.itpath.service.mapper.EntityMapper;
import xyz.itpath.system.domain.*;
import xyz.itpath.system.service.dto.SiteConfigDTO;

/**
 * Mapper for the entity {@link SiteConfig} and its DTO {@link SiteConfigDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SiteConfigMapper extends EntityMapper<SiteConfigDTO, SiteConfig> {}
