package xyz.itpath.system.repository;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.diboot.core.mapper.BaseCrudMapper;
import java.util.*;
import org.apache.ibatis.annotations.Param;
import xyz.itpath.system.domain.SmsTemplate;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data SQL repository for the SmsTemplate entity.
 */
@SuppressWarnings("unused")
public interface SmsTemplateRepository extends BaseCrudMapper<SmsTemplate> {
    default List<SmsTemplate> findAll() {
        return this.selectList(null);
    }

    default Optional<SmsTemplate> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove
}
