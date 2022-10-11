"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const words_controller_1 = require("../controller/words.controller");
function wordsRoutes(app) {
    app.get("/words", words_controller_1.getWord);
    app.post("/words", words_controller_1.addWords);
}
exports.default = wordsRoutes;
