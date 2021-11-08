package xyz.itpath.service.mapper;

import org.mapstruct.*;
import xyz.itpath.domain.*;
import xyz.itpath.service.dto.UReportFileDTO;

/**
 * Mapper for the entity {@link UReportFile} and its DTO {@link UReportFileDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UReportFileMapper extends EntityMapper<UReportFileDTO, UReportFile> {}
