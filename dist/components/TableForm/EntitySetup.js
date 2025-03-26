"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntitySetup;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var useEntitySetup_1 = require("../../hooks/useEntitySetup");
// Add index types constant
var INDEX_TYPES = {
    SINGLE_FIELD: 'single_field',
    COMPOUND: 'compound',
    UNIQUE: 'unique',
    TEXT: 'text',
    HASHED: 'hashed',
    GEOSPATIAL: 'geospatial',
    TTL: 'ttl'
};
function EntitySetup(_a) {
    var _this = this;
    var configData = _a.configData, entityName = _a.entityName, setEntityName = _a.setEntityName, attributes = _a.attributes, setAttributes = _a.setAttributes, currentAttribute = _a.currentAttribute, setCurrentAttribute = _a.setCurrentAttribute, isCustomEntity = _a.isCustomEntity, setIsCustomEntity = _a.setIsCustomEntity, selectedEntity = _a.selectedEntity, setSelectedEntity = _a.setSelectedEntity, editingIndex = _a.editingIndex, setEditingIndex = _a.setEditingIndex, handleSaveEntity = _a.handleSaveEntity, resetForm = _a.resetForm, showToast = _a.showToast;
    var _b = (0, useEntitySetup_1.useEntitySetup)({
        configData: configData,
        entityName: entityName,
        setEntityName: setEntityName,
        attributes: attributes,
        setAttributes: setAttributes,
        currentAttribute: currentAttribute,
        setCurrentAttribute: setCurrentAttribute,
        setIsCustomEntity: setIsCustomEntity,
        setSelectedEntity: setSelectedEntity,
        editingIndex: editingIndex,
        setEditingIndex: setEditingIndex,
        showToast: showToast
    }), errors = _b.errors, setErrors = _b.setErrors, originalHandleEntitySelect = _b.handleEntitySelect, handleEntityNameChange = _b.handleEntityNameChange, handleDefaultValueChange = _b.handleDefaultValueChange, handleValidationsChange = _b.handleValidationsChange, originalHandleAddAttribute = _b.handleAddAttribute;
    var addButtonText = editingIndex !== null ? 'Update Attribute' : 'Add Attribute';
    var _c = (0, react_1.useState)(''), selectedInputType = _c[0], setSelectedInputType = _c[1];
    var _d = (0, react_1.useState)([]), inputOptions = _d[0], setInputOptions = _d[1];
    var _e = (0, react_1.useState)(''), newOption = _e[0], setNewOption = _e[1];
    var _f = (0, react_1.useState)({}), validationErrors = _f[0], setValidationErrors = _f[1];
    var _g = (0, react_1.useState)(false), isMultiSelect = _g[0], setIsMultiSelect = _g[1];
    var _h = (0, react_1.useState)(false), isDataTypeDisabled = _h[0], setIsDataTypeDisabled = _h[1];
    var _j = (0, react_1.useState)(false), isIndexEnabled = _j[0], setIsIndexEnabled = _j[1];
    var _k = (0, react_1.useState)(''), selectedIndexType = _k[0], setSelectedIndexType = _k[1];
    var RESERVED_COLUMNS = ['created_at', 'updated_at'];
    var handleAttributeNameChange = function (e) {
        var value = e.target.value;
        if (RESERVED_COLUMNS.includes(value.toLowerCase())) {
            setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: "'".concat(value, "' is a reserved column name") })); });
        }
        else {
            setCurrentAttribute(__assign(__assign({}, currentAttribute), { name: value }));
            setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: undefined })); });
        }
    };
    var handleAddOption = function () {
        if (newOption.trim()) {
            var newOptionValue = newOption.trim();
            var newOptionObj = { value: newOptionValue, label: newOptionValue };
            var updatedOptions = __spreadArray(__spreadArray([], inputOptions, true), [newOptionObj], false);
            setInputOptions(updatedOptions);
            setCurrentAttribute(__assign(__assign({}, currentAttribute), { options: updatedOptions }));
            setNewOption('');
        }
    };
    var handleRemoveOption = function (indexToRemove) {
        var updatedOptions = inputOptions.filter(function (_, index) { return index !== indexToRemove; });
        setInputOptions(updatedOptions);
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { options: updatedOptions }));
    };
    var handleInputTypeChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var inputType, inputTypeConfig;
        return __generator(this, function (_a) {
            inputType = e.target.value;
            setSelectedInputType(inputType);
            setErrors({});
            setInputOptions([]);
            inputTypeConfig = configData.inputTypes[inputType];
            if (inputTypeConfig) {
                if (['select', 'radio', 'checkbox'].includes(inputType)) {
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: inputType, dataType: 'array', options: [], validations: {}, isMultiSelect: inputType === 'checkbox' }));
                    setIsMultiSelect(inputType === 'checkbox');
                    setIsDataTypeDisabled(true);
                }
                else {
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: inputType, dataType: inputTypeConfig.dataType, options: inputTypeConfig.options || [], validations: {}, isMultiSelect: undefined }));
                    if (inputTypeConfig.options) {
                        setInputOptions(inputTypeConfig.options);
                    }
                    setIsDataTypeDisabled(false);
                }
            }
            return [2 /*return*/];
        });
    }); };
    var handleDataTypeChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var newDataType;
        return __generator(this, function (_a) {
            setErrors({});
            newDataType = e.target.value.toLowerCase();
            // Check if current input type is select, checkbox, or radio
            if (['select', 'checkbox', 'radio'].includes(currentAttribute.inputType)) {
                showToast('Data type is fixed to array for select, checkbox, and radio input types', 'error');
                return [2 /*return*/];
            }
            // Validate against MongoDB data types from configData
            if (configData.dataTypes.map(function (type) { return type.toLowerCase(); }).includes(newDataType)) {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: undefined })); });
                setCurrentAttribute(__assign(__assign({}, currentAttribute), { dataType: newDataType, validations: {} }));
            }
            else {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: "Invalid data type" })); });
            }
            return [2 /*return*/];
        });
    }); };
    var handleValidationChange = function (e) {
        var _a, _b, _c;
        var validation = configData.validations
            .flatMap(function (g) { return g.validations; })
            .find(function (v) { return v.name === e.target.value; });
        if (validation) {
            // For date and timestamp types, ensure we're using date-specific validations
            if (['date', 'timestamp'].includes(currentAttribute.dataType)) {
                if (validation.name === 'min' || validation.name === 'max') {
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: __assign(__assign({}, currentAttribute.validations), (_a = {}, _a[validation.name] = new Date().toISOString().split('T')[0] // Set default to today's date
                        , _a)) }));
                }
                else {
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: __assign(__assign({}, currentAttribute.validations), (_b = {}, _b[validation.name] = validation.hasValue ? '' : true, _b)) }));
                }
            }
            else {
                setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: __assign(__assign({}, currentAttribute.validations), (_c = {}, _c[validation.name] = validation.hasValue ? '' : true, _c)) }));
            }
            // Don't set validation errors when initially adding a validation
            setValidationErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[validation.name] = undefined, _a)));
            });
        }
    };
    var handleValidationValueChange = function (key, value, validation) {
        var _a;
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: __assign(__assign({}, currentAttribute.validations), (_a = {}, _a[key] = value, _a)) }));
        // Mark the field as interacted with by setting the error state
        setValidationErrors(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = '', _a)));
        });
    };
    var clearValidationErrors = function () {
        setValidationErrors({});
    };
    var resetInputs = function () {
        var defaultInputType = 'text';
        var defaultConfig = configData.inputTypes[defaultInputType];
        setSelectedInputType(defaultInputType);
        setInputOptions([]);
        setNewOption('');
        clearValidationErrors();
        setIsDataTypeDisabled(false);
        setIsIndexEnabled(false);
        setSelectedIndexType(INDEX_TYPES.SINGLE_FIELD);
        setCurrentAttribute({
            name: '',
            dataType: defaultConfig.dataType,
            defaultValue: null,
            validations: {},
            options: [],
            inputType: defaultInputType,
            isEditable: true,
            sortable: true,
            isIndexed: false
        });
    };
    var handleSelectTypeChange = function (isMulti) {
        setIsMultiSelect(isMulti);
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: 'select', isMultiSelect: isMulti }));
    };
    var handleAddAttribute = function () { return __awaiter(_this, void 0, void 0, function () {
        var hasErrors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setErrors({});
                    hasErrors = false;
                    if (!currentAttribute.name) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: "Attribute name is required" })); });
                        hasErrors = true;
                    }
                    if (!selectedInputType) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { inputType: "Input type is required" })); });
                        hasErrors = true;
                    }
                    if (!currentAttribute.dataType) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: "Data type is required" })); });
                        hasErrors = true;
                    }
                    if ((['select', 'radio', 'checkbox'].includes(selectedInputType)) &&
                        (!inputOptions || inputOptions.length === 0)) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { options: "At least one option is required" })); });
                        hasErrors = true;
                    }
                    if (selectedInputType === 'select') {
                        setCurrentAttribute(__assign(__assign({}, currentAttribute), { isMultiSelect: isMultiSelect }));
                    }
                    if (hasErrors) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, originalHandleAddAttribute()];
                case 1:
                    _a.sent();
                    // Reset index type after adding attribute
                    setIsIndexEnabled(false);
                    setSelectedIndexType(INDEX_TYPES.SINGLE_FIELD);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEntitySelect = function (value) {
        originalHandleEntitySelect(value);
    };
    (0, react_1.useEffect)(function () {
        if (editingIndex === null) {
            resetInputs();
        }
    }, [attributes]);
    (0, react_1.useEffect)(function () {
        if (editingIndex !== null && currentAttribute.inputType) {
            setSelectedInputType(currentAttribute.inputType);
            if (currentAttribute.options) {
                setInputOptions(currentAttribute.options);
            }
            // Set index values when editing
            setIsIndexEnabled(!!currentAttribute.isIndexed);
            setSelectedIndexType(currentAttribute.indexType || INDEX_TYPES.SINGLE_FIELD);
        }
    }, [editingIndex, currentAttribute]);
    (0, react_1.useEffect)(function () {
        Object.entries(currentAttribute.validations).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var validation = configData.validations
                .flatMap(function (g) { return g.validations; })
                .find(function (v) { return v.name === key; });
            // Only show validation errors if the field has been interacted with
            if ((validation === null || validation === void 0 ? void 0 : validation.hasValue) &&
                (value === '' || value === null || value === undefined) &&
                validationErrors[key] !== undefined) {
                setValidationErrors(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[key] = "Value is required for ".concat(validation.label), _a)));
                });
            }
            else if (validationErrors[key] !== undefined) {
                setValidationErrors(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[key] = '', _a)));
                });
            }
        });
    }, [currentAttribute.validations]);
    var handleIndexTypeChange = function (e) {
        var indexType = e.target.value;
        setSelectedIndexType(indexType);
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { isIndexed: true, indexType: indexType || undefined }));
    };
    var handleIndexCheckboxChange = function (e) {
        var isChecked = e.target.checked;
        setIsIndexEnabled(isChecked);
        if (isChecked) {
            setCurrentAttribute(__assign(__assign({}, currentAttribute), { isIndexed: true, indexType: selectedIndexType || INDEX_TYPES.SINGLE_FIELD }));
        }
        else {
            setSelectedIndexType('');
            var indexType = currentAttribute.indexType, isIndexed = currentAttribute.isIndexed, rest = __rest(currentAttribute, ["indexType", "isIndexed"]);
            setCurrentAttribute(__assign(__assign({}, rest), { isIndexed: false }));
        }
    };
    // Add this useEffect to handle index values when editing
    (0, react_1.useEffect)(function () {
        if (editingIndex !== null && currentAttribute) {
            setIsIndexEnabled(!!currentAttribute.isIndexed);
            setSelectedIndexType(currentAttribute.indexType || '');
        }
    }, [editingIndex, currentAttribute]);
    // Add this function to get available index types based on data type
    var getAvailableIndexTypes = function (dataType) {
        var baseTypes = [
            { value: INDEX_TYPES.SINGLE_FIELD, label: 'Single Field Index' },
            { value: INDEX_TYPES.COMPOUND, label: 'Compound Index' },
            { value: INDEX_TYPES.UNIQUE, label: 'Unique Index' },
            { value: INDEX_TYPES.HASHED, label: 'Hashed Index' }
        ];
        if (dataType === 'string') {
            return __spreadArray(__spreadArray([], baseTypes, true), [
                { value: INDEX_TYPES.TEXT, label: 'Text Index' },
                { value: INDEX_TYPES.GEOSPATIAL, label: 'Geospatial Index' }
            ], false);
        }
        if (['date', 'timestamp'].includes(dataType)) {
            return __spreadArray(__spreadArray([], baseTypes, true), [
                { value: INDEX_TYPES.TTL, label: 'TTL Index' }
            ], false);
        }
        if (dataType === 'array') {
            return __spreadArray(__spreadArray([], baseTypes, true), [
                { value: INDEX_TYPES.TEXT, label: 'Text Index (if string array)' },
                { value: INDEX_TYPES.GEOSPATIAL, label: 'Geospatial Index (if geospatial array)' }
            ], false);
        }
        return baseTypes;
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-stroke px-6.5 py-4 dark:border-strokedark", children: (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-xl text-black dark:text-white", children: "Entity Setup" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6.5 space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col bg-meta-9/30 dark:bg-boxdark-2 rounded-md p-2.5 border border-stroke dark:border-strokedark", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-black dark:text-white mb-2", children: "Reserved columns:" }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2", children: RESERVED_COLUMNS.map(function (col, index) { return ((0, jsx_runtime_1.jsx)("code", { className: "inline-flex px-2.5 py-1 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded text-primary dark:text-white font-mono text-xs whitespace-nowrap shadow-sm", children: col }, col)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Select Entity ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: selectedEntity, onChange: function (e) { return handleEntitySelect(e.target.value); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select an entity" }), Object.keys(configData.entities).map(function (entity) { return ((0, jsx_runtime_1.jsx)("option", { value: entity, children: entity }, entity)); }), (0, jsx_runtime_1.jsx)("option", { value: "custom", children: "Create Custom Entity" })] })] }), (isCustomEntity || selectedEntity) && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Entity Name ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: entityName, onChange: handleEntityNameChange, className: "w-full rounded border-[1.5px] ".concat(errors.entityName ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter entity name" }), errors.entityName && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.entityName }))] })), (isCustomEntity || entityName) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Attribute Name ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: currentAttribute.name, onChange: handleAttributeNameChange, required: true, className: "w-full rounded border-[1.5px] ".concat(errors.attributeName ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter attribute name" }), errors.attributeName && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.attributeName }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Input Type", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: selectedInputType || 'text', onChange: handleInputTypeChange, className: "w-full rounded border-[1.5px] ".concat(errors.inputType ? 'border-meta-1' : 'border-stroke', " bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select input type" }), Object.entries(configData.inputTypes).map(function (_a) {
                                                var type = _a[0], config = _a[1];
                                                return ((0, jsx_runtime_1.jsxs)("option", { value: type, children: [type.charAt(0).toUpperCase() + type.slice(1), " (", config.htmlType || type, ")"] }, type));
                                            })] }), errors.inputType && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.inputType }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Data Type", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: currentAttribute.dataType, onChange: handleDataTypeChange, className: "w-full rounded border-[1.5px] ".concat(errors.dataType ? 'border-meta-1' : 'border-stroke', " bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select data type" }), configData.dataTypes.map(function (type) { return ((0, jsx_runtime_1.jsx)("option", { value: type, children: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() }, type)); })] }), errors.dataType && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.dataType }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: isIndexEnabled, onChange: handleIndexCheckboxChange, className: "form-checkbox h-4 w-4 text-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-black dark:text-white", children: "Add Index" })] }), isIndexEnabled && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Index Type" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedIndexType, onChange: handleIndexTypeChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select index type" }), getAvailableIndexTypes(currentAttribute.dataType).map(function (type) { return ((0, jsx_runtime_1.jsx)("option", { value: type.value, children: type.label }, type.value)); })] })] }))] }), selectedInputType === 'select' && ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Select Type" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 mt-2", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", checked: !isMultiSelect, onChange: function () { return handleSelectTypeChange(false); }, className: "form-radio h-4 w-4 text-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm", children: "Single Select" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", checked: isMultiSelect, onChange: function () { return handleSelectTypeChange(true); }, className: "form-radio h-4 w-4 text-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm", children: "Multi Select" })] })] })] }) })), (['select', 'radio', 'checkbox'].includes(selectedInputType) || currentAttribute.dataType === 'array') && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Options ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 ".concat(errors.options ? 'border-meta-1' : ''), children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: newOption, onChange: function (e) {
                                                    setNewOption(e.target.value);
                                                    setErrors({});
                                                }, className: "flex-1 rounded border-[1.5px] ".concat(errors.options ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter option value" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddOption, type: "button", className: "inline-flex items-center justify-center rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90", children: "Add Option" })] }), inputOptions.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2 mt-2", children: inputOptions.map(function (option, index) { return ((0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 text-xs bg-primary/10 text-primary rounded flex items-center gap-1", children: [option.label, (0, jsx_runtime_1.jsx)("button", { onClick: function () { return handleRemoveOption(index); }, className: "ml-1 hover:text-meta-1", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14 }) })] }, index)); }) })), errors.options && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.options }))] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Default Value" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: currentAttribute.defaultValue || '', onChange: handleDefaultValueChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", placeholder: "Enter default value" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Validations" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: (0, jsx_runtime_1.jsxs)("select", { value: "", onChange: handleValidationChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Add validation" }), (function () {
                                                            var _a, _b;
                                                            var allValidations = new Map();
                                                            // First add data type specific validations if they exist
                                                            if (currentAttribute.dataType) {
                                                                var validationGroup_1 = "";
                                                                switch (currentAttribute.dataType.toLowerCase()) {
                                                                    case 'string':
                                                                        validationGroup_1 = "String";
                                                                        break;
                                                                    case 'int':
                                                                    case 'long':
                                                                    case 'double':
                                                                        validationGroup_1 = "Number";
                                                                        break;
                                                                    case 'boolean':
                                                                        validationGroup_1 = "Boolean";
                                                                        break;
                                                                    case 'date':
                                                                    case 'timestamp':
                                                                        validationGroup_1 = "Date";
                                                                        break;
                                                                    case 'array':
                                                                        validationGroup_1 = "Array";
                                                                        break;
                                                                }
                                                                if (validationGroup_1) {
                                                                    var groupValidations = ((_a = configData.validations
                                                                        .find(function (g) { return g.group === validationGroup_1; })) === null || _a === void 0 ? void 0 : _a.validations) || [];
                                                                    groupValidations.forEach(function (validation) {
                                                                        allValidations.set(validation.name, validation);
                                                                    });
                                                                }
                                                            }
                                                            // Then add general validations that aren't already added
                                                            (_b = configData.validations
                                                                .find(function (g) { return g.group === "General"; })) === null || _b === void 0 ? void 0 : _b.validations.forEach(function (validation) {
                                                                if (!allValidations.has(validation.name)) {
                                                                    allValidations.set(validation.name, validation);
                                                                }
                                                            });
                                                            return Array.from(allValidations.values()).map(function (validation) { return ((0, jsx_runtime_1.jsx)("option", { value: validation.name, children: validation.label }, validation.name)); });
                                                        })()] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2", children: Object.entries(currentAttribute.validations).map(function (_a) {
                                                    var key = _a[0], value = _a[1];
                                                    var validation = configData.validations
                                                        .flatMap(function (g) { return g.validations; })
                                                        .find(function (v) { return v.name === key; });
                                                    if (!validation)
                                                        return null;
                                                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between w-full bg-gray-50 dark:bg-boxdark-2 p-2 rounded border border-stroke dark:border-strokedark", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 flex-grow", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: validation.label }), validation.hasValue && ((0, jsx_runtime_1.jsx)("input", { type: (function () {
                                                                                    if (['date', 'timestamp'].includes(currentAttribute.dataType) &&
                                                                                        (validation.name === 'min' || validation.name === 'max')) {
                                                                                        return 'date';
                                                                                    }
                                                                                    if (validation.valueType === 'date') {
                                                                                        return 'date';
                                                                                    }
                                                                                    if (validation.valueType === 'number') {
                                                                                        return 'number';
                                                                                    }
                                                                                    return 'text';
                                                                                })(), value: value || '', onChange: function (e) {
                                                                                    var newValue;
                                                                                    if (['date', 'timestamp'].includes(currentAttribute.dataType) &&
                                                                                        (validation.name === 'min' || validation.name === 'max')) {
                                                                                        newValue = e.target.value;
                                                                                    }
                                                                                    else if (validation.valueType === 'date') {
                                                                                        var date = new Date(e.target.value);
                                                                                        newValue = date.toISOString().split('T')[0];
                                                                                    }
                                                                                    else if (validation.valueType === 'number') {
                                                                                        newValue = Number(e.target.value);
                                                                                    }
                                                                                    else {
                                                                                        newValue = e.target.value;
                                                                                    }
                                                                                    handleValidationValueChange(key, newValue, validation);
                                                                                }, className: "flex-1 rounded border-[1.5px] ".concat(validationErrors[key] ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-1 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: (function () {
                                                                                    if (['date', 'timestamp'].includes(currentAttribute.dataType) &&
                                                                                        (validation.name === 'min' || validation.name === 'max')) {
                                                                                        return 'Select date';
                                                                                    }
                                                                                    if (validation.valueType === 'date') {
                                                                                        return 'Select date';
                                                                                    }
                                                                                    if (validation.valueType === 'number') {
                                                                                        return '0';
                                                                                    }
                                                                                    if (validation.isArray) {
                                                                                        return 'Enter values separated by comma';
                                                                                    }
                                                                                    return 'Enter value';
                                                                                })() }))] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () {
                                                                            var _a = currentAttribute.validations, _b = key, _ = _a[_b], restValidations = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                                                                            setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: restValidations }));
                                                                            setValidationErrors(function (prev) {
                                                                                var _a = prev, _b = key, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                                                                                return rest;
                                                                            });
                                                                        }, className: "text-meta-1 hover:text-meta-1/80 p-1 ml-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14 }) })] }), validationErrors[key] && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1 ml-2", children: validationErrors[key] }))] }, key));
                                                }) })] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddAttribute, className: "flex w-full justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90", children: addButtonText })] }))] })] }));
}
