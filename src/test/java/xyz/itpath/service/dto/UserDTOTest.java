package xyz.itpath.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class UserDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserDTO.class);
        UserDTO userDTO1 = new UserDTO();
        userDTO1.setId(1L);
        UserDTO userDTO2 = new UserDTO();
        assertThat(userDTO1).isNotEqualTo(userDTO2);
        userDTO2.setId(userDTO1.getId());
        assertThat(userDTO1).isEqualTo(userDTO2);
        userDTO2.setId(2L);
        assertThat(userDTO1).isNotEqualTo(userDTO2);
        userDTO1.setId(null);
        assertThat(userDTO1).isNotEqualTo(userDTO2);
    }
}