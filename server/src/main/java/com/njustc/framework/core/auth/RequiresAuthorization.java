package com.njustc.framework.core.auth;

import com.njustc.domain.BaseEntity;
import com.njustc.framework.core.web.RequestType;
import com.njustc.service.BaseService;

import java.lang.annotation.*;

/**
 * @author LBW
 */

@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiresAuthorization {
    RequestType requestType();

    AuthorizationScope queryScope() default AuthorizationScope.ORGANIZATION;

    AuthorizationScope editScope() default AuthorizationScope.USER;

    AuthorizationScope deleteScope() default AuthorizationScope.USER;

    Class<? extends BaseService<? extends BaseEntity>> serviceClass();
}
