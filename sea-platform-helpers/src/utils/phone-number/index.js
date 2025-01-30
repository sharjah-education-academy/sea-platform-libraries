"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePhoneNumber = void 0;
const normalizePhoneNumber = (phoneNumber) => {
    if (!phoneNumber)
        return null;
    return phoneNumber.replace(/^00/, '+');
};
exports.normalizePhoneNumber = normalizePhoneNumber;
