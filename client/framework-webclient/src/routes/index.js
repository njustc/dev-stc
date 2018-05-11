import CoreLayoutContainer from 'containers/CoreLayoutContainer'

import React from 'react'

import Blank from './Blank';

import LoginContainer from './Login';

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
                component   : LoginContainer(store)
            },
            {
                path        : '/index',
                component   : CoreLayoutContainer(store)
            }
        ]
    })
};

export default createRoutes
