package com.constraints;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Created by Julia on 06.07.2017.
 */
@Documented
@Constraint(validatedBy = WhitespaceValidator.class)
@Target({ TYPE, FIELD, ANNOTATION_TYPE })
@Retention(RUNTIME)
public @interface WithoutWhitespace {

    String message() default "Shouldn't contain whitespace";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
