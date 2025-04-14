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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJob = exports.createJob = void 0;
const utils_1 = __importDefault(require("../utils"));
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        client.on('error', (err) => console.log('Redis Client Error', err));
        yield client.connect();
    });
}
connectRedis();
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, postedOn, appliedOn, createdBy } = req.body;
    const job = yield utils_1.default.job.create({
        data: {
            title,
            description,
            postedOn,
            appliedOn,
            createdByUser: {
                connect: {
                    id: createdBy
                }
            },
            response: 'Applied'
        }
    });
    if (job) {
        return res.json({
            message: "job created",
            job: job
        });
    }
    return res.json({
        message: "job not created"
    });
});
exports.createJob = createJob;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const chachedJob = yield client.get('jobs');
    if (chachedJob) {
        return res.json({
            message: "job found in chache",
            chachedJob: JSON.parse(chachedJob)
        });
    }
    const jobs = yield utils_1.default.job.findMany({
        where: {
            createdBy: id
        }
    });
    if (jobs) {
        yield client.set('jobs', JSON.stringify(jobs), {
            EX: 60, // 1 minute in seconds
            NX: true // Only set the key if it does not already exist
        });
        return res.json({
            message: "job found",
            jobs: jobs
        });
    }
    res.json({
        message: "no jobs found"
    });
});
exports.getJob = getJob;
