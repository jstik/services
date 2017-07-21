const stayAlone = false;

export const ACCESS_TOKEN = 'access_token';

export const testAuthUrl = 'api/auth';
export const testLogoutUrl = 'api/logout';
export const testRegistrationUrl = 'api/registration';

export const testCheckConfirmPasswordLinkUrl = 'api/checkConfirmPasswordLink';
export const testConfirmPasswordUrl = 'api/confirmPassword';

export const testCheckUsernameUrl = 'api/checkUsername';

export const testResendRegistrationEmail = 'api/resendRegistrationEmail';

export const testOauthTokenUrl = 'api/oauth/token';

export const testClientRedirect ='api/client/redirectUrl';

export const  authUrl =  !stayAlone ? 'auth' :  testAuthUrl;
export const oauthTokenUrl = !stayAlone ?  'oauth/token' : testOauthTokenUrl;
export const clientRedirect = !stayAlone ?  'client/redirectUrl' : testClientRedirect;
export const logoutUrl = !stayAlone ? 'api/logout' : testLogoutUrl;
export const registrationUrl = !stayAlone ?'user/registration' : testRegistrationUrl;

export const checkConfirmPasswordLinkUrl = !stayAlone ?'user/checkConfirmPasswordLink'  :  testCheckConfirmPasswordLinkUrl;
export const confirmPasswordUrl = !stayAlone ? 'user/confirmPassword'  :  testConfirmPasswordUrl;

export const checkUsernameUrl = !stayAlone ?'user/checkUsername' : testCheckUsernameUrl;

export const resendRegistrationEmailUrl = !stayAlone ? 'user/resendRegistrationEmail' : testResendRegistrationEmail;