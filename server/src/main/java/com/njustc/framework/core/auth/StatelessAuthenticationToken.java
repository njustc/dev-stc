package com.njustc.framework.core.auth;

import org.apache.shiro.authc.AuthenticationToken;

/**
 * @author LBW
 */
public class StatelessAuthenticationToken implements AuthenticationToken {

    private static final long serialVersionUID = 1L;

    private String username;
    private String clientDigest;

    public StatelessAuthenticationToken() {

    }

    public StatelessAuthenticationToken(String username, String clientDigest) {
        super();

        this.username = username;
        this.clientDigest = clientDigest;
    }
    @Override
    public Object getPrincipal() {
        return username;
    }

    @Override
    public Object getCredentials() {
        return clientDigest;
    }

    public String getUsername() {
        return  username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getClientDigest() {
        return clientDigest;
    }

    public void setClientDigest(String clientDigest) {
        this.clientDigest = clientDigest;
    }
}
