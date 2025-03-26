"use strict";
/**
 * Helper Functions Module
 * Contains utility functions used across the application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumericTypeCategory = exports.needsPrecision = exports.needsSizeValidation = void 0;
var dataTypeProperties_1 = require("../constants/dataTypeProperties");
/**
 * Checks if a given SQL data type requires size validation
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs size validation
 */
var needsSizeValidation = function (dataType) {
    var _a, _b;
    var type = dataType.toLowerCase();
    return (_b = (_a = dataTypeProperties_1.dataTypeProperties[type]) === null || _a === void 0 ? void 0 : _a.needsSize) !== null && _b !== void 0 ? _b : false;
};
exports.needsSizeValidation = needsSizeValidation;
/**
 * Checks if a given SQL data type requires precision specification
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs precision
 */
var needsPrecision = function (dataType) {
    var _a, _b;
    var type = dataType.toLowerCase();
    return (_b = (_a = dataTypeProperties_1.dataTypeProperties[type]) === null || _a === void 0 ? void 0 : _a.needsPrecision) !== null && _b !== void 0 ? _b : false;
};
exports.needsPrecision = needsPrecision;
/**
 * Categorizes numeric SQL data types into their respective categories
 * @param dataType - The SQL data type to categorize
 * @returns The category of the numeric type ('integer', 'decimal', 'floating') or null if not numeric
 */
var getNumericTypeCategory = function (dataType) {
    var type = dataType.toLowerCase();
    if (['smallint', 'integer', 'bigint'].includes(type)) {
        return 'integer';
    }
    if (['decimal', 'numeric'].includes(type)) {
        return 'decimal';
    }
    if (['real', 'double precision'].includes(type)) {
        return 'floating';
    }
    return null;
};
exports.getNumericTypeCategory = getNumericTypeCategory;
