
INSERT INTO oauth_client_details  (client_id, client_secret, scope, authorized_grant_types,web_server_redirect_uri, authorities, access_token_validity,refresh_token_validity, additional_information, autoapprove) VALUES('admin', 'secret', 'read,write','authorization_code,refresh_token,implicit,client_credentials,password','/', 'Admin', 36000, 36000, null, 'true');
INSERT INTO oauth_client_details  (client_id, client_secret, scope, authorized_grant_types,web_server_redirect_uri, authorities, access_token_validity,refresh_token_validity, additional_information, autoapprove) VALUES('mail_service', 'secret', 'read,write','authorization_code,refresh_token,implicit,client_credentials,password','http://localhost:8080', 'Admin', 36000, 36000, null, 'true');

INSERT INTO SYS_USER( ACTIVE,CLIENT_ID, EMAIL,FIRST_NAME,LAST_NAME,PASSWORD, USER_NAME, UUID)  VALUES(1,'admin','admin@admin.com','admin','admin','admin','admin', 'admin');
