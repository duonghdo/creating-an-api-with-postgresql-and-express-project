import Client from "../database";
import bcrypt from 'bcrypt';

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
} = process.env;

export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';

            const hash = bcrypt.hashSync(u.password+BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string));

            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }

    async authenticate(firstname: string, lastname:string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT password FROM users WHERE firstname=($1) AND lastname=($2)';
            const result = await conn.query(sql, [firstname, lastname]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password)) {
                    return user;
                }
            }
            return null;
        } catch (err) {
            throw new Error(`Could not authenticate user ${firstname}. Error: ${err}`);
        }
    }
}