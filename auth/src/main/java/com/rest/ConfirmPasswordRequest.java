package com.rest;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Created by Julia on 06.07.2017.
 */
public class ConfirmPasswordRequest extends CheckConfirmPasswordLinkRequest {

    @NotBlank
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
