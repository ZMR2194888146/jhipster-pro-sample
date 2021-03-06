package xyz.itpath.repository;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.diboot.core.mapper.BaseCrudMapper;
import java.util.*;
import org.apache.ibatis.annotations.Param;
import xyz.itpath.domain.SysFillRule;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data SQL repository for the SysFillRule entity.
 */
@SuppressWarnings("unused")
public interface SysFillRuleRepository extends BaseCrudMapper<SysFillRule> {
    default List<SysFillRule> findAll() {
        return this.selectList(null);
    }

    default Optional<SysFillRule> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove
}
