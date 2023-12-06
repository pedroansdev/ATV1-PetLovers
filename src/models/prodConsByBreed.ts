import Product from "./product";

export default class ProdConsByBreed {
    private product: Product;
    private breed: string;
    private timesConsumed: number;
    constructor(product: Product, breed: string) {
        this.product = product;
        this.breed = breed;
        this.timesConsumed = 1;
    }
    
    public addTimesConsumed(number: number) {
        this.timesConsumed += number;
    }

    public get getProductId(): number {
        return this.product.getId;
    }

    public get getBreed(): string {
        return this.breed;
    }

    public get getTimesConsumed(): number {
        return this.timesConsumed;
    }
}
