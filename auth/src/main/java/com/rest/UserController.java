package com.rest;

import com.dao.UserRepository;
import com.model.entity.QUser;
import com.model.entity.User;
import com.service.IOException_Exception;
import com.service.JAXBException_Exception;
import org.hibernate.validator.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceAlreadyExistsException;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.net.UnknownHostException;
import java.text.MessageFormat;

/**
 * Created by Julia on 05.07.2017.
 */
@Controller
@RequestMapping("/user")
public class UserController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserManager userManager;

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody Object registration(@Valid @RequestBody RegistrationRequest request) throws JAXBException_Exception, IOException_Exception, UnknownHostException {
        User user = request.getUser();
        user.getTenants().add(request.getTenant());
        user = userRepository.save(user);
        userManager.sendRegistrationEmail(user);
        return user;
    }

    @RequestMapping(value = "/checkConfirmPasswordLink")
    public @ResponseBody Object checkConfirmPasswordLink(
             @Valid @RequestBody CheckConfirmPasswordLinkRequest request
    ){
        User user = userRepository.findByUsernameAndRegKey(request.getUsername(), request.getKey());
        if(user == null){
            throw new EntityNotFoundException("Username or key not valid");
        }
        return user;
    }
    @RequestMapping(value = "/confirmPassword")
    public @ResponseBody Object confirmPassword(
           @Valid @RequestBody ConfirmPasswordRequest request
    ){
        User user = userRepository.findByUsernameAndRegKey(request.getUsername(), request.getKey());
        if(user == null){
            throw new EntityNotFoundException("Username or key not valid");
        }
        user.setPassword(request.getPassword());
        user.setActive(true);
        user.setRegKey(null);
        userRepository.save(user);
        return user;
    }

    @RequestMapping(value = "/checkUsername", method = RequestMethod.GET)
    public @ResponseBody boolean checkUsername(@RequestParam @NotBlank String username) throws InstanceAlreadyExistsException {
        int count = userRepository.countUsersByUsername(username);
        if(count > 0){
            throw new InstanceAlreadyExistsException("Username taken");
        }
        return true;
    }

    @RequestMapping(value = "resendRegistrationEmail", method = RequestMethod.GET)
    public @ResponseBody boolean resendRegistrationEmail(@RequestParam @NotBlank String username){
        User user = userRepository.findOne(QUser.user.username.eq(username).and(QUser.user.active));
        if(user == null){
            String message = MessageFormat.format("User with username {0} not found", username);
            throw new EntityNotFoundException(message);
        }
        user.setRegKey();
        userRepository.save(user);
        return true;
    }

    @RequestMapping(value = "/list")
    public @ResponseBody Object userList(){
        return userRepository.findAll();
    }

    @ExceptionHandler(value = EntityNotFoundException.class )
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public @ResponseBody Object entityNotFoundHandler(EntityNotFoundException e){
        logger.debug("Not Found", e);
        return e.getMessage();
    }

    @ExceptionHandler(value = InstanceAlreadyExistsException.class )
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public @ResponseBody  Object alreadyExistsHandler(EntityNotFoundException e){
        logger.debug("Already Exists", e);
        return e.getMessage();
    }
}
