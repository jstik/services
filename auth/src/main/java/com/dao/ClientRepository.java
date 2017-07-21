package com.dao;

import com.model.entity.Client;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by Julia on 12.07.2017.
 */
public interface ClientRepository extends QueryDslPredicateExecutor<Client>, PagingAndSortingRepository<Client, Long> {

    Client findById(String id);
}
