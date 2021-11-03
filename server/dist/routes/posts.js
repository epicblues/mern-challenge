"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var posts_1 = require("../controllers/posts");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.default.Router();
router.get("/", posts_1.getPosts);
// 미들웨어 탑재
router.post("/", auth_1.default, posts_1.createPost);
router.patch("/:id", auth_1.default, posts_1.updatePost);
router.delete("/", auth_1.default, posts_1.deletePost);
router.patch("/:id/likePost", auth_1.default, posts_1.likePost);
exports.default = router;
//# sourceMappingURL=posts.js.map