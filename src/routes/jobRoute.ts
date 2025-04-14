import { Router } from "express";
import { createJob, getJob } from "../controller/jobController";

const jobRoute = Router()

jobRoute.post('/create', createJob)
jobRoute.get('/:id',getJob)

export default jobRoute