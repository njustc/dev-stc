import LoginContainer from './Login'
import CoreLayoutContainer from 'containers/CoreLayoutContainer'
import React from 'react'

import Blank from './Blank';

// 配置路由
export const createRoutes = (store) => 
{
    return(
    {
        path        : '/',
        component   : Blank,
        // 子路由不进行模块分割
        childRoutes : 
        [
            {
                path        : '/login',
                component   : LoginContainer
            },
            {
                path        : '/index',
                component   : CoreLayoutContainer
            }
        ]
    })
};

export default createRoutes
