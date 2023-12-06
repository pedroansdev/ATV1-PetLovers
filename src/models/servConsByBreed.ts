import Service from "./service";

export default class ServConsByBreed {
    private service: Service;
    private breed: string;
    private timesConsumed: number;
    constructor(service: Service, breed: string) {
        this.service = service;
        this.breed = breed;
        this.timesConsumed = 1;
    }
    
    public addTimesConsumed(number: number) {
        this.timesConsumed += number;
    }

    public get getServiceId(): number {
        return this.service.getId;
    }

    public get getBreed(): string {
        return this.breed;
    }

    public get getTimesConsumed(): number {
        return this.timesConsumed;
    }
}
