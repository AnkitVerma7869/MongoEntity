"use strict";
/**
 * Table Form Utilities Module
 * Provides helper functions for handling entity configuration and API interactions
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialAttributeState = exports.formatArrayToString = void 0;
exports.fetchEntityConfig = fetchEntityConfig;
exports.saveEntity = saveEntity;
var toast_1 = require("./toast");
// API endpoint from environment variables
var API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
/**
 * Converts an array to a comma-separated string
 * Used for displaying array values in table cells
 *
 * @param {string[] | undefined} arr - Array to format
 * @returns {string} Comma-separated string
 */
var formatArrayToString = function (arr) {
    return arr ? arr.join(', ') : '';
};
exports.formatArrayToString = formatArrayToString;
/**
 * Default configuration for a new attribute
 * Provides sensible defaults for all attribute properties
 */
exports.initialAttributeState = {
    name: "",
    dataType: "",
    defaultValue: null,
    validations: { required: false },
    inputType: 'text',
    isEditable: true,
    sortable: true,
    isIndexed: false,
    indexType: undefined,
    displayInList: true,
    isReadOnly: false
};
/**
 * Fetches entity configuration from MongoDB JSON file
 * Contains input types, data types, and other configuration options
 *
 * @returns {Promise<ConfigData>} Entity configuration data
 * @throws {Error} If fetch fails
 */
function fetchEntityConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/data/mongoEntityConfig.json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch MongoDB config');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching MongoDB config:', error_1);
                    throw new Error('Failed to fetch MongoDB configuration');
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Saves entity configuration to backend API
 *
 * @param {Entity} entity - Entity configuration to save
 * @param {string} token - Authentication token
 * @returns {Promise<{message: string, success: boolean}>} API response
 * @throws {Error} If API call fails
 */
function saveEntity(entity, token) {
    return __awaiter(this, void 0, void 0, function () {
        var transformedEntity, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    transformedEntity = {
                        entityName: entity.entityName,
                        attributes: entity.attributes.map(function (attr) { return ({
                            attributeName: attr.name,
                            inputType: attr.inputType,
                            dataType: attr.dataType.toLowerCase(),
                            defaultValue: attr.defaultValue || "",
                            options: attr.options,
                            isMultiSelect: attr.isMultiSelect,
                            isEditable: attr.isEditable !== undefined ? attr.isEditable : true,
                            sortable: attr.sortable !== undefined ? attr.sortable : true,
                            validations: attr.validations,
                            isReadOnly: attr.isReadOnly || false,
                            displayInList: attr.displayInList !== false,
                            isIndexed: attr.isIndexed || false,
                            indexType: attr.indexType || null
                        }); })
                    };
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/v1/entity/create"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(token)
                            },
                            body: JSON.stringify(transformedEntity),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!response.ok) {
                        if (data.error) {
                            // Show validation errors if they exist
                            if (Array.isArray(data.error.data)) {
                                data.error.data.forEach(function (errorMessage) {
                                    (0, toast_1.showToast)(errorMessage, 'error');
                                });
                            }
                            // Throw the exact error message from the API
                            throw new Error(data.error.message);
                        }
                        throw new Error(response.statusText);
                    }
                    return [2 /*return*/, {
                            message: data.message,
                            success: true
                        }];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error saving entity:', error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
