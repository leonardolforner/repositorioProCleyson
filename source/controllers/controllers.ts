import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { People, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();


const getAllStarships =  async (req: Request, res: Response) => {
    let starships = await prisma.starship.findMany();
    return res.status(200).json({
        message: starships
    })
    
}

const getStarship = async (req: Request, res:Response) => {
    let sId : any = req.body.sId;
    console.log(sId)
    let starship = await prisma.starship.findFirst({
        where:{
            id: sId
        }
    })
    console.log(starship)
    return res.status(200).json({
        message: starship
    })
}

const getAllPeople = async (req: Request, res: Response) => {
    let people = await prisma.people.findMany();
    return res.status(200).json({
        message: people
    })
}

const getAvailablePeople = async (req: Request, res: Response) => {
    let people = await prisma.people.findMany({
        where: {
            id: "none"
        }
});
    return res.status(200).json({
        message: people
    })
}

const getPeople = async (req: Request, res:Response) => {
    let pId : any = req.body.pId;
    let people = await prisma.people.findFirst({
        where:{
            id: pId
        },
    })
    return res.status(200).json({
        message: people
    })
}

const createCrew = (req: Request, res:Response) => {
    let sId = req.body.sId;
    let crew = req.body.crew;
    prisma.starship.update({
        where:{ name: sId },
        data: {
            crew_name: crew
        }
    })
}
//unsfinished
// const addToCrew = (req: Request, res:Response) => {
//     let sId = req.body.sId
//     let pId = req.body.pId;
//     let people = prisma.people.findFirst({
//         where:{
//             id: pId
//         },
//     })
//     prisma.starship.update({
//         where: {name: sId},
//         data: {
//             crew: {
//                 connect: {
//                     id:pId
//                 }
//             },
//             crew_current_amount: {increment: 1}
//         }
//     })
    
// }

const addToCrew = async (req: Request, res:Response) => {
    let sId = req.body.sId
    let pId = req.body.pId;
    let people; 
    await prisma.people.findMany(
        {
            where:{
                id: pId
            }
        }
    ).then(value => {
        console.log(value)
        people = value;
        return;
    })

    console.log(people)

    prisma.starship.update({
        where: {name: sId},
        data: {
            crew: people,
            crew_current_amount: {increment: 1}
        }
    }).then(value => {
        console.log("DONE -> " + value)
    })
    
}

const deleteCrew = (req: Request, res:Response) => {
    let sId = req.body.sId;
    prisma.starship.update({
        where: {id: sId},
        data: {
            //crew: {unset: []},//!!!!!!!!!!!!!!!!!!!!!!!
            crew_current_amount: 0,
            crew_name: "none",
            
        }
    })
}

const deleteFromCrew = (req: Request, res:Response) => {
    let sId = req.body.sId;
    let pId = req.body.pId;
    let people = prisma.people.findFirst({
        where:{
            id: pId
        },
    })
    
    prisma.starship.update({
        where: {name: sId},
        data: {
            //crew: {unset: people},//!!!!!!!!!!!!!!!!!!!!!!!
            crew_current_amount: 0,
            crew_name: "none",
        }
    })
}

export default {getAllStarships, getStarship, getAllPeople, getAvailablePeople, getPeople, createCrew, addToCrew, deleteCrew, deleteFromCrew}