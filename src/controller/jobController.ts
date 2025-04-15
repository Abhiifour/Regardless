import prisma from "../utils";
import { Request, Response } from "express";
// import { createClient } from "redis";

// const client = createClient()

// async function connectRedis(){
//     client.on('error', (err) => console.log('Redis Client Error', err));
//     await client.connect()
// }

// connectRedis()



export const createJob = async (req: Request , res:Response):Promise<any> => {
    const {title, description, postedOn , appliedOn , createdBy} = req.body;

    const job = await prisma.job.create({
        data:{
            title, 
            description,
            postedOn,
            appliedOn,
            createdByUser:{
                connect:{
                    id:createdBy
                }
            },
            response:'Applied'
        }
    })

    if(job){

    
        return res.json({
            message:"job created",
            job:job
        })
    }

    return res.json({
        message:"job not created"
    })
}


export const getJob = async (req:Request, res:Response):Promise<any> =>{
    const {id} = req.params
    // const chachedJob = await client.get('jobs')
    // if(chachedJob){
    //     return res.json({
    //         message:"job found in chache",
    //         chachedJob:JSON.parse(chachedJob)
    //     })
    // }
    const jobs = await prisma.job.findMany({
        where:{
            createdBy:id
        }
    })
    if(jobs){
        // await client.set('jobs', JSON.stringify(jobs), {
        //     EX: 60, // 1 minute in seconds
        //     NX: true // Only set the key if it does not already exist
        // })
        return res.json({
            message:"job found",
            jobs:jobs
        })
    }

    res.json({
        message:"no jobs found"
    })
}



// Redis - 5ms , hence very fast.
// normally - 2.3s