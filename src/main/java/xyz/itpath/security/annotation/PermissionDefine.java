package xyz.itpath.security.annotation;

import java.lang.annotation.*;
import xyz.itpath.domain.enumeration.ApiPermissionState;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.TYPE })
@Inherited
@Documented
public @interface PermissionDefine {
    String groupName() default "系统设置";

    String groupCode() default "GROUP_SYSTEM";

    String entityCode();

    String entityName();

    String permissionName();

    String permissionCode();

    ApiPermissionState state() default ApiPermissionState.PERMIT_ALL;
}
