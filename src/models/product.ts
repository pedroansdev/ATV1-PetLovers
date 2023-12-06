export default class Product {
    private id: number;
    private name: string;
    private price: number;
    private timesConsumed: number;
    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.timesConsumed = 0;
    }

    public updateTimesConsumed(quantity: number){
        this.timesConsumed += quantity;
    }

    public updateProduct(newName: string, newPrice: number) {
        this.name = newName;
        this.price = newPrice;
    }

    public get getId(): number {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getPrice(): string {
        return 'R$ ' + this.price.toFixed(2); 
    }

    public get getPriceValue(): number {
        return this.price;
    }

    public get getTimesConsumed(): number {
        return this.timesConsumed;
    }
}