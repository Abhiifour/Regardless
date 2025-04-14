"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const jobRoute_1 = __importDefault(require("./routes/jobRoute"));
const app = (0, express_1.default)();
const secret_key = "abhishek";
app.use(express_1.default.json());
app.use(userRoute_1.default);
app.use("/job", jobRoute_1.default);
// app.get('/', (req,res) =>{
//     const token = jwt.sign({user:'abhishek'},secret_key, {expiresIn: '1h'})
//     console.log(token)
//     res.json({
//         token:token
//     })
// })
// app.post('/signup' , createUser)
app.listen(3000, () => {
    console.log('server is listening on port 3000');
});
