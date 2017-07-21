package com.dao;

import com.model.entity.Tenant;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by Julia on 05.07.2017.
 */
public interface TenantRepository extends QueryDslPredicateExecutor<Tenant>, PagingAndSortingRepository<Tenant, Long> {
}
