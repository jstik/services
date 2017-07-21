package com.dao;

import com.constraints.FieldValueExists;
import com.model.entity.QUser;
import com.model.entity.User;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.*;
import com.utill.PredicateUtill;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.text.MessageFormat;

import static java.text.MessageFormat.format;

public interface UserRepository extends QueryDslPredicateExecutor<User>, PagingAndSortingRepository<User, Long>, FieldValueExists {

    @Override
    default boolean exists(Object value, String fieldName) throws UnsupportedOperationException {
        BooleanExpression eq = PredicateUtill.eq(value, fieldName, QUser.user);
        return this.exists(eq);
    }

    User findByUsernameAndRegKey(String username, String regKey);

    int countUsersByUsername(String username);

    User findByUsername(String username);
}
