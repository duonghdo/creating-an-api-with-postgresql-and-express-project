import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);

describe('Test orders endpoints responses', () => {
    it('post /orders/ endpoint', async () => {
        const response = await request.post('/orders/').send({
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
        const response = await request.get('/orders/1');
        expect(response.status).toBe(200);
    });

    it('delete /orders/:id endpoint', async () => {
        const response = await request.delete('/orders/1');
        expect(response.status).toBe(200);
    });
});
