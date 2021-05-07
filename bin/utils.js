"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cammilify = exports.cleanString = void 0;
var cleanString = function (str) {
    return str.trim().replace(/\n/g, ' ').replace(/ +/g, ' ');
};
exports.cleanString = cleanString;
var cammilify = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.cammilify = cammilify;
