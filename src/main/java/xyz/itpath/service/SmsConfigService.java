package xyz.itpath.service;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.diboot.core.binding.Binder;
import com.diboot.core.service.impl.BaseServiceImpl;
import com.google.common.base.CaseFormat;
import java.util.*;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import xyz.itpath.domain.SmsConfig;
import xyz.itpath.repository.SmsConfigRepository;
import xyz.itpath.service.dto.SmsConfigDTO;
import xyz.itpath.service.mapper.SmsConfigMapper;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Service Implementation for managing {@link SmsConfig}.
 */
@Service
public class SmsConfigService extends BaseServiceImpl<SmsConfigRepository, SmsConfig> {

    private final Logger log = LoggerFactory.getLogger(SmsConfigService.class);

    private final SmsConfigRepository smsConfigRepository;

    private final CacheManager cacheManager;

    private final SmsConfigMapper smsConfigMapper;

    public SmsConfigService(SmsConfigRepository smsConfigRepository, CacheManager cacheManager, SmsConfigMapper smsConfigMapper) {
        this.smsConfigRepository = smsConfigRepository;
        this.cacheManager = cacheManager;
        this.smsConfigMapper = smsConfigMapper;
    }

    /**
     * Save a smsConfig.
     *
     * @param smsConfigDTO the entity to save.
     * @return the persisted entity.
     */
    @Transactional
    public SmsConfigDTO save(SmsConfigDTO smsConfigDTO) {
        log.debug("Request to save SmsConfig : {}", smsConfigDTO);
        SmsConfig smsConfig = smsConfigMapper.toEntity(smsConfigDTO);
        this.saveOrUpdate(smsConfig);
        return smsConfigMapper.toDto(smsConfig);
    }

    /**
     * Partially update a smsConfig.
     *
     * @param smsConfigDTO the entity to update partially.
     * @return the persisted entity.
     */
    @Transactional
    public Optional<SmsConfigDTO> partialUpdate(SmsConfigDTO smsConfigDTO) {
        log.debug("Request to partially update SmsConfig : {}", smsConfigDTO);

        return smsConfigRepository
            .findById(smsConfigDTO.getId())
            .map(
                existingSmsConfig -> {
                    smsConfigMapper.partialUpdate(existingSmsConfig, smsConfigDTO);

                    return existingSmsConfig;
                }
            )
            .map(
                tempSmsConfig -> {
                    smsConfigRepository.save(tempSmsConfig);
                    return smsConfigMapper.toDto(smsConfigRepository.selectById(tempSmsConfig.getId()));
                }
            );
    }

    /**
     * Get all the smsConfigs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public IPage<SmsConfigDTO> findAll(Page<SmsConfig> pageable) {
        log.debug("Request to get all SmsConfigs");
        return this.page(pageable).convert(smsConfigMapper::toDto);
    }

    /**
     * Get one smsConfig by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<SmsConfigDTO> findOne(Long id) {
        log.debug("Request to get SmsConfig : {}", id);
        return Optional.ofNullable(smsConfigRepository.selectById(id)).map(smsConfigMapper::toDto);
    }

    /**
     * Delete the smsConfig by id.
     *
     * @param id the id of the entity.
     */
    @Transactional
    public void delete(Long id) {
        log.debug("Request to delete SmsConfig : {}", id);
        smsConfigRepository.deleteById(id);
    }

    /**
     * Update ignore specified fields by smsConfig
     */
    @Transactional
    public SmsConfigDTO updateByIgnoreSpecifiedFields(SmsConfigDTO changeSmsConfigDTO, Set<String> unchangedFields) {
        SmsConfigDTO smsConfigDTO = findOne(changeSmsConfigDTO.getId()).get();
        BeanUtil.copyProperties(changeSmsConfigDTO, smsConfigDTO, unchangedFields.toArray(new String[0]));
        smsConfigDTO = save(smsConfigDTO);
        return smsConfigDTO;
    }

    /**
     * Update specified fields by smsConfig
     */
    @Transactional
    public SmsConfigDTO updateBySpecifiedFields(SmsConfigDTO changeSmsConfigDTO, Set<String> fieldNames) {
        UpdateWrapper<SmsConfig> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", changeSmsConfigDTO.getId());
        fieldNames.forEach(
            fieldName -> {
                updateWrapper.set(
                    CaseFormat.LOWER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, fieldName),
                    BeanUtil.getFieldValue(changeSmsConfigDTO, fieldName)
                );
            }
        );
        this.update(updateWrapper);
        return findOne(changeSmsConfigDTO.getId()).get();
    }

    /**
     * Update specified field by smsConfig
     */
    @Transactional
    public SmsConfigDTO updateBySpecifiedField(SmsConfigDTO changeSmsConfigDTO, String fieldName) {
        SmsConfigDTO update = new SmsConfigDTO();
        BeanUtil.setFieldValue(update, "id", changeSmsConfigDTO.getId());
        BeanUtil.setFieldValue(update, fieldName, BeanUtil.getFieldValue(changeSmsConfigDTO, fieldName));
        this.updateEntity(smsConfigMapper.toEntity(update));
        return findOne(changeSmsConfigDTO.getId()).get();
    }
    // jhipster-needle-service-add-method - JHipster will add getters and setters here, do not remove

}
