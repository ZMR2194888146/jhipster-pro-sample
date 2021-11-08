package xyz.itpath.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class DepartmentAuthorityDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DepartmentAuthorityDTO.class);
        DepartmentAuthorityDTO departmentAuthorityDTO1 = new DepartmentAuthorityDTO();
        departmentAuthorityDTO1.setId(1L);
        DepartmentAuthorityDTO departmentAuthorityDTO2 = new DepartmentAuthorityDTO();
        assertThat(departmentAuthorityDTO1).isNotEqualTo(departmentAuthorityDTO2);
        departmentAuthorityDTO2.setId(departmentAuthorityDTO1.getId());
        assertThat(departmentAuthorityDTO1).isEqualTo(departmentAuthorityDTO2);
        departmentAuthorityDTO2.setId(2L);
        assertThat(departmentAuthorityDTO1).isNotEqualTo(departmentAuthorityDTO2);
        departmentAuthorityDTO1.setId(null);
        assertThat(departmentAuthorityDTO1).isNotEqualTo(departmentAuthorityDTO2);
    }
}
