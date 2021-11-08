package xyz.itpath.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class SmsConfigDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SmsConfigDTO.class);
        SmsConfigDTO smsConfigDTO1 = new SmsConfigDTO();
        smsConfigDTO1.setId(1L);
        SmsConfigDTO smsConfigDTO2 = new SmsConfigDTO();
        assertThat(smsConfigDTO1).isNotEqualTo(smsConfigDTO2);
        smsConfigDTO2.setId(smsConfigDTO1.getId());
        assertThat(smsConfigDTO1).isEqualTo(smsConfigDTO2);
        smsConfigDTO2.setId(2L);
        assertThat(smsConfigDTO1).isNotEqualTo(smsConfigDTO2);
        smsConfigDTO1.setId(null);
        assertThat(smsConfigDTO1).isNotEqualTo(smsConfigDTO2);
    }
}
