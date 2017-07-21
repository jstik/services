"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stayAlone = false;
exports.testAuthUrl = 'api/auth';
exports.testLogoutUrl = 'api/logout';
exports.testRegistrationUrl = 'api/registration';
exports.testCheckConfirmPasswordLinkUrl = 'api/checkConfirmPasswordLink';
exports.testConfirmPasswordUrl = 'api/confirmPassword';
exports.testCheckUsernameUrl = 'api/checkUsername';
exports.testResendRegistrationEmail = 'api/resendRegistrationEmail';
exports.authUrl = !stayAlone ? 'auth' : exports.testAuthUrl;
exports.logoutUrl = !stayAlone ? 'api/logout' : exports.testLogoutUrl;
exports.registrationUrl = !stayAlone ? 'user/registration' : exports.testRegistrationUrl;
exports.checkConfirmPasswordLinkUrl = !stayAlone ? 'user/checkConfirmPasswordLink' : exports.testCheckConfirmPasswordLinkUrl;
exports.confirmPasswordUrl = !stayAlone ? 'user/confirmPassword' : exports.testConfirmPasswordUrl;
exports.checkUsernameUrl = !stayAlone ? 'user/checkUsername' : exports.testCheckUsernameUrl;
exports.resendRegistrationEmailUrl = !stayAlone ? 'user/resendRegistrationEmail' : exports.testResendRegistrationEmail;
//# sourceMappingURL=constant.helper.js.map