import db from '../databaseConnection';
import Order from '../types/order-type';

class OrderModel {


    async showCurrentOrder(user_id: string): Promise<Order> {
        try {
            const sql = `select o.user_id, o.product_id, p.name, p.price, o.order_status from orders as o
            inner join products as p on o.product_id=p.id  WHERE user_id=($1) and order_status='active'`
            // @ts-ignore
            const connenction = await db.connect()

            const result = await connenction.query(sql, [user_id])

            connenction.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order with user_id: ${user_id}. Error: ${err}`)
        }
    }


    async create(o: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (product_id, user_id, quantity, order_status) VALUES($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const connenction = await db.connect()

            const result = await connenction
                .query(sql, [o.product_id, o.user_id, o.quantity, o.order_status])

            const order = result.rows[0]

            connenction.release()

            return order
        } catch (err) {
            throw new Error(`Could not add new order with product_id ${o.product_id}. Error: ${err}`)
        }
    }


}

export default OrderModel;