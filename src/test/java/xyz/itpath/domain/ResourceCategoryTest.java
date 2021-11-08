package xyz.itpath.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class ResourceCategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResourceCategory.class);
        ResourceCategory resourceCategory1 = new ResourceCategory();
        resourceCategory1.setId(1L);
        ResourceCategory resourceCategory2 = new ResourceCategory();
        resourceCategory2.setId(resourceCategory1.getId());
        assertThat(resourceCategory1).isEqualTo(resourceCategory2);
        resourceCategory2.setId(2L);
        assertThat(resourceCategory1).isNotEqualTo(resourceCategory2);
        resourceCategory1.setId(null);
        assertThat(resourceCategory1).isNotEqualTo(resourceCategory2);
    }
}
