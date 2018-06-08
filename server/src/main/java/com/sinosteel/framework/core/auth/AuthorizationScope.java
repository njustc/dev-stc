package com.sinosteel.framework.core.auth;

/**
 * @author LBW
 */

/**用户默认可以查询所在组织所有数据，修改和删除自己的数据*/
public enum AuthorizationScope {
    ALL,
    ORGANIZATION,
    USER,
    NONE
}
