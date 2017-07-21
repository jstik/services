package com.web;

import com.model.entity.User;

import java.security.Principal;

/**
 * Created by Julia on 10.07.2017.
 */
public class AuthResponse {
    private User user;

    private Principal  authPrincipal;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Principal getAuthPrincipal() {
        return authPrincipal;
    }

    public void setAuthPrincipal(Principal authPrincipal) {
        this.authPrincipal = authPrincipal;
    }
}
