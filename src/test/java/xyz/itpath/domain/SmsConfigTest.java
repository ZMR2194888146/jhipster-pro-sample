package xyz.itpath.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class SmsConfigTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SmsConfig.class);
        SmsConfig smsConfig1 = new SmsConfig();
        smsConfig1.setId(1L);
        SmsConfig smsConfig2 = new SmsConfig();
        smsConfig2.setId(smsConfig1.getId());
        assertThat(smsConfig1).isEqualTo(smsConfig2);
        smsConfig2.setId(2L);
        assertThat(smsConfig1).isNotEqualTo(smsConfig2);
        smsConfig1.setId(null);
        assertThat(smsConfig1).isNotEqualTo(smsConfig2);
    }
}
