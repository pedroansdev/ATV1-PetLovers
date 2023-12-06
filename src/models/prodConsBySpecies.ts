import Product from "./product";

export default class ProdConsBySpecies {
    private product: Product;
    private species: string;
    private timesConsumed: number;
    constructor(product: Product, species: string) {
        this.product = product;
        this.species = species;
        this.timesConsumed = 1;
    }
    
    public addTimesConsumed(number: number) {
        this.timesConsumed += number;
    }

    public get getProductId(): number {
        return this.product.getId;
    }

    public get getProductName(): string {
        return this.product.getName;
    }

    public get getSpecies(): string {
        return this.species;
    }

    public get getTimesConsumed(): number {
        return this.timesConsumed;
    }
}
