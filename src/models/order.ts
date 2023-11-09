import Client from '../database';
import { Product } from './product';

export type Order = {
    id?: number;
    user_id: number;
    complete: boolean;
    items?: Product[];
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            const sql2 = 'SELECT * FROM order_items WHERE order_id=($1)';
            const result2 = await conn.query(sql2, [id]);
            order.items = result2.rows;
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (user_id, complete) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.user_id, o.complete]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not add new order ${o.user_id}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}