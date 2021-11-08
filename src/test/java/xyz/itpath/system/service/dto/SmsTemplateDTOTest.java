package xyz.itpath.system.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class SmsTemplateDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SmsTemplateDTO.class);
        SmsTemplateDTO smsTemplateDTO1 = new SmsTemplateDTO();
        smsTemplateDTO1.setId(1L);
        SmsTemplateDTO smsTemplateDTO2 = new SmsTemplateDTO();
        assertThat(smsTemplateDTO1).isNotEqualTo(smsTemplateDTO2);
        smsTemplateDTO2.setId(smsTemplateDTO1.getId());
        assertThat(smsTemplateDTO1).isEqualTo(smsTemplateDTO2);
        smsTemplateDTO2.setId(2L);
        assertThat(smsTemplateDTO1).isNotEqualTo(smsTemplateDTO2);
        smsTemplateDTO1.setId(null);
        assertThat(smsTemplateDTO1).isNotEqualTo(smsTemplateDTO2);
    }
}
