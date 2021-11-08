package xyz.itpath.system.repository;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.diboot.core.mapper.BaseCrudMapper;
import java.util.*;
import org.apache.ibatis.annotations.Param;
import xyz.itpath.system.domain.SiteConfig;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data SQL repository for the SiteConfig entity.
 */
@SuppressWarnings("unused")
public interface SiteConfigRepository extends BaseCrudMapper<SiteConfig> {
    default List<SiteConfig> findAll() {
        return this.selectList(null);
    }

    default Optional<SiteConfig> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove
}
