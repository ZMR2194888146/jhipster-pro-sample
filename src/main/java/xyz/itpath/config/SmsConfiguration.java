package xyz.itpath.config;

import javax.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import xyz.itpath.service.SmsConfigService;
import xyz.itpath.sms.builder.SmsBuilder;

/**
 * Sms配置类
 *
 */
@Configuration
public class SmsConfiguration {

    private final ApplicationProperties applicationProperties;

    private final SmsConfigService smsConfigService;

    private final CacheManager cacheManager;

    @Bean
    public SmsBuilder smsBuilder() {
        return new SmsBuilder(applicationProperties, smsConfigService, cacheManager);
    }

    public SmsConfiguration(ApplicationProperties applicationProperties, SmsConfigService smsConfigService, CacheManager cacheManager) {
        this.applicationProperties = applicationProperties;
        this.smsConfigService = smsConfigService;
        this.cacheManager = cacheManager;
    }
}
