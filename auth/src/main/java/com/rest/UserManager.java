package com.rest;

import com.model.entity.User;
import com.service.*;
import com.service.IOException_Exception;
import com.service.JAXBException_Exception;
import com.service.Mail;
import com.service.MailService;
import com.service.MailServiceImplService;
import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.embedded.EmbeddedWebApplicationContext;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainer;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.inject.Inject;
import javax.xml.ws.WebServiceRef;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * Created by Julia on 19.07.2017.
 */
@Service
public class UserManager implements com.rest.IUserManager {
    private com.service.MailServiceImplService mailService = new MailServiceImplService();
    @Autowired
    @Qualifier(value = "thymeleaf")
    private TemplateEngine templateEngine;

    @Inject
    private EmbeddedWebApplicationContext appContext;


    public void sendRegistrationEmail(User user) throws JAXBException_Exception, IOException_Exception, UnknownHostException {
        Mail mail = new Mail();
        mail.setBody(registrationMailBody(user));
        mail.setTo(user.getEmail());
        mail.setFrom("noReply");
        mail.setSubject("Registration confirm");
        MailService service =  mailService.getMailServiceImplPort();
        service.sendEmail(mail);
    }


    public String registrationMailBody(User user) throws UnknownHostException {
        Context context = new Context();
        context.setVariable("serverUrl", getBaseUrl());
        context.setVariable("username", user.getUsername());
        context.setVariable("key", user.getRegKey());
        return templateEngine.process("registrationMail.html", context);
    }

    private String getBaseUrl() throws UnknownHostException {
        Connector connector = ((TomcatEmbeddedServletContainer) appContext.getEmbeddedServletContainer()).getTomcat().getConnector();
        String scheme = connector.getScheme();
        String ip = InetAddress.getLocalHost().getHostAddress();
        int port = connector.getPort();
        String contextPath = appContext.getServletContext().getContextPath();
        return scheme + "://" + ip + ":" + port + contextPath;
    }


}
