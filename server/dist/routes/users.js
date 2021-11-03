"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = require("../controllers/users");
var router = express_1.default.Router();
router.post("/signin", users_1.signin);
router.post("/signup", users_1.signup);
exports.default = router;
//# sourceMappingURL=users.js.map