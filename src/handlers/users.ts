import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import { verifyToken } from './verifyToken';

const {
    TOKEN_SECRET
} = process.env;

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
        const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
        res.json(token);
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

const authenticate = async (req: Request, res: Response) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    try {
        const user = await userStore.authenticate(firstname, lastname, password);
        res.json(user);
    } catch (err) {
        res.status(401);
        res.json(err);
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyToken, index);
    app.get('/users/:id', verifyToken, show);
    app.post('/users', create);
    app.delete('/users/:id', verifyToken, destroy);
    app.post('/users/authenticate', authenticate);
}

export default userRoutes;