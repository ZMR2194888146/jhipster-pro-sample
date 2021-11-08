package xyz.itpath.system.service.mapper;

import org.mapstruct.*;
import xyz.itpath.service.mapper.EntityMapper;
import xyz.itpath.system.domain.*;
import xyz.itpath.system.service.dto.AnnouncementRecordDTO;

/**
 * Mapper for the entity {@link AnnouncementRecord} and its DTO {@link AnnouncementRecordDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AnnouncementRecordMapper extends EntityMapper<AnnouncementRecordDTO, AnnouncementRecord> {}
