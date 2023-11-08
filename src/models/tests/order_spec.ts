import { Order, OrderStore } from '../order';

const orderStore = new OrderStore();

describe('Order Model', () => {
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(orderStore.delete).toBeDefined();
    });

    it('create method should add a order', async () => {
        const result = await orderStore.create({
            complete: false,
            user_id: 1,
        });
        expect(result).toEqual({
            id: 2,
            complete: false,
            user_id: 1,
        });
    });

    it('index method should return a list of orders', async () => {
        const result = await orderStore.index();
        expect(result).toEqual([
            {
                id: 2,
                complete: false,
                user_id: 1,
            },
        ]);
    });

    it('show method should return the correct order', async () => {
        const result = await orderStore.show(2);
        expect(result).toEqual({
            id: 2,
            complete: false,
            user_id: 1,
        });
    });

    it('delete method should remove the order', async () => {
        await orderStore.delete(2);
        const result = await orderStore.index();
        expect(result).toEqual([]);
    });
});
