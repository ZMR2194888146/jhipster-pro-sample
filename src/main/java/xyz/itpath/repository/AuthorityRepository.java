package xyz.itpath.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.diboot.core.mapper.BaseCrudMapper;
import java.util.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import xyz.itpath.domain.Authority;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data SQL repository for the Authority entity.
 */
public interface AuthorityRepository extends BaseCrudMapper<Authority> {
    default List<Authority> findAll() {
        return this.selectList(null);
    }

    default Optional<Authority> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }

    default IPage<Authority> findAllByParentIsNull(IPage<Authority> pageable) {
        return this.selectPage(pageable, new QueryWrapper<Authority>().isNull("parent_id"));
    }

    default Optional<Authority> findFirstByCode(String code) {
        return Optional.ofNullable(this.selectOne(new LambdaQueryWrapper<Authority>().eq(Authority::getCode, code)));
    }
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove
}
