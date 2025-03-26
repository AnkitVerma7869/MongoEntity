"use strict";
'use client';
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TableForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
var utilstableform_1 = require("../../utils/utilstableform");
var toast_1 = require("../../utils/toast");
var EntitySetup_1 = __importDefault(require("./EntitySetup"));
var EntityPreview_1 = __importDefault(require("./EntityPreview"));
var EntityRoutes_1 = __importDefault(require("./EntityRoutes"));
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
// Loading component shown while fetching initial data
var LoadingState = function () { return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-screen", children: (0, jsx_runtime_1.jsx)("div", { className: "text-lg", children: "Loading..." }) })); };
// Add FullPageLoader component
var FullPageLoader = function () { return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg p-8 flex flex-col items-center space-y-3 shadow-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-primary" }), (0, jsx_runtime_1.jsx)("p", { className: "text-primary font-medium", children: "Saving Entity..." })] }) })); };
function TableForm(_a) {
    var _this = this;
    var token = _a.token;
    // Configuration state
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)({
        entities: {},
        dataTypes: [],
        validations: [],
        inputTypes: {}
    }), configData = _c[0], setConfigData = _c[1];
    // Form state management
    var _d = (0, react_1.useState)(""), entityName = _d[0], setEntityName = _d[1];
    var _e = (0, react_1.useState)([]), attributes = _e[0], setAttributes = _e[1];
    var _f = (0, react_1.useState)(utilstableform_1.initialAttributeState), currentAttribute = _f[0], setCurrentAttribute = _f[1];
    var _g = (0, react_1.useState)(false), isCustomEntity = _g[0], setIsCustomEntity = _g[1];
    var _h = (0, react_1.useState)(""), selectedEntity = _h[0], setSelectedEntity = _h[1];
    var _j = (0, react_1.useState)(null), editingIndex = _j[0], setEditingIndex = _j[1];
    var _k = (0, react_1.useState)(false), isSaving = _k[0], setIsSaving = _k[1];
    var router = (0, navigation_1.useRouter)();
    // Load initial configuration data
    (0, react_1.useEffect)(function () {
        var loadConfig = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, (0, utilstableform_1.fetchEntityConfig)()];
                    case 1:
                        data = _a.sent();
                        setConfigData(data);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error loading configuration:', error_1);
                        (0, toast_1.showToast)('Error loading configuration', 'error');
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadConfig();
    }, []);
    // Show loading state while fetching config
    if (loading) {
        return (0, jsx_runtime_1.jsx)(LoadingState, {});
    }
    // Reset form to initial state
    var resetForm = function () {
        setEntityName("");
        setAttributes([]);
        setCurrentAttribute(utilstableform_1.initialAttributeState);
        setIsCustomEntity(false);
        setSelectedEntity("");
    };
    // Handle entity save operation
    var handleSaveEntity = function (entity) { return __awaiter(_this, void 0, void 0, function () {
        var trimmedEntityName, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trimmedEntityName = entityName.trim();
                    // Validate required fields
                    if (!trimmedEntityName) {
                        (0, toast_1.showToast)("Entity Name is required!", 'error');
                        return [2 /*return*/];
                    }
                    if (attributes.length === 0) {
                        (0, toast_1.showToast)("At least one attribute is required!", 'error');
                        return [2 /*return*/];
                    }
                    setIsSaving(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (0, utilstableform_1.saveEntity)(entity, token)];
                case 2:
                    result = _a.sent();
                    if (result.success) {
                        // Store entity info in localStorage instead of query params
                        localStorage.setItem('newEntity', JSON.stringify({
                            name: entity.entityName,
                            message: result.message
                        }));
                        (0, toast_1.showToast)(result.message, 'success');
                        router.push('/entities');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    (0, toast_1.showToast)(error_2 instanceof Error ? error_2.message : 'Failed to save entity', 'error');
                    return [3 /*break*/, 5];
                case 4:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [isSaving && (0, jsx_runtime_1.jsx)(FullPageLoader, {}), (0, jsx_runtime_1.jsx)(react_hot_toast_1.Toaster, {}), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-12 gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-4", children: (0, jsx_runtime_1.jsx)(EntitySetup_1.default, { configData: configData, entityName: entityName, setEntityName: setEntityName, attributes: attributes, setAttributes: setAttributes, currentAttribute: currentAttribute, setCurrentAttribute: setCurrentAttribute, isCustomEntity: isCustomEntity, setIsCustomEntity: setIsCustomEntity, selectedEntity: selectedEntity, setSelectedEntity: setSelectedEntity, editingIndex: editingIndex, setEditingIndex: setEditingIndex, handleSaveEntity: handleSaveEntity, resetForm: resetForm, showToast: toast_1.showToast }) }), (0, jsx_runtime_1.jsxs)("div", { className: "col-span-8 space-y-4", children: [(0, jsx_runtime_1.jsx)(EntityPreview_1.default, { attributes: attributes, setAttributes: setAttributes, setCurrentAttribute: setCurrentAttribute, handleSaveEntity: handleSaveEntity, resetForm: resetForm, setEditingIndex: setEditingIndex, entityName: entityName, showToast: toast_1.showToast, isSaving: isSaving }), (0, jsx_runtime_1.jsx)(EntityRoutes_1.default, { entityName: entityName })] })] })] }));
}
