package com.web;

import com.config.security.CsrfUtils;
import com.dao.ClientRepository;
import com.dao.UserRepository;
import com.model.entity.Client;
import com.model.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.jwt.JwtHelper;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.util.RedirectUrlBuilder;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.text.MessageFormat;
import java.util.Collection;
import java.util.Map;

import static java.text.MessageFormat.format;

/**
 * Created by Julia on 05.07.2017.
 */
@Controller
public class WebController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @RequestMapping({
            "/","/registration", "/login",
            "/registration/submit/{username}/", "/forgotPassword", "/recoveryPassword"
    })
    public Object showLoginPage() {
        return "/index_prod.html";
    }


    @RequestMapping("/auth")
    public @ResponseBody Object auth(Principal principal, HttpServletResponse response, HttpServletRequest request) {
        User user = userRepository.findByUsername(principal.getName());
        AuthResponse authResponse = new AuthResponse();
        authResponse.setAuthPrincipal(principal);
        authResponse.setUser(user);
        CsrfUtils.addCsrfToken(response, request);
        return  authResponse;
    }

    @RequestMapping("/client/redirectUrl")
    public @ResponseBody String getClientRedirectUrl(@RequestParam("client_id") String clientId,
                                       @RequestParam(required = false) String redirectUrl,
                                       HttpServletRequest request
                                       ){
        Client client = clientRepository.findById(clientId);
        if(client == null){
            throw new EntityNotFoundException(format("Couldn't find client with id {} " , clientId ));
        }
        String clientWebServerRedirectUri = client.getWebServerRedirectUri();
        if(clientWebServerRedirectUri == null) {
            clientWebServerRedirectUri = "/";
        }
        return buildRedirectUrl(request, clientWebServerRedirectUri, redirectUrl);
    }

    @RequestMapping("/client/redirect")
    @ResponseStatus(HttpStatus.MOVED_PERMANENTLY)
    public RedirectView redirectClient(@RequestParam("client_id") String clientId,
                               @RequestParam(required = false) String redirectUrl,
                               @RequestHeader(value = "Authorization") String token,
                               HttpServletRequest request, RedirectAttributes attributes) throws IOException {
        Client client = clientRepository.findById(clientId);
        if(client == null){
            throw new EntityNotFoundException(format("Couldn't find client with id {} " , clientId ));
        }
        String clientWebServerRedirectUri = client.getWebServerRedirectUri();
        if(clientWebServerRedirectUri == null) {
            clientWebServerRedirectUri = "/";
        }
        String url = buildRedirectUrl(request, clientWebServerRedirectUri, redirectUrl);
        attributes.addAttribute(OAuth2AccessToken.ACCESS_TOKEN, token.replaceAll("Bearer ", ""));
        return new RedirectView(url);
    }

    private String buildRedirectUrl(HttpServletRequest request, String clientRedirectUri, String redirectUrl) {

        if (!UrlUtils.isAbsoluteUrl(clientRedirectUri)) {
            int serverPort = request.getServerPort();
            String scheme = request.getScheme();
            RedirectUrlBuilder urlBuilder = new RedirectUrlBuilder();
            urlBuilder.setScheme(scheme);
            urlBuilder.setServerName(request.getServerName());
            urlBuilder.setPort(serverPort);
            urlBuilder.setContextPath(request.getContextPath());
            urlBuilder.setPathInfo(clientRedirectUri);
            clientRedirectUri = urlBuilder.getUrl();
        }
        if (redirectUrl != null) {
            if (clientRedirectUri.endsWith("/") && redirectUrl.startsWith("/")) {
                clientRedirectUri = clientRedirectUri.substring(0, clientRedirectUri.length() - 1);

            } else if (!redirectUrl.startsWith("/")) {
                clientRedirectUri = clientRedirectUri + "/";
            }
            clientRedirectUri = clientRedirectUri + redirectUrl;
        }
        return  clientRedirectUri;

    }

    @ExceptionHandler(value = EntityNotFoundException.class )
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public @ResponseBody Object entityNotFoundHandler(EntityNotFoundException e){
        logger.debug("Not Found", e);
        return e.getMessage();
    }


}
