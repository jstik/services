package com.config;

import generated.jaxb.JndiConfig;
import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import org.apache.tomcat.util.descriptor.web.ContextResource;
import org.apache.tomcat.util.http.LegacyCookieProcessor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.EmbeddedServletContainer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.core.io.Resource;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * Created by Julia on 07.06.2017.
 */
public class CustomTomcatContainerFactory extends TomcatEmbeddedServletContainerFactory {

    @Value("classpath:jndi.config.xml")
    private Resource jndiConfig;

    @Override
    protected TomcatEmbeddedServletContainer getTomcatEmbeddedServletContainer(
            Tomcat tomcat) {
        tomcat.enableNaming();

        this.addContextCustomizers(context -> context.setCookieProcessor(new LegacyCookieProcessor()));
        return super.getTomcatEmbeddedServletContainer(tomcat);
    }

    public EmbeddedServletContainer getEmbeddedServletContainer(
            ServletContextInitializer... initializers) {
        TomcatEmbeddedServletContainer container = (TomcatEmbeddedServletContainer)super.getEmbeddedServletContainer(initializers);
        container.getTomcat().enableNaming();
        return container;
    }




    @Override
    protected void postProcessContext(Context context) {
        context.setCookieProcessor(new LegacyCookieProcessor());
        JAXBContext jaxbContext = null;
        JndiConfig config = null;
        try {
            jaxbContext = JAXBContext.newInstance(JndiConfig.class);
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            InputStream inputStream = jndiConfig.getInputStream();
            config = (JndiConfig) unmarshaller.unmarshal(inputStream);
        } catch (JAXBException | IOException e) {
            throw new RuntimeException(e);
        }
        List<JndiConfig.Resource> resources = config.getResource();
        for (JndiConfig.Resource jndi : resources) {
            ContextResource resource = new ContextResource();
            resource.setName(jndi.getName());
            resource.setType(jndi.getType());
            List<JndiConfig.Resource.Property> property = jndi.getProperty();
            for (JndiConfig.Resource.Property p : property) {
                resource.setProperty(p.getName(), p.getValue());
            }
            context.getNamingResources().addResource(resource);
        }

      /*  ContextResource resource = new ContextResource();
        resource.setName("jdbc/mainDB");
        resource.setType(com.zaxxer.hikari.HikariDataSource.class.getName());
        resource.setProperty("driverClassName", jdbcDriver);
        resource.setProperty("jdbcUrl", jdbcUrl);
        resource.setProperty("username", user);
        resource.setProperty("password", password);
        resource.setProperty("factory", "org.apache.naming.factory.BeanFactory");
        context.getNamingResources().addResource(resource);*/
    }
}
