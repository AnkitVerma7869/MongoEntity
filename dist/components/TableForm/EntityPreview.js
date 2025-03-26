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
exports.default = EntityPreview;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var validationSchemas_1 = require("../../schemas/validationSchemas");
function EntityPreview(_a) {
    var _this = this;
    var attributes = _a.attributes, setAttributes = _a.setAttributes, setCurrentAttribute = _a.setCurrentAttribute, handleSaveEntity = _a.handleSaveEntity, resetForm = _a.resetForm, setEditingIndex = _a.setEditingIndex, entityName = _a.entityName, showToast = _a.showToast, isSaving = _a.isSaving;
    // Handle editing of an existing attribute
    var handleEditAttribute = function (index) {
        // Just load the attribute into the form
        setCurrentAttribute(attributes[index]);
        // Store the index being edited
        setEditingIndex(index);
    };
    // Handle deletion of an attribute
    var handleDeleteAttribute = function (index) {
        setAttributes(function (prev) { return prev.filter(function (_, i) { return i !== index; }); });
    };
    // Add validation before saving
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, validationSchemas_1.entityNameSchema.validate(entityName)];
                case 1:
                    _a.sent();
                    if (attributes.length === 0) {
                        showToast("Please add at least one attribute", 'error');
                        return [2 /*return*/];
                    }
                    // Properly construct the Entity object
                    return [4 /*yield*/, handleSaveEntity({
                            entityName: entityName,
                            attributes: attributes
                        })];
                case 2:
                    // Properly construct the Entity object
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        showToast(error_1.message, 'error');
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-stroke px-6.5 py-4 dark:border-strokedark", children: (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-xl text-black dark:text-white", children: "Entity Preview" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full table-auto", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "bg-gray-2 text-left dark:bg-meta-4", children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Attribute Name" }), (0, jsx_runtime_1.jsx)("th", { className: "px-3 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Data Type" }), (0, jsx_runtime_1.jsx)("th", { className: "px-3 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Input Type" }), (0, jsx_runtime_1.jsx)("th", { className: "px-2 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Editable" }), (0, jsx_runtime_1.jsx)("th", { className: "px-2 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Sortable" }), (0, jsx_runtime_1.jsx)("th", { className: "px-2 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Display Grid" }), (0, jsx_runtime_1.jsx)("th", { className: "px-2 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Read Only" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: attributes === null || attributes === void 0 ? void 0 : attributes.map(function (attr, index) { return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-4 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]", children: attr.name }), (0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-3 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]", children: attr.dataType }), (0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-3 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]", children: attr.inputType }), (0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-2 py-3 dark:border-strokedark text-center", children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: attr.isEditable, onChange: function (e) {
                                                        var updatedAttributes = __spreadArray([], attributes, true);
                                                        updatedAttributes[index] = __assign(__assign({}, attr), { isEditable: e.target.checked });
                                                        setAttributes(updatedAttributes);
                                                    }, className: "form-checkbox h-4 w-4 text-primary rounded border-stroke dark:border-strokedark" }) }), (0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-2 py-3 dark:border-strokedark text-center", children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: attr.sortable, onChange: function (e) {
                                                        var updatedAttributes = __spreadArray([], attributes, true);
                                                        updatedAttributes[index] = __assign(__assign({}, attr), { sortable: e.target.checked });
                                                        setAttributes(updatedAttributes);
                                                    }, className: "form-checkbox h-4 w-4 text-primary rounded border-stroke dark:border-strokedark" }) }), (0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-2 py-3 dark:border-strokedark text-center", children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: attr.displayInList !== false, onChange: function (e) {
                                                        var updatedAttributes = __spreadArray([], attributes, true);
                                                        updatedAttributes[index] = __assign(__assign({}, attr), { displayInList: e.target.checked });
                                                        setAttributes(updatedAttributes);
                                                    }, className: "form-checkbox h-4 w-4 text-primary rounded border-stroke dark:border-strokedark" }) }), (0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-2 py-3 dark:border-strokedark text-center", children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: attr.isReadOnly === true, onChange: function (e) {
                                                        var updatedAttributes = __spreadArray([], attributes, true);
                                                        updatedAttributes[index] = __assign(__assign({}, attr), { isReadOnly: e.target.checked });
                                                        setAttributes(updatedAttributes);
                                                    }, className: "form-checkbox h-4 w-4 text-primary rounded border-stroke dark:border-strokedark" }) }), (0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-4 py-3 dark:border-strokedark", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return handleEditAttribute(index); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Pencil, { className: "h-4 w-4 hover:text-primary" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return handleDeleteAttribute(index); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4 hover:text-meta-1" }) })] }) })] }, index)); }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4.5 flex flex-wrap gap-3", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleSave, disabled: isSaving, className: "inline-flex items-center justify-center rounded bg-primary px-6 py-2 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-70", children: "Save Entity" }), (0, jsx_runtime_1.jsx)("button", { onClick: resetForm, disabled: isSaving, className: "inline-flex items-center justify-center rounded btn-cancel-entity\r\n px-6 py-2 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-70", children: "Cancel" })] })] })] }));
}
