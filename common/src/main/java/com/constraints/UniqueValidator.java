package com.constraints;

import com.utill.ApplicationContextProvider;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Created by Julia on 06.07.2017.
 */
public class UniqueValidator implements ConstraintValidator<Unique, Object> {
    private FieldValueExists service;
    private String fieldName;

    @Override
    public void initialize(Unique unique) {
        Class<? extends FieldValueExists> clazz = unique.service();
        this.fieldName = unique.fieldName();
        String serviceQualifier = unique.serviceQualifier();

        if (!serviceQualifier.equals("")) {
            this.service = ApplicationContextProvider.getApplicationContext().getBean(serviceQualifier, clazz);
        } else {
            this.service = ApplicationContextProvider.getApplicationContext().getBean(clazz);
        }
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        return !this.service.exists(value, this.fieldName);
    }
}
