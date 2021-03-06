package xyz.itpath.system.repository;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.diboot.core.mapper.BaseCrudMapper;
import java.util.*;
import org.apache.ibatis.annotations.Param;
import xyz.itpath.system.domain.DataPermissionRule;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data SQL repository for the DataPermissionRule entity.
 */
@SuppressWarnings("unused")
public interface DataPermissionRuleRepository extends BaseCrudMapper<DataPermissionRule> {
    default List<DataPermissionRule> findAll() {
        return this.selectList(null);
    }

    default Optional<DataPermissionRule> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove
}
