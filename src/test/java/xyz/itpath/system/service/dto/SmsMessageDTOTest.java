package xyz.itpath.system.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class SmsMessageDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SmsMessageDTO.class);
        SmsMessageDTO smsMessageDTO1 = new SmsMessageDTO();
        smsMessageDTO1.setId(1L);
        SmsMessageDTO smsMessageDTO2 = new SmsMessageDTO();
        assertThat(smsMessageDTO1).isNotEqualTo(smsMessageDTO2);
        smsMessageDTO2.setId(smsMessageDTO1.getId());
        assertThat(smsMessageDTO1).isEqualTo(smsMessageDTO2);
        smsMessageDTO2.setId(2L);
        assertThat(smsMessageDTO1).isNotEqualTo(smsMessageDTO2);
        smsMessageDTO1.setId(null);
        assertThat(smsMessageDTO1).isNotEqualTo(smsMessageDTO2);
    }
}
