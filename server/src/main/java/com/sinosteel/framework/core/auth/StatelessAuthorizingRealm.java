package com.sinosteel.framework.core.auth;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.domain.User;
import com.sinosteel.framework.utils.encryption.HmacSHA256Util;
import com.sinosteel.repository.UserRepository;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author LBW
 */
public class StatelessAuthorizingRealm extends AuthorizingRealm {

    @Autowired
    private UserRepository userRepository;


    @Override
    public boolean supports(AuthenticationToken token) {
        return token instanceof StatelessAuthenticationToken;
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        String username = (String) principals.getPrimaryPrincipal();
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();

        User user = userRepository.findByUsername(username);
        if(user == null) {
            return null;
        }

        JSONObject userInfoJson = JSONObject.parseObject(JSONObject.toJSONString(user));

        JSONArray rolesJsonArray = userInfoJson.getJSONArray("roles");
        for(int i = 0; i < rolesJsonArray.size(); i++)
        {
            String roleString = rolesJsonArray.getString(i);
            authorizationInfo.addRole(roleString);
        }

        JSONArray functionsJsonArray = userInfoJson.getJSONArray("functions");
        for(int i = 0; i < functionsJsonArray.size(); i++)
        {
            String functionString = functionsJsonArray.getString(i);
            authorizationInfo.addStringPermission(functionString);
        }

        return authorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        StatelessAuthenticationToken statelessAuthenticationToken = (StatelessAuthenticationToken) token;
        String username = (String) statelessAuthenticationToken.getPrincipal();

        User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }
        JSONObject userInfoJson = JSONObject.parseObject(JSONObject.toJSONString(user));

        String serverDigest = HmacSHA256Util.digest(getKey(username), userInfoJson.getString("password"));

        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(username, serverDigest, getName());
        return authenticationInfo;


    }

    //key的生成策略
    private String getKey(String username) {
        return username;
    }
}
