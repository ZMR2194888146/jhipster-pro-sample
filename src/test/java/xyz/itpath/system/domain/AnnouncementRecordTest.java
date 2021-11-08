package xyz.itpath.system.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import xyz.itpath.web.rest.TestUtil;

class AnnouncementRecordTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnouncementRecord.class);
        AnnouncementRecord announcementRecord1 = new AnnouncementRecord();
        announcementRecord1.setId(1L);
        AnnouncementRecord announcementRecord2 = new AnnouncementRecord();
        announcementRecord2.setId(announcementRecord1.getId());
        assertThat(announcementRecord1).isEqualTo(announcementRecord2);
        announcementRecord2.setId(2L);
        assertThat(announcementRecord1).isNotEqualTo(announcementRecord2);
        announcementRecord1.setId(null);
        assertThat(announcementRecord1).isNotEqualTo(announcementRecord2);
    }
}
