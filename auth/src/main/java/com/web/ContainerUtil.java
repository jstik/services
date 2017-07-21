package com.web;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.context.embedded.EmbeddedWebApplicationContext;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainer;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * Created by Julia on 20.07.2017.
 */
@Component
public class ContainerUtil {
    @Inject
    private EmbeddedWebApplicationContext appContext;

    private String getBaseUrl() throws UnknownHostException {
        Connector connector = ((TomcatEmbeddedServletContainer) appContext.getEmbeddedServletContainer()).getTomcat().getConnector();
        String scheme = connector.getScheme();
        String ip = InetAddress.getLocalHost().getHostAddress();
        int port = connector.getPort();
        String contextPath = appContext.getServletContext().getContextPath();
        return scheme + "://" + ip + ":" + port + contextPath;
    }
}
