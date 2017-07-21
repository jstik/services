"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthPrincipal = (function () {
    function AuthPrincipal(authorities, details, authenticated, principal) {
        this.authorities = authorities;
        this.details = details;
        this.authenticated = authenticated;
        this.principal = principal;
    }
    return AuthPrincipal;
}());
exports.AuthPrincipal = AuthPrincipal;
//# sourceMappingURL=auth.principal.js.map