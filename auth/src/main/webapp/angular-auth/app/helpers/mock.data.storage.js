"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockDataStorage = (function () {
    function MockDataStorage() {
    }
    MockDataStorage.getData = function (key) {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(mock[key]));
        }
        return localStorage.getItem(key);
    };
    MockDataStorage.addData = function (key, value) {
        var container = [];
        if (!localStorage.getItem(key)) {
            container.push(value);
            localStorage.setItem(key, JSON.stringify(container));
        }
        else {
            var data = JSON.parse(localStorage.getItem(key));
            if (typeof data !== 'object') {
                data = container;
                container.push(value);
            }
            else {
                data.push(value);
            }
            localStorage.setItem(key, JSON.stringify(data));
        }
    };
    return MockDataStorage;
}());
exports.MockDataStorage = MockDataStorage;
var mock = {
    'users': [
        { id: 1, username: 'sa', password: 'sa' },
        { id: 2, username: 'sa1', password: 'sa' }
    ]
};
//# sourceMappingURL=mock.data.storage.js.map