export default class Service {
    private id: number;
    private name: string;
    private type: string;
    private price: number;
    private timesConsumed: number;
    constructor(id: number, name: string, type: string, price: number) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.timesConsumed = 0;
    }

    public updateTimesConsumed(quantity: number) {
        this.timesConsumed += quantity;
    }

    public updateService(newName: string, newType: string, newPrice: number) {
        this.name = newName;
        this.type = newType;
        this.price = newPrice;
    }

    public get getId(): number {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getType(): string {
        return this.type;
    }

    public get getPriceValue(): number {
        return this.price;
    }

    public get getPrice(): string {
        return 'R$ ' + this.price.toFixed(2); 
    }

    public get getTimesConsumed(): number {
        return this.timesConsumed;
    }
}