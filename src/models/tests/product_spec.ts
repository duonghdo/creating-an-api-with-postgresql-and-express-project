import { ProductStore } from '../product';

const productStore = new ProductStore();

describe("Product Model", () => {
    let productId: number;
    it("should have an index method", () => {
        expect(productStore.index).toBeDefined();
    });

    it("should have a show method", () => {
        expect(productStore.show).toBeDefined();
    });

    it("should have a create method", () => {
        expect(productStore.create).toBeDefined();
    });

    it("should have a delete method", () => {
        expect(productStore.delete).toBeDefined();
    });

    it("create method should add a product", async () => {
        const result = await productStore.create({
            name: 'test',
            price: 1,
        });
        productId = result.id!;
        expect(result.name).toEqual('test');
        expect(result.price).toEqual(1);
    });

    it("index method should return a list of products", async () => {
        const result = await productStore.index();
        expect(result.length).toEqual(1);
    });

    it("show method should return the correct product", async () => {
        const result = await productStore.show(productId);
        expect(result.name).toEqual('test');
        expect(result.price).toEqual(1);
    });

    it("delete method should remove the product", async () => {
        await productStore.delete(productId);
        const result = await productStore.index();
        expect(result).toEqual([]);
    });
});