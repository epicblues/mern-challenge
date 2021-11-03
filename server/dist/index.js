"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
// package.json 에서 "type" : "module" 선언을 통해 활용 가능
var posts_1 = __importDefault(require("./routes/posts"));
var users_1 = __importDefault(require("./routes/users"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// .env 파일을 Node의 환경변수로 인식하게 해주는 라이브러리
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
// 미들웨어 적용 순서 매우 중요 -> 요청 처리에 본격적으로 들어가기 전에 Cross Origin을 허용하도록 해주는 미들웨어가
// 먼저 작동해야 한다.
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", posts_1.default);
app.use("/user", users_1.default);
app.get("/", function (req, res) {
    res.send("Hello to memories API");
});
var PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    app.listen(PORT, function () {
        console.log("Server running on port : " + PORT);
    });
})
    .catch(function (err) {
    console.log(err.message);
});
// mongoose.set("useFindAndModify" as keyof MongooseOptions, true);
//# sourceMappingURL=index.js.map