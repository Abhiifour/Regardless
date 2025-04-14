import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()
const secret_key = "abhishek"


export const createUser = async (req: Request, res : Response) => {
    const {email , password , name} = req.body;

    const user = await prisma.user.create({
        data:{
            email,
            password,
            name
        }
    })

    res.json({
        message:"user created"
    })
}


export const loginUser = async (req: Request , res: Response) : Promise<any> =>  {
    const {email , password} = req.body;
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

  
    if(user){
        if(user.password === password){
            const token = jwt.sign({email},secret_key, {expiresIn: '1h'})
            return res.json({
                user:user,
                token
            })
        }
        else{
            return res.json({
                message:"password is incorrect"
            })
        }
    }

    return res.json({
        message:"user not found"
    })
}