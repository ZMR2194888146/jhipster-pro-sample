package xyz.itpath.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class UploadFileDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UploadFileDTO.class);
        UploadFileDTO uploadFileDTO1 = new UploadFileDTO();
        uploadFileDTO1.setId(1L);
        UploadFileDTO uploadFileDTO2 = new UploadFileDTO();
        assertThat(uploadFileDTO1).isNotEqualTo(uploadFileDTO2);
        uploadFileDTO2.setId(uploadFileDTO1.getId());
        assertThat(uploadFileDTO1).isEqualTo(uploadFileDTO2);
        uploadFileDTO2.setId(2L);
        assertThat(uploadFileDTO1).isNotEqualTo(uploadFileDTO2);
        uploadFileDTO1.setId(null);
        assertThat(uploadFileDTO1).isNotEqualTo(uploadFileDTO2);
    }
}
