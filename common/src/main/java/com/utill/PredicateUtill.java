package com.utill;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.*;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.lang.reflect.Type;

import static java.text.MessageFormat.format;

/**
 * Created by Julia on 06.07.2017.
 */
public class PredicateUtill {

    public static BooleanExpression eq(Object value, String fieldName, EntityPathBase qEntity){
        Field field = ReflectionUtils.findField(qEntity.getClass(), fieldName);
        if (field == null) {
            String message = format("Field with name {0} don't exist in {1}.", fieldName, qEntity.getClass());
            throw new UnsupportedOperationException(message);
        }

        Path path;
        try {
            path = (Path) field.get(qEntity);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }

        Type type = field.getType();
        BooleanExpression pr;
        if (type == StringPath.class) {
            pr = ((StringPath) path).eq((String) value);
        } else if (type == EnumPath.class) {
            pr = ((EnumPath) path).eq(value);
        } else if (type == NumberPath.class) {
            pr = ((NumberPath) path).eq(value);
        } else if (type == DatePath.class) {
            pr = ((DatePath) path).eq(value);
        } else if (type == DateTimePath.class) {
            pr = ((DateTimePath) path).eq(value);
        } else {
            String message = format("Field with type {0} not supported", type);
            throw new UnsupportedOperationException(message);
        }
        return pr;
    }
}
