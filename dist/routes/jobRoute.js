"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controller/jobController");
const jobRoute = (0, express_1.Router)();
jobRoute.post('/create', jobController_1.createJob);
jobRoute.get('/:id', jobController_1.getJob);
exports.default = jobRoute;
