package com.rest;

import com.model.entity.User;
import com.service.IOException_Exception;
import com.service.JAXBException_Exception;

import java.net.UnknownHostException;

/**
 * Created by Julia on 19.07.2017.
 */
public interface IUserManager  {
    void sendRegistrationEmail(User user) throws JAXBException_Exception, IOException_Exception, UnknownHostException;
}
