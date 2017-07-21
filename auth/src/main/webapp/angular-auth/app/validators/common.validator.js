"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonValidator = (function () {
    function CommonValidator() {
    }
    CommonValidator.ValidateEmail = function (ac) {
        var email = ac.value;
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email && email != "" && (email.length < 5 || !EMAIL_REGEXP.test(email))) {
            /* ac.get('emailControl').setErrors({ValidateEmail : true});*/
            ac.setErrors({ ValidateEmail: true });
            console.log('Email not valid');
            return { "ValidateEmail": true };
        }
    };
    /* Validate that string don't contain whitespaces*/
    CommonValidator.WithoutWhitespaces = function (ac) {
        var str = ac.value;
        if (str && /\s/g.test(str.trim())) {
            ac.setErrors({ ContainsWhitespaces: true });
            console.log('Contains Whitespaces');
            return { "ContainsWhitespaces": true };
        }
    };
    return CommonValidator;
}());
exports.CommonValidator = CommonValidator;
//# sourceMappingURL=common.validator.js.map