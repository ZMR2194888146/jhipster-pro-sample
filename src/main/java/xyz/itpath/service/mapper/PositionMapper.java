package xyz.itpath.service.mapper;

import org.mapstruct.*;
import xyz.itpath.domain.*;
import xyz.itpath.service.dto.PositionDTO;

/**
 * Mapper for the entity {@link Position} and its DTO {@link PositionDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PositionMapper extends EntityMapper<PositionDTO, Position> {
    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    PositionDTO toDtoName(Position position);
}
