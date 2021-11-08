package xyz.itpath.service.mapper;

import org.mapstruct.*;
import xyz.itpath.domain.*;
import xyz.itpath.service.dto.ApiPermissionSimpleDTO;

/**
 * Mapper for the entity {@link ApiPermission} and its DTO {@link ApiPermissionSimpleDTO}.
 */
@Mapper(componentModel = "spring")
public interface ApiPermissionSimpleMapper extends EntityMapper<ApiPermissionSimpleDTO, ApiPermission> {
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    ApiPermissionSimpleDTO toDto(ApiPermission apiPermission);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    ApiPermission toEntity(ApiPermissionSimpleDTO apiPermissionDTO);
}
