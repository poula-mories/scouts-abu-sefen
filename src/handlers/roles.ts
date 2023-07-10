import express, { Request, Response } from 'express';
import RoleModel  from '../models/role-model';


const getRoles = async (req: Request, res: Response) => {
    try {
        const Roles = await RoleModel.findAll({
            attributes: ['id', 'name']
        });
        // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(Roles);
    }
    catch (err) {
        console.log(err);
    }
}




const roleRoutes = (app: express.Application) => {
    app.get('/getRoles', getRoles)
}




export default roleRoutes;