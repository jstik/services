"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(id, username, password, firstname, lastname, email, phone, token, active, regkey) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.token = token;
        this.active = active;
        this.regkey = regkey;
    }
    Object.defineProperty(User.prototype, "tenants", {
        get: function () {
            return this._tenants;
        },
        set: function (value) {
            this._tenants = value;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map