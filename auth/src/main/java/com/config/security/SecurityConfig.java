package com.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.autoconfigure.security.oauth2.resource.DefaultUserInfoRestTemplateFactory;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoRestTemplateFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import javax.sql.DataSource;

/**
 * Created by Julia on 10.07.2017.
 */

@Configuration
@EnableWebSecurity
@Order(-20)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailService customUserDetailService;



    @Override
    @Bean(name = "authManager")
    public AuthenticationManager authenticationManagerBean() throws Exception {
       return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().and().authorizeRequests().and()/*.formLogin()
                .loginPage("/")
                .permitAll()
                .and()*/
                .authorizeRequests()
                .antMatchers(
                        "/login/**", "/node_modules/**", "/js/**",
                        "/systemjs.config.js", "/registration/**",
                        "/forgotPassword/**", "/recoveryPassword/**", "/oauth/token/**").permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/user/registration", "/user/checkConfirmPasswordLink",
                        "/user/confirmPassword", "/user/checkUsername",
                        "/user/resendRegistrationEmail").permitAll()
                .antMatchers("/send-pin").permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/**").authenticated()
                .and().csrf().disable()
               /* .addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class).csrf()
                .csrfTokenRepository(csrfTokenRepository())
                .and()*/

                .exceptionHandling()
                .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/login"))
                .and().logout()
                /*.and().userDetailsService(customUserDetailService)*/;//.and().userDetailsService(yourCustomerUserDetailsService);
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailService);
    }

    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }
}
