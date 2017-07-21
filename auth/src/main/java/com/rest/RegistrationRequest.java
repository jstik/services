package com.rest;

import com.model.entity.Tenant;
import com.model.entity.User;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

/**
 * Created by Julia on 06.07.2017.
 */
public class RegistrationRequest {

    @NotNull
    @Valid
    private User user;

    @NotNull
    @Valid
    private Tenant tenant;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }
}
