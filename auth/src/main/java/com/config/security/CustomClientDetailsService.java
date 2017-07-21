package com.config.security;

import com.dao.UserRepository;
import com.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationException;
import org.springframework.security.oauth2.provider.client.InMemoryClientDetailsService;
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

/**
 * Created by Julia on 12.07.2017.
 */

@Component
public class CustomClientDetailsService extends JdbcClientDetailsService {
    @Autowired
    private UserRepository userRepository;

    public CustomClientDetailsService(DataSource dataSource) {
        super(dataSource);
    }

    @Override
    public ClientDetails loadClientByClientId(String clientId) throws ClientRegistrationException {
        ClientDetails details = super.loadClientByClientId(clientId);
        if (details != null)
            return details;
        User user = userRepository.findByUsername(clientId);
        if (user != null) {
            return super.loadClientByClientId(user.getClientId());
        }
        return null;
    }
}
