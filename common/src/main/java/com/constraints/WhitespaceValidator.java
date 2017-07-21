package com.constraints;

import org.passay.PasswordUtils;
import org.passay.WhitespaceRule;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.nio.charset.StandardCharsets;

/**
 * Created by Julia on 06.07.2017.
 */
public class WhitespaceValidator implements ConstraintValidator<WithoutWhitespace, String> {

    private static final String CHARS = new String(
            new byte[] {
                    (byte) 0x09,
                    (byte) 0x0A,
                    (byte) 0x0B,
                    (byte) 0x0C,
                    (byte) 0x0D,
                    (byte) 0x20,
            },
            StandardCharsets.UTF_8);

    @Override
    public void initialize(WithoutWhitespace constraintAnnotation) {

    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return PasswordUtils.getMatchingCharacters(CHARS, value).length() == 0;
    }
}
