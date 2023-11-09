import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);

describe('Test orders endpoints responses', () => {
    let token: string;

    beforeAll(async () => {
        const testUser = (await request.post('/users/').send({
            firstname: 'John',
            lastname: 'Doe',
            password: 'pw1234',
        }));
        token = testUser.body;
    });

    afterAll(async () => {
        await request.delete('/users/1').set('Authorization', 'Bearer ' + token);
    });

    it('post /orders/ endpoint', async () => {
        const response = await request.post('/orders/').set('Authorization', 'Bearer ' + token).send({
            complete: false,
            user_id: 1,
        });
        expect(response.status).toBe(200);
    });

    it('get /orders/ endpoint', async () => {
        const response = await request.get('/orders/');
        expect(response.status).toBe(200);
    });

    it('get /orders/:id endpoint', async () => {
        const response = await request.get('/orders/1').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it('delete /orders/:id endpoint', async () => {
        const response = await request.delete('/orders/1').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
});
