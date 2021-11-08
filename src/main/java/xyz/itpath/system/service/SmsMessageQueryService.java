package xyz.itpath.system.service;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.diboot.core.binding.Binder;
import com.diboot.core.binding.query.dynamic.DynamicJoinQueryWrapper;
import com.diboot.core.vo.Pagination;
import java.util.*;
import java.util.stream.Collectors;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;
import tech.jhipster.service.filter.ZonedDateTimeFilter;
import xyz.itpath.system.domain.*; // for static metamodels
import xyz.itpath.system.domain.SmsMessage;
import xyz.itpath.system.repository.SmsMessageRepository;
import xyz.itpath.system.service.criteria.SmsMessageCriteria;
import xyz.itpath.system.service.dto.SmsMessageDTO;
import xyz.itpath.system.service.mapper.SmsMessageMapper;
import xyz.itpath.util.CriteriaUtil;
import xyz.itpath.util.mybatis.filter.QueryService;

/**
 * 用于对数据库中的{@link SmsMessage}实体执行复杂查询的Service。
 * 主要输入是一个{@link SmsMessageCriteria}，它被转换为{@link QueryWrapper}，
 * 所有字段过滤器都将应用到表达式中。
 * 它返回满足条件的{@link SmsMessageDTO}列表{@link List} 或 {@link SmsMessageDTO} 的分页列表 {@link Page}。
 */
@Service
@Transactional(readOnly = true)
public class SmsMessageQueryService implements QueryService<SmsMessage> {

    private final Logger log = LoggerFactory.getLogger(SmsMessageQueryService.class);

    private final DynamicJoinQueryWrapper<SmsMessage, SmsMessage> dynamicJoinQueryWrapper = new DynamicJoinQueryWrapper<>(
        SmsMessage.class,
        null
    );

    private final SmsMessageRepository smsMessageRepository;

    private final SmsMessageMapper smsMessageMapper;

    public SmsMessageQueryService(SmsMessageRepository smsMessageRepository, SmsMessageMapper smsMessageMapper) {
        this.smsMessageRepository = smsMessageRepository;
        this.smsMessageMapper = smsMessageMapper;
    }

    /**
     * Return a {@link List} of {@link SmsMessageDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<SmsMessageDTO> findByCriteria(SmsMessageCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final QueryWrapper<SmsMessage> queryWrapper = createQueryWrapper(criteria);
        return smsMessageMapper.toDto(smsMessageRepository.selectList(queryWrapper));
    }

    /**
     * Return a {@link IPage} of {@link SmsMessageDTO} which matches the criteria from the database.
     * @param queryWrapper The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public IPage<SmsMessageDTO> findByQueryWrapper(QueryWrapper<SmsMessage> queryWrapper, Page<SmsMessage> page) {
        log.debug("find by criteria : {}, page: {}", queryWrapper, page);
        return smsMessageRepository.selectPage(page, queryWrapper).convert(smsMessageMapper::toDto);
    }

    /**
     * Return a {@link IPage} of {@link SmsMessageDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public IPage<SmsMessageDTO> findByCriteria(SmsMessageCriteria criteria, Page<SmsMessage> page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final QueryWrapper<SmsMessage> queryWrapper = createQueryWrapper(criteria);
        return smsMessageRepository.selectPage(page, queryWrapper).convert(smsMessageMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(SmsMessageCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final QueryWrapper<SmsMessage> queryWrapper = createQueryWrapper(criteria);
        return smsMessageRepository.selectCount(queryWrapper);
    }

    /**
     * Return a {@link SmsMessageDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entity.
     */
    @Transactional(readOnly = true)
    public Optional<SmsMessageDTO> getOneByCriteria(SmsMessageCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final QueryWrapper<SmsMessage> queryWrapper = createQueryWrapper(criteria);
        return Optional.of(smsMessageMapper.toDto(smsMessageRepository.selectOne(queryWrapper)));
    }

    /**
     * Return the number of matching entities in the database.
     * @param queryWrapper The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByQueryWrapper(QueryWrapper queryWrapper) {
        log.debug("count by queryWrapper : {}", queryWrapper);
        return smsMessageRepository.selectCount(queryWrapper);
    }

    public long countByFieldNameAndCriteria(String fieldName, Boolean distinct, SmsMessageCriteria criteria) {
        return smsMessageRepository.selectCount(createQueryWrapper(criteria));
    }

    public <T> List<T> getFieldByCriteria(Class<T> clazz, String fieldName, Boolean distinct, SmsMessageCriteria criteria) {
        return (List<T>) smsMessageRepository.selectObjs(createQueryWrapper(criteria).select(fieldName));
    }

    /**
     * Function to convert {@link SmsMessageCriteria} to a {@link QueryWrapper}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link QueryWrapper} of the entity.
     */
    protected QueryWrapper<SmsMessage> createQueryWrapper(SmsMessageCriteria criteria) {
        QueryWrapper<SmsMessage> queryWrapper = new DynamicJoinQueryWrapper<>(SmsMessage.class, null);
        if (criteria != null) {
            if (StringUtils.isNotEmpty(criteria.getJhiCommonSearchKeywords())) {
                if (StringUtils.isNumeric(criteria.getJhiCommonSearchKeywords())) {
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildSpecification(new LongFilter().setEquals(Long.valueOf(criteria.getJhiCommonSearchKeywords())), "id")
                        );
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildRangeSpecification(
                                (LongFilter) new LongFilter().setEquals(Long.valueOf(criteria.getJhiCommonSearchKeywords())),
                                "id"
                            )
                        );
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildRangeSpecification(
                                (IntegerFilter) new IntegerFilter().setEquals(Integer.valueOf(criteria.getJhiCommonSearchKeywords())),
                                "retry_num"
                            )
                        );
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildRangeSpecification(
                                (LongFilter) new LongFilter().setEquals(Long.valueOf(criteria.getJhiCommonSearchKeywords())),
                                "created_by"
                            )
                        );
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildRangeSpecification(
                                (LongFilter) new LongFilter().setEquals(Long.valueOf(criteria.getJhiCommonSearchKeywords())),
                                "last_modified_by"
                            )
                        );
                } else {
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildStringSpecification(new StringFilter().setContains(criteria.getJhiCommonSearchKeywords()), "title")
                        );
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildStringSpecification(new StringFilter().setContains(criteria.getJhiCommonSearchKeywords()), "receiver")
                        );
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildStringSpecification(new StringFilter().setContains(criteria.getJhiCommonSearchKeywords()), "params")
                        );
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildStringSpecification(new StringFilter().setContains(criteria.getJhiCommonSearchKeywords()), "fail_result")
                        );
                    queryWrapper =
                        CriteriaUtil.build(
                            true,
                            queryWrapper,
                            buildStringSpecification(new StringFilter().setContains(criteria.getJhiCommonSearchKeywords()), "remark")
                        );
                }
            } else {
                if (criteria.getId() != null) {
                    queryWrapper = CriteriaUtil.build(criteria.getUseOr(), queryWrapper, buildRangeSpecification(criteria.getId(), "id"));
                }
                if (criteria.getTitle() != null) {
                    queryWrapper =
                        CriteriaUtil.build(criteria.getUseOr(), queryWrapper, buildStringSpecification(criteria.getTitle(), "title"));
                }
                if (criteria.getSendType() != null) {
                    queryWrapper =
                        CriteriaUtil.build(criteria.getUseOr(), queryWrapper, buildSpecification(criteria.getSendType(), "send_type"));
                }
                if (criteria.getReceiver() != null) {
                    queryWrapper =
                        CriteriaUtil.build(criteria.getUseOr(), queryWrapper, buildStringSpecification(criteria.getReceiver(), "receiver"));
                }
                if (criteria.getParams() != null) {
                    queryWrapper =
                        CriteriaUtil.build(criteria.getUseOr(), queryWrapper, buildStringSpecification(criteria.getParams(), "params"));
                }
                if (criteria.getSendTime() != null) {
                    queryWrapper =
                        CriteriaUtil.build(criteria.getUseOr(), queryWrapper, buildRangeSpecification(criteria.getSendTime(), "send_time"));
                }
                if (criteria.getSendStatus() != null) {
                    queryWrapper =
                        CriteriaUtil.build(criteria.getUseOr(), queryWrapper, buildSpecification(criteria.getSendStatus(), "send_status"));
                }
                if (criteria.getRetryNum() != null) {
                    queryWrapper =
                        CriteriaUtil.build(criteria.getUseOr(), queryWrapper, buildRangeSpecification(criteria.getRetryNum(), "retry_num"));
                }
                if (criteria.getFailResult() != null) {
                    queryWrapper =
                        CriteriaUtil.build(
                            criteria.getUseOr(),
                            queryWrapper,
                            buildStringSpecification(criteria.getFailResult(), "fail_result")
                        );
                }
                if (criteria.getRemark() != null) {
                    queryWrapper =
                        CriteriaUtil.build(criteria.getUseOr(), queryWrapper, buildStringSpecification(criteria.getRemark(), "remark"));
                }
                if (criteria.getCreatedBy() != null) {
                    queryWrapper =
                        CriteriaUtil.build(
                            criteria.getUseOr(),
                            queryWrapper,
                            buildRangeSpecification(criteria.getCreatedBy(), "created_by")
                        );
                }
                if (criteria.getCreatedDate() != null) {
                    queryWrapper =
                        CriteriaUtil.build(
                            criteria.getUseOr(),
                            queryWrapper,
                            buildRangeSpecification(criteria.getCreatedDate(), "created_date")
                        );
                }
                if (criteria.getLastModifiedBy() != null) {
                    queryWrapper =
                        CriteriaUtil.build(
                            criteria.getUseOr(),
                            queryWrapper,
                            buildRangeSpecification(criteria.getLastModifiedBy(), "last_modified_by")
                        );
                }
                if (criteria.getLastModifiedDate() != null) {
                    queryWrapper =
                        CriteriaUtil.build(
                            criteria.getUseOr(),
                            queryWrapper,
                            buildRangeSpecification(criteria.getLastModifiedDate(), "last_modified_date")
                        );
                }
            }
        }
        return queryWrapper;
    }
}
