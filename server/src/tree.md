```
src
├── main
│   ├── java
│   │   └── com
│   │       └── sinosteel
│   │           ├── activiti                流程引擎相关
│   │           ├── domain                  实体类
│   │           ├── framework               
│   │           │   ├── config              
│   │           │   │   ├── database        数据库配置文件读取
│   │           │   │   ├── druid           Druid数据库连接池
│   │           │   │   ├── http            http访问相关配置
│   │           │   │   ├── listener        应用启动监听配置
│   │           │   │   ├── shiro           shiro权限控制
│   │           │   │   ├── swagger         swagger配置文件
│   │           │   │   ├── system          系统相关信息
│   │           │   │   ├── tomcat          Tomcat配置信息
│   │           │   │   └── web             自定义参数解析器配置文案
│   │           │   ├── core                
│   │           │   │   ├── auth            权限配置文件
│   │           │   │   ├── listener        应用启动监听类
│   │           │   │   └── web             自定义参数解析器+返回值结构体
│   │           │   ├── helpers
│   │           │   │   ├── hierarchy
│   │           │   │   │   ├── domain      hierarchy实体类
│   │           │   │   │   └── helper      hierarchy接口
│   │           │   │   └── pagination      分页器结构体
│   │           │   ├── mybatis             mybatis接口
│   │           │   └── utils
│   │           │       ├── date            日期工具类
│   │           │       ├── encryption      加密类
│   │           │       ├── json            json工具类
│   │           │       ├── list            list工具类
│   │           │       ├── map             map工具类
│   │           │       ├── spring          spring配置类
│   │           │       └── string          string工具类
│   │           ├── repository              数据访问层
│   │           ├── service                 业务逻辑层
│   │           └── web                     控制交互层
│   └── resources
│       ├── config                          配置文件
│       └── processes                       流程引擎配置
└── test                                    测试类
    └── java
        └── com
            └── sinosteel
                ├── Repository              数据访问层单元测试用例
                ├── activiti                流程测试用例
                ├── service                 业务逻辑层单元测试用例
                └── web                     控制交互层单元测试用例
```