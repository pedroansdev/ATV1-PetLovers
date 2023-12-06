import Client from "./client";
import Pet from "./pet";
import Product from "./product";

export default class ConsProdHistory {
    private product: Product;
    private client: Client;
    private pet: Pet;
    constructor(product: Product, client: Client, pet: Pet) {
        this.product = product;
        this.client = client;
        this.pet = pet;
    }

    public get getProduct(): Product {
        return this.product;
    }

    public get getClient(): Client {
        return this.client;
    }

    public get getPet(): Pet {
        return this.pet;
    }

    public get getDescription(): string {
        return `${this.client.getName} ${this.product.getName}(${this.product.getPrice})`;
    }
}