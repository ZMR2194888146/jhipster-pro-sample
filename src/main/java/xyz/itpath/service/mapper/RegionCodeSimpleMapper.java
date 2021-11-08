package xyz.itpath.service.mapper;

import org.mapstruct.*;
import xyz.itpath.domain.*;
import xyz.itpath.service.dto.RegionCodeSimpleDTO;

/**
 * Mapper for the entity {@link RegionCode} and its DTO {@link RegionCodeSimpleDTO}.
 */
@Mapper(componentModel = "spring")
public interface RegionCodeSimpleMapper extends EntityMapper<RegionCodeSimpleDTO, RegionCode> {
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    RegionCodeSimpleDTO toDto(RegionCode regionCode);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    RegionCode toEntity(RegionCodeSimpleDTO regionCodeDTO);
}
