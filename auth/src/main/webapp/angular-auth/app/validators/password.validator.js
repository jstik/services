"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PasswordValidator = (function () {
    function PasswordValidator() {
    }
    PasswordValidator.matchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password != confirmPassword) {
            console.log('passwords don\'t match');
            AC.get('confirmPassword').setErrors({ MatchPassword: true });
            return { "MatchPassword": true };
        }
        else {
            console.log('passwords match');
            return null;
        }
    };
    PasswordValidator.uppercaceCharacterRule = function (num, str) {
        if (!str)
            return false;
        var match = str.match(/[A-Z,А-Я]/g);
        return match && match.length >= num;
    };
    PasswordValidator.digitalCharacterRule = function (num, str) {
        if (!str)
            return false;
        var match = str.match(/[0-9]/g);
        return match && match.length >= num;
    };
    PasswordValidator.strongPassword = function (AC) {
        var password = AC.get('password').value;
        var uppercase = PasswordValidator.uppercaceCharacterRule(1, password);
        var digital = PasswordValidator.digitalCharacterRule(1, password);
        if (password && (password.length < 6 || !uppercase || !digital)) {
            console.log('password not strong');
            AC.get('password').setErrors({ strongPassword: true });
            return { "strongPassword": true };
        }
    };
    return PasswordValidator;
}());
exports.PasswordValidator = PasswordValidator;
//# sourceMappingURL=password.validator.js.map