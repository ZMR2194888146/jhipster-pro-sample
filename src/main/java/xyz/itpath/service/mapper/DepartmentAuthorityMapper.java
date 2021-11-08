package xyz.itpath.service.mapper;

import org.mapstruct.*;
import xyz.itpath.domain.*;
import xyz.itpath.service.dto.DepartmentAuthorityDTO;

/**
 * Mapper for the entity {@link DepartmentAuthority} and its DTO {@link DepartmentAuthorityDTO}.
 */
@Mapper(componentModel = "spring", uses = { DepartmentMapper.class })
public interface DepartmentAuthorityMapper extends EntityMapper<DepartmentAuthorityDTO, DepartmentAuthority> {
    @Mapping(target = "department", source = "department", qualifiedByName = "name")
    DepartmentAuthorityDTO toDto(DepartmentAuthority departmentAuthority);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DepartmentAuthorityDTO toDtoId(DepartmentAuthority departmentAuthority);
}
