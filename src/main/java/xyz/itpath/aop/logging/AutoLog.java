package xyz.itpath.aop.logging;

import java.lang.annotation.*;
import xyz.itpath.domain.enumeration.LogType;
import xyz.itpath.domain.enumeration.ModuleType;

/**
 * 系统日志注解
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface AutoLog {
    /**
     * 日志内容
     **/
    String value() default "";

    /**
     * 日志类型
     *
     * @return 0:操作日志;1:登录日志;2:定时任务;
     */
    LogType logType() default LogType.OPERATE;

    /**
     * 操作日志类型
     *
     * @return （1查询，2添加，3修改，4删除）
     */
    int operateType() default 0;

    /**
     * 模块类型 默认为common
     */
    ModuleType module() default ModuleType.COMMON;
}
