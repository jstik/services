package com.rest;

import org.hibernate.validator.constraints.NotBlank;

/**
 * Created by Julia on 06.07.2017.
 */
public class CheckConfirmPasswordLinkRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String key;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
