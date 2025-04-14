"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const route = (0, express_1.Router)();
route.post('/signup', userController_1.createUser);
route.post('/login', userController_1.loginUser);
exports.default = route;
