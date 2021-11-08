package xyz.itpath.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class RegionCodeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegionCodeDTO.class);
        RegionCodeDTO regionCodeDTO1 = new RegionCodeDTO();
        regionCodeDTO1.setId(1L);
        RegionCodeDTO regionCodeDTO2 = new RegionCodeDTO();
        assertThat(regionCodeDTO1).isNotEqualTo(regionCodeDTO2);
        regionCodeDTO2.setId(regionCodeDTO1.getId());
        assertThat(regionCodeDTO1).isEqualTo(regionCodeDTO2);
        regionCodeDTO2.setId(2L);
        assertThat(regionCodeDTO1).isNotEqualTo(regionCodeDTO2);
        regionCodeDTO1.setId(null);
        assertThat(regionCodeDTO1).isNotEqualTo(regionCodeDTO2);
    }
}
