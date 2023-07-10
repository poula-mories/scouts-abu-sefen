import express, { Request, Response } from 'express';
import Users  from '../models/user-model';
import User from '../types/user-type';
import Login from '../types/login-type';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



const getUsersNotApproved = async (req: Request, res: Response) => {
    // try {
    //     const authorizationHeader = req.headers.authorization as string
    //     const token = authorizationHeader.split(' ')[1]
    //     jwt.verify(token, process.env.TOKEN_SECRET as string)
    // } catch (err) {
    //     res.status(401)
    //     res.json('Access denied, invalid token')
    //     return
    // }
    try {
        
        const users = await Users.findAll({
            where: {
                isapproved: 0
            }
          });
        res.send(users);
    }
    catch (err) {
        console.log(err);
    }
}


// const getUser = async (req: Request, res: Response) => {
//     try {
//         const authorizationHeader = req.headers.authorization as string
//         const token = authorizationHeader.split(' ')[1]
//         jwt.verify(token, process.env.TOKEN_SECRET as string)
//     } catch (err) {
//         res.status(401)
//         res.json('Access denied, invalid token')
//         return
//     }
//     try {
//         const user = await usermodel.show(req.body.id);
//         res.send(user);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }





const deleteUser = async (req: Request, res: Response) => {

    try {
        const deltedUser = await Users.destroy({
            where: {
              id: req.body.user_id
            }
          });
        res.status(200);
        res.json(deltedUser);
    } catch (err) {
        console.log(err);
        res.status(400)
        res.json(err as string)
    }

}


const approve = async (req: Request, res: Response) => {

    try {
        const newUser = await Users.update({ isapproved: 1 , approval_user_id:req.body.approval_user_id}, {
            where: {
                id: req.body.user_id
            }
          });
        // var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.status(200);
        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(400)
        res.json(err as string)
    }

}


const authenticate = async (req: Request, res: Response) => {
    const user: Login = {
        email:req.body.email,
        password:req.body.password,
    }
    try {
        
        const existUser:any = await Users.findAll({
            raw: true,
            where: {
                email: user.email
            }
          });

        if(existUser.length == 0)
        {
            res.status(400)
            res.json('email not found')
        }
        else{

            const is_password_matched = bcrypt.compareSync(user.password + process.env.BCRYPT_PASSWORD, existUser[0].password );

            if(is_password_matched)
            {
                if(existUser[0].isapproved==1)
                {
                    var token = jwt.sign({ existUser }, process.env.TOKEN_SECRET as string);
                    existUser.token=token
                    res.status(200).json({existUser, token})
                }
                else
                {
                    res.status(400)
                    res.json("user not approved")
                }

            }
            else
            {
                res.status(400)
                res.json("wrong password")
            }
        }
        
    } catch (err) {
        res.status(400)
        res.json(err as string + user)
        console.log(err)
    }

}





const create = async (req: Request, res: Response) => {
    const user: User = {
        email:req.body.email,
        password:req.body.password,
        fullname:req.body.fullname,
        phone:req.body.phone,
        birth_date:req.body.birth_date,
        address:req.body.address,
        confession_father:req.body.confession_father,
        team_id:Number(req.body.team_id),
        role_id:Number(req.body.role_id),
        isapproved:0,
        isadmin:0,
        token:''
    }
    try {
        user.password = bcrypt.hashSync(user.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS as string));
        const newUser = await Users.create(user)
        // var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.status(200);
    } catch (err) {
        res.status(400).send(err);
        // res.json(err)
        // res.send(err);
        // res.json("user "+ user.fullname + " already exist")
    }

}


const userRoutes = (app: express.Application) => {
    app.post('/createUser', create)
    app.post('/approveUser', approve)
    app.get('/getUsersNotApproved', getUsersNotApproved)
    app.delete('/deleteUser', deleteUser)
    app.post('/authenticateUser', authenticate)
}

export default userRoutes;