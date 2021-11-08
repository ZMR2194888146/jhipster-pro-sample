package xyz.itpath.system.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class DataPermissionRuleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataPermissionRuleDTO.class);
        DataPermissionRuleDTO dataPermissionRuleDTO1 = new DataPermissionRuleDTO();
        dataPermissionRuleDTO1.setId(1L);
        DataPermissionRuleDTO dataPermissionRuleDTO2 = new DataPermissionRuleDTO();
        assertThat(dataPermissionRuleDTO1).isNotEqualTo(dataPermissionRuleDTO2);
        dataPermissionRuleDTO2.setId(dataPermissionRuleDTO1.getId());
        assertThat(dataPermissionRuleDTO1).isEqualTo(dataPermissionRuleDTO2);
        dataPermissionRuleDTO2.setId(2L);
        assertThat(dataPermissionRuleDTO1).isNotEqualTo(dataPermissionRuleDTO2);
        dataPermissionRuleDTO1.setId(null);
        assertThat(dataPermissionRuleDTO1).isNotEqualTo(dataPermissionRuleDTO2);
    }
}
