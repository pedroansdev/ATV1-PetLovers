export default class Phone {
    private ddd: string;
    private number: string;
    constructor(ddd: string, number: string) {
        this.ddd = ddd;
        this.number = number;
    }

    public get getDDD(): string {
        return this.ddd;
    }

    public get getNumber(): string {
        return this.number;
    }

    public get getPhone(): string {
        return '(' + this.ddd + ')' + ' ' + this.number.substring(0,5) + '-' + this.number.substring(5,9);
    }
}