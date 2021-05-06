"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanString = void 0;
var cleanString = function (str) {
    return str.trim().replace(/\n/g, ' ').replace(/ +/g, ' ');
};
exports.cleanString = cleanString;
