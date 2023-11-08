import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const userStore = new UserStore();

const index = async (_req: Request, res: Response) => {
    try {
        const users = await userStore.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await userStore.show(Number(req.params.id));
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };

        const newUser = await userStore.create(user);
        res.json(newUser);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await userStore.delete(Number(req.params.id));
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users/:id', destroy);
}

export default userRoutes;