import express from "express";
import { createUser } from "./controller/userController";
import jwt from "jsonwebtoken";
import route from "./routes/userRoute";
import jobRoute from "./routes/jobRoute";

const app = express()
const secret_key = "abhishek"

app.use(express.json())
app.use(route)
app.use("/job",jobRoute)

// app.get('/', (req,res) =>{
//     const token = jwt.sign({user:'abhishek'},secret_key, {expiresIn: '1h'})
//     console.log(token)
//     res.json({
//         token:token
//     })
// })
// app.post('/signup' , createUser)


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})