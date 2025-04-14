import { Router } from "express";
import { createUser, loginUser } from "../controller/userController";

const route = Router()

route.post('/signup', createUser)

route.post('/login', loginUser)

export default route
