package com.model.entity;

import com.constraints.Unique;
import com.constraints.WithoutWhitespace;
import com.dao.UserRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by Julia on 05.07.2017.
 */
@Entity
@Table(name = "sys_user")
public class User extends AbstractEntity implements Identifiable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "uuid")
    @JsonIgnore
    private String uuid = UUID.randomUUID().toString();

    @Column(name = "user_name", unique = true)
    @JsonProperty(value = "username")
    @NotBlank
    @WithoutWhitespace
    @Length(min = 4)
    @Unique(service = UserRepository.class, fieldName = "username", message = "{email.unique.violation}")
    private String username;

    @NotBlank
    @Column(name = "first_name")
    @JsonProperty(value = "firstname")
    private String firstName;

    @NotBlank
    @Column(name = "last_name")
    @JsonProperty(value = "lastname")
    private String lastName;

    @Column(name = "email")
    @Email
    @NotBlank
    private String email;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "active")
    private boolean active;

    @Column(name = "reg_key")
    @JsonIgnore
    private String regKey = generateRegKey();

    @Column(name = "client_id")
    private String clientId = "normal-app";

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "user_tenant", joinColumns = {
            @JoinColumn(name = "user_id", nullable = false, updatable = false) },
            inverseJoinColumns = { @JoinColumn(name = "tenant_id",
                    nullable = false, updatable = false) })
    private List<Tenant> tenants = new ArrayList<>();

    @Override
    public Long getId() {
        return this.id;
    }

    @Override
    public String getUuid() {
        return this.uuid;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Tenant> getTenants() {
        return tenants;
    }

    public void setTenants(List<Tenant> tenants) {
        this.tenants = tenants;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getRegKey() {
        return regKey;
    }

    public void setRegKey(String regKey) {
        this.regKey = regKey;
    }

    private  static  String generateRegKey(){
       return UUID.randomUUID().toString().replaceAll("-", "");
    }
    public void setRegKey(){
        setRegKey(generateRegKey());
    }


    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }
}
