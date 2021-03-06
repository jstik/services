
package com.service;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.Action;
import javax.xml.ws.FaultAction;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.9-b130926.1035
 * Generated source version: 2.2
 * 
 */
@WebService(name = "MailService", targetNamespace = "http://service.com/")
@SOAPBinding(style = SOAPBinding.Style.RPC)
@XmlSeeAlso({
    ObjectFactory.class
})
public interface MailService {


    /**
     * 
     * @param mail
     * @return
     *     returns java.lang.String
     * @throws IOException_Exception
     * @throws JAXBException_Exception
     */
    @WebMethod
    @WebResult(partName = "return")
    @Action(input = "http://service.com/MailService/sendEmailRequest", output = "http://service.com/MailService/sendEmailResponse", fault = {
        @FaultAction(className = JAXBException_Exception.class, value = "http://service.com/MailService/sendEmail/Fault/JAXBException"),
        @FaultAction(className = IOException_Exception.class, value = "http://service.com/MailService/sendEmail/Fault/IOException")
    })
    public String sendEmail(
        @WebParam(name = "mail", partName = "mail")
        Mail mail)
        throws IOException_Exception, JAXBException_Exception
    ;

}
