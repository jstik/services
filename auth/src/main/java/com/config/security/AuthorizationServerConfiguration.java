package com.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.jndi.JndiObjectFactoryBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.endpoint.TokenEndpoint;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.servlet.mvc.WebContentInterceptor;

import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

/**
 * Created by Julia on 09.07.2017.
 */

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {


    @Value("${resource.id:spring-boot-application}")
    private String resourceId;
    @Value("${access_token.validity_period:3600}")
    int accessTokenValiditySeconds = 3600;

    private final DataSource authDataSource;

    private final AuthenticationManager authenticationManager;

    private AuthorizationServerEndpointsConfigurer endpoints;

    private ClientDetailsService clientDetailsService;

    @Autowired
    public AuthorizationServerConfiguration(DataSource authDataSource, @Qualifier("authManager") AuthenticationManager authenticationManager) {
        this.authDataSource = authDataSource;
        this.authenticationManager = authenticationManager;
        this.clientDetailsService = new CustomClientDetailsService(authDataSource);
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey("123");
        return converter;
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }



    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints.tokenStore(tokenStore())
                //.pathMapping("/oauth/token", "/api/v1/token")
                .authenticationManager(this.authenticationManager)
                .accessTokenConverter(accessTokenConverter());
        this.endpoints = endpoints;
    }

    @Primary
    @Bean
    public TokenEndpoint tokenEndpoint() throws Exception {
        CustomTokenEndpoint customTokenEndpoint = new CustomTokenEndpoint();
        customTokenEndpoint.setTokenGranter(endpoints.getTokenGranter());
        customTokenEndpoint.setClientDetailsService(this.clientDetailsService);
        return customTokenEndpoint;
    }




    @Override
    public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
        oauthServer.tokenKeyAccess("isAnonymous() || hasAuthority('Admin')")
                .checkTokenAccess("hasAuthority('Admin')");
    }



    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.withClientDetails(this.clientDetailsService)/*
                .inMemory()
                .withClient("normal-app")
                .authorizedGrantTypes("authorization_code", "implicit")
                .authorities("Admin", "ADMIN", "USER")
                .scopes("read", "write")
                .resourceIds(resourceId)
                .accessTokenValiditySeconds(accessTokenValiditySeconds)
                .and()
                .withClient("trusted-app")
                .authorizedGrantTypes("client_credentials", "password")
                .authorities("Admin", "ADMIN", "USER")
                .scopes("read", "write")
                .resourceIds(resourceId)
                .accessTokenValiditySeconds(accessTokenValiditySeconds)
                .secret("secret")*/;
    }

    @Configuration
    @EnableResourceServer
    public static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

        @Value("${resource.id:spring-boot-application}")
        private String resourceId;

        @Override
        public void configure(ResourceServerSecurityConfigurer resources) {
            resources.resourceId(resourceId);
        }

        @Override
        public void configure(HttpSecurity http) throws Exception {
            http.requestMatcher(new OAuthRequestedMatcher())
                    .authorizeRequests()
                    .antMatchers(HttpMethod.POST).permitAll()
                    .anyRequest().authenticated();
        }

        private static class OAuthRequestedMatcher implements RequestMatcher {
            public boolean matches(HttpServletRequest request) {
                String auth = request.getHeader("Authorization");
                // Determine if the client request contained an OAuth Authorization
                boolean haveOauth2Token = (auth != null) && auth.startsWith("Bearer");
                boolean haveAccessToken = request.getParameter("access_token")!=null;
                return haveOauth2Token || haveAccessToken;
            }
        }

    }
}
