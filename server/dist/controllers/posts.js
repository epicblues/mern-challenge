"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var postMessage_1 = __importDefault(require("../models/postMessage"));
var getPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var PostMessages, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postMessage_1.default.find()];
            case 1:
                PostMessages = _a.sent();
                res.status(200).json(PostMessages);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(404).json({ message: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPosts = getPosts;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, newPost, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                post = req.body;
                newPost = new postMessage_1.default(post);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newPost.save()];
            case 2:
                _a.sent();
                // 실제로 db와 소통하는 부분
                res.status(200).json(newPost);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(409).json({ message: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var updatePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, post, updatedPost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                post = req.body;
                // destructuring시 프로퍼티 변수명 사용하고 싶지 않을 경우 (id => _id)
                if (!mongoose_1.default.Types.ObjectId.isValid(_id))
                    return [2 /*return*/, res.status(404).send("No post with that id")];
                return [4 /*yield*/, postMessage_1.default.findByIdAndUpdate(_id, post, {
                        new: true,
                    })];
            case 1:
                updatedPost = _a.sent();
                return [2 /*return*/, res.status(200).send(updatedPost)];
        }
    });
}); };
exports.updatePost = updatePost;
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body._id;
                if (!mongoose_1.default.Types.ObjectId.isValid(id))
                    return [2 /*return*/, res.status(404).send("No post with that id")];
                return [4 /*yield*/, postMessage_1.default.findByIdAndRemove(id)];
            case 1:
                _a.sent();
                res.json({ message: "Post deleted successfully" });
                return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
var likePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedPost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!mongoose_1.default.Types.ObjectId.isValid(id))
                    return [2 /*return*/, res.status(404).send("No post with that id")];
                return [4 /*yield*/, postMessage_1.default.findByIdAndUpdate(id, { $inc: { likeCount: 1 } }, {
                        new: true,
                    })];
            case 1:
                updatedPost = _a.sent();
                return [2 /*return*/, res.status(200).send(updatedPost)];
        }
    });
}); };
exports.likePost = likePost;
//# sourceMappingURL=posts.js.map