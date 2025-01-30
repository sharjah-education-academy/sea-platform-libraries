"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = exports.normalizeString = void 0;
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const normalizeString = (str) => {
    if (str)
        return str.trim().toLowerCase();
    return null;
};
exports.normalizeString = normalizeString;
const generateRandomString = (length = 6) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};
exports.generateRandomString = generateRandomString;
