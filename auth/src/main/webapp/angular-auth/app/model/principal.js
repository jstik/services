"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Principal = (function () {
    function Principal(username, authorities, accountNonExpired, accountNonLocked, credentialsNonExpired, enabled) {
        this.username = username;
        this.authorities = authorities;
        this.accountNonExpired = accountNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
    }
    return Principal;
}());
exports.Principal = Principal;
//# sourceMappingURL=principal.js.map