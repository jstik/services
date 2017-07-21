package com.config.security;

import com.dao.ClientRepository;
import com.dao.UserRepository;
import com.model.entity.Client;
import com.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.client.ClientDetailsUserDetailsService;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by Julia on 10.07.2017.
 */
@Component
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    private final CustomClientDetailsService detailsService;

    @Autowired
    public CustomUserDetailService(UserRepository userRepository, CustomClientDetailsService detailsService) {
        this.userRepository = userRepository;
        this.detailsService = detailsService;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            ClientDetails clientDetails = detailsService.loadClientByClientId(username);
            if (clientDetails == null) {
                String message = MessageFormat.format("Couldn't find user with username {0}", username);
                throw new UsernameNotFoundException(message);
            }
            return new CustomUserDetails(username, clientDetails.getClientSecret(), clientDetails.getAuthorities());
        }

        Collection<? extends GrantedAuthority> authorities = loadStabAuthorities();

        return new CustomUserDetails(user.getUsername(), user.getPassword(), authorities);
    }

    private Collection<? extends GrantedAuthority> loadStabAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        GrantedAuthority authority = new SimpleGrantedAuthority("Admin");
        authorities.add(authority);
        return authorities;
    }
}
