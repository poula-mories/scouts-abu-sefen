import express, { Request, Response } from 'express';
import TeamModel  from '../models/team-model';


const getTeams = async (req: Request, res: Response) => {
    try {
        const Teams = await TeamModel.findAll({
            attributes: ['id', 'name']
        });
        res.send(Teams);
    }
    catch (err) {
        console.log(err);
    }
}




const teamRoutes = (app: express.Application) => {
    app.get('/getTeams', getTeams)
}




export default teamRoutes;