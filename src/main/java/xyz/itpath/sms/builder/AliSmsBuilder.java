package xyz.itpath.sms.builder;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import javax.cache.CacheManager;
import xyz.itpath.config.ApplicationProperties;
import xyz.itpath.domain.SmsConfig;
import xyz.itpath.sms.SmsTemplate;
import xyz.itpath.sms.aliyun.AliSmsTemplate;

/**
 * 阿里云短信构建类
 *
 */
public class AliSmsBuilder {

    public static SmsTemplate template(SmsConfig sms, CacheManager cacheManager) {
        ApplicationProperties applicationProperties = new ApplicationProperties();
        applicationProperties.getSms().setTemplateId(sms.getTemplateId());
        applicationProperties.getSms().setAccessKey(sms.getAccessKey());
        applicationProperties.getSms().setSecretKey(sms.getSecretKey());
        applicationProperties.getSms().setRegionId(sms.getRegionId());
        applicationProperties.getSms().setSignName(sms.getSignName());
        IClientProfile profile = DefaultProfile.getProfile(
            applicationProperties.getSms().getRegionId(),
            applicationProperties.getSms().getAccessKey(),
            applicationProperties.getSms().getSecretKey()
        );
        IAcsClient acsClient = new DefaultAcsClient(profile);
        return new AliSmsTemplate(applicationProperties, acsClient, cacheManager);
    }
}
