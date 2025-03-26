"use strict";
/**
 * Validation Schemas Module
 * Defines Yup validation schemas for entity and attribute validation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumValuesSchema = exports.dataTypeSchema = exports.attributeNameSchema = exports.entityNameSchema = void 0;
var yup = __importStar(require("yup"));
/**
 * Schema for validating entity names
 * Rules:
 * - Required
 * - No spaces allowed
 * - Must start with letter or underscore
 * - Must contain at least 2 letters
 * - Length between 2-50 characters
 */
exports.entityNameSchema = yup.string()
    .required("Entity name is required")
    .transform(function (value) { return value === null || value === void 0 ? void 0 : value.trim(); })
    .test('no-spaces', 'Spaces are not allowed in entity name', function (value) {
    return value ? !value.includes(' ') : true;
})
    .matches(/^[a-zA-Z_][a-zA-Z0-9_-]*$/, "Entity name must start with a letter or underscore and can only contain letters, numbers, underscores, and hyphens")
    .test('min-letters', 'Entity name must contain at least 2 alphabetic characters', function (value) {
    return value ? (value.match(/[a-zA-Z]/g) || []).length >= 2 : true;
})
    .min(2, "Entity name must be at least 2 characters")
    .max(50, "Entity name must not exceed 50 characters");
/**
 * Schema for validating attribute names
 * Similar rules to entity name but specific to column attributes
 */
exports.attributeNameSchema = yup.string()
    .required("Attribute name is required")
    .transform(function (value) { return value === null || value === void 0 ? void 0 : value.trim(); })
    .test('no-spaces', 'Spaces are not allowed in attribute name', function (value) {
    return value ? !value.includes(' ') : true;
})
    .matches(/^[a-zA-Z_][a-zA-Z0-9_-]*$/, "Attribute name must start with a letter or underscore and can only contain letters, numbers, underscores, and hyphens")
    .test('min-letters', 'Attribute name must contain at least 2 alphabetic characters', function (value) {
    return value ? (value.match(/[a-zA-Z]/g) || []).length >= 2 : true;
})
    .min(2, "Attribute name must be at least 2 characters")
    .max(50, "Attribute name must not exceed 50 characters");
/**
 * Schema for validating data types
 * Ensures selected type is not empty
 */
exports.dataTypeSchema = yup.string()
    .required("Data type is required");
// Update enum values schema to require at least one value
exports.enumValuesSchema = yup.array()
    .min(1, 'At least one option is required')
    .test('unique-enum-values', 'Enum values must be unique (case-insensitive)', function (values) {
    if (!values || values.length === 0)
        return true;
    var lowercaseValues = values.map(function (v) { return v.value.toLowerCase(); });
    var uniqueValues = new Set(lowercaseValues);
    return uniqueValues.size === values.length;
});
