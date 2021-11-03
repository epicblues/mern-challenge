"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    id: String,
    name: { type: String, required: true },
});
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user.js.map