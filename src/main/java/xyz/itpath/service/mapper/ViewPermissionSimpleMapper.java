package xyz.itpath.service.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import xyz.itpath.domain.ViewPermission;
import xyz.itpath.service.dto.ViewPermissionSimpleDTO;

@Mapper(componentModel = "spring")
public interface ViewPermissionSimpleMapper extends EntityMapper<ViewPermissionSimpleDTO, ViewPermission> {
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "text", source = "text")
    ViewPermissionSimpleDTO toDto(ViewPermission viewPermission);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "text", source = "text")
    ViewPermission toEntity(ViewPermissionSimpleDTO viewPermissionSimpleDTO);
}
