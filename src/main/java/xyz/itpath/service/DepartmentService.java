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
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import xyz.itpath.domain.Department;
import xyz.itpath.repository.DepartmentRepository;
import xyz.itpath.service.dto.DepartmentDTO;
import xyz.itpath.service.mapper.DepartmentMapper;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Service Implementation for managing {@link Department}.
 */
@Service
public class DepartmentService extends BaseServiceImpl<DepartmentRepository, Department> {

    private final Logger log = LoggerFactory.getLogger(DepartmentService.class);
    private final List<String> relationCacheNames = Arrays.asList(
        xyz.itpath.domain.Department.class.getName() + ".parent",
        xyz.itpath.domain.Authority.class.getName() + ".departments",
        xyz.itpath.domain.Department.class.getName() + ".children",
        xyz.itpath.domain.User.class.getName() + ".department",
        xyz.itpath.domain.DepartmentAuthority.class.getName() + ".department"
    );

    private final DepartmentRepository departmentRepository;

    private final CacheManager cacheManager;

    private final DepartmentMapper departmentMapper;

    public DepartmentService(DepartmentRepository departmentRepository, CacheManager cacheManager, DepartmentMapper departmentMapper) {
        this.departmentRepository = departmentRepository;
        this.cacheManager = cacheManager;
        this.departmentMapper = departmentMapper;
    }

    /**
     * Save a department.
     *
     * @param departmentDTO the entity to save.
     * @return the persisted entity.
     */
    @Transactional
    public DepartmentDTO save(DepartmentDTO departmentDTO) {
        log.debug("Request to save Department : {}", departmentDTO);
        Department department = departmentMapper.toEntity(departmentDTO);
        clearChildrenCache();
        this.saveOrUpdate(department);
        // ????????????
        if (department.getParent() != null) {
            department.getParent().addChildren(department);
        }
        return departmentMapper.toDto(department);
    }

    /**
     * Partially update a department.
     *
     * @param departmentDTO the entity to update partially.
     * @return the persisted entity.
     */
    @Transactional
    public Optional<DepartmentDTO> partialUpdate(DepartmentDTO departmentDTO) {
        log.debug("Request to partially update Department : {}", departmentDTO);

        return departmentRepository
            .findById(departmentDTO.getId())
            .map(
                existingDepartment -> {
                    departmentMapper.partialUpdate(existingDepartment, departmentDTO);

                    return existingDepartment;
                }
            )
            .map(
                tempDepartment -> {
                    departmentRepository.save(tempDepartment);
                    return departmentMapper.toDto(departmentRepository.selectById(tempDepartment.getId()));
                }
            );
    }

    /**
     * Get all the departments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public IPage<DepartmentDTO> findAll(Page<Department> pageable) {
        log.debug("Request to get all Departments");
        return this.page(pageable).convert(departmentMapper::toDto);
    }

    /**
     * Get all the departments for parent is null.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    public IPage<DepartmentDTO> findAllTop(Page<Department> pageable) {
        log.debug("Request to get all Departments for parent is null");
        return departmentRepository
            .findAllByParentIsNull(pageable)
            .convert(
                department -> {
                    Binder.bindRelations(department, new String[] { "authorities", "parent", "users", "departmentAuthorities" });
                    return departmentMapper.toDto(department);
                }
            );
    }

    /**
     * Get all the departments for parent is parentId.
     *
     * @param parentId the Id of parent
     * @return the list of entities
     */
    public List<DepartmentDTO> findChildrenByParentId(Long parentId) {
        log.debug("Request to get all Departments for parent is parentId");
        return departmentRepository
            .selectList(new LambdaUpdateWrapper<Department>().eq(Department::getParentId, parentId))
            .stream()
            .map(
                department -> {
                    Binder.bindRelations(department, new String[] { "authorities", "parent", "users", "departmentAuthorities" });
                    return departmentMapper.toDto(department);
                }
            )
            .collect(Collectors.toList());
    }

    /**
     * Get all the departments with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public IPage<DepartmentDTO> findAllWithEagerRelationships(Page<Department> pageable) {
        IPage<Department> result = departmentRepository.selectPage(pageable, null);
        Binder.bindRelations(result.getRecords(), new String[] { "children", "parent" });
        return result.convert(departmentMapper::toDto);
    }

    /**
     * Get one department by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<DepartmentDTO> findOne(Long id) {
        log.debug("Request to get Department : {}", id);
        return Optional
            .ofNullable(departmentRepository.selectById(id))
            .map(
                department -> {
                    Binder.bindRelations(department);
                    return department;
                }
            )
            .map(departmentMapper::toDto);
    }

    /**
     * Delete the department by id.
     *
     * @param id the id of the entity.
     */
    @Transactional
    public void delete(Long id) {
        log.debug("Request to delete Department : {}", id);
        Department department = departmentRepository.selectById(id);
        if (department.getParent() != null) {
            department.getParent().removeChildren(department);
        }
        if (department.getChildren() != null) {
            department
                .getChildren()
                .forEach(
                    subDepartment -> {
                        subDepartment.setParent(null);
                    }
                );
        }
        departmentRepository.deleteById(id);
    }

    /**
     * Update ignore specified fields by department
     */
    @Transactional
    public DepartmentDTO updateByIgnoreSpecifiedFields(DepartmentDTO changeDepartmentDTO, Set<String> unchangedFields) {
        DepartmentDTO departmentDTO = findOne(changeDepartmentDTO.getId()).get();
        BeanUtil.copyProperties(changeDepartmentDTO, departmentDTO, unchangedFields.toArray(new String[0]));
        departmentDTO = save(departmentDTO);
        return departmentDTO;
    }

    /**
     * Update specified fields by department
     */
    @Transactional
    public DepartmentDTO updateBySpecifiedFields(DepartmentDTO changeDepartmentDTO, Set<String> fieldNames) {
        UpdateWrapper<Department> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", changeDepartmentDTO.getId());
        fieldNames.forEach(
            fieldName -> {
                updateWrapper.set(
                    CaseFormat.LOWER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, fieldName),
                    BeanUtil.getFieldValue(changeDepartmentDTO, fieldName)
                );
            }
        );
        this.update(updateWrapper);
        return findOne(changeDepartmentDTO.getId()).get();
    }

    /**
     * Update specified field by department
     */
    @Transactional
    public DepartmentDTO updateBySpecifiedField(DepartmentDTO changeDepartmentDTO, String fieldName) {
        DepartmentDTO update = new DepartmentDTO();
        BeanUtil.setFieldValue(update, "id", changeDepartmentDTO.getId());
        BeanUtil.setFieldValue(update, fieldName, BeanUtil.getFieldValue(changeDepartmentDTO, fieldName));
        this.updateEntity(departmentMapper.toEntity(update));
        return findOne(changeDepartmentDTO.getId()).get();
    }

    // ??????children??????
    private void clearChildrenCache() {
        Objects.requireNonNull(cacheManager.getCache(xyz.itpath.domain.Department.class.getName() + ".children")).clear();
    }

    private void clearRelationsCache() {
        this.relationCacheNames.forEach(
                cacheName -> {
                    if (cacheManager.getCache(cacheName) != null) {
                        cacheManager.getCache(cacheName).clear();
                    }
                }
            );
    }
    // jhipster-needle-service-add-method - JHipster will add getters and setters here, do not remove

}
