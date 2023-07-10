import express, { Request, Response } from 'express';
import OrderModel from '../models/order-model';
import Order from '../types/order-type';
import jwt from 'jsonwebtoken';


const ordermodel = new OrderModel();


const getCurrentOrder = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const orders = await ordermodel.showCurrentOrder(req.body.user_id);
        res.send(orders);
    }
    catch (err) {
        console.log(err);
    }
}



const createOrder = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    const order: Order = {
        id: req.body.id,
        product_id: req.body.product_id,
        user_id: req.body.user_id,
        quantity: req.body.quantity,
        order_status: req.body.order_status,
    }
    try {
        const newOrder = await ordermodel.create(order)
        res.status(200);
        res.json(newOrder);
    } catch (err) {
        console.log(err);
        res.status(400)
        res.json(err as string + order)
    }

}




const orderRoutes = (app: express.Application) => {
    app.get('/showCurrentOrder', getCurrentOrder)
    app.post('/createOrder', createOrder)
}




export default orderRoutes;