package xyz.itpath.service.mapper;

import org.mapstruct.*;
import xyz.itpath.domain.*;
import xyz.itpath.service.dto.OssConfigDTO;

/**
 * Mapper for the entity {@link OssConfig} and its DTO {@link OssConfigDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OssConfigMapper extends EntityMapper<OssConfigDTO, OssConfig> {}
