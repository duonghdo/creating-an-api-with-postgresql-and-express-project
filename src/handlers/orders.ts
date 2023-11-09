import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { verifyToken } from './verifyToken';

const orderStore = new OrderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await orderStore.index();
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.show(Number(req.params.id));
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            complete: req.body.complete,
            user_id: req.body.user_id,
        };

        const newOrder = await orderStore.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await orderStore.delete(Number(req.params.id));
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', verifyToken, show);
    app.post('/orders', verifyToken, create);
    app.delete('/orders/:id', verifyToken, destroy);
}

export default orderRoutes;