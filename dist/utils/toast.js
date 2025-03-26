"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = void 0;
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
/**
 * Custom toast function to ensure only one toast at a time
 * @param message - The message to display in the toast
 * @param type - The type of toast ('success' or 'error')
 */
var showToast = function (message, type) {
    // Dismiss all existing toasts first
    react_hot_toast_1.default.dismiss();
    // Show new toast
    if (type === 'success') {
        react_hot_toast_1.default.success(message, {
            duration: 3000,
            position: 'top-right',
        });
    }
    else {
        react_hot_toast_1.default.error(message, {
            duration: 3000,
            position: 'top-right',
        });
    }
};
exports.showToast = showToast;
