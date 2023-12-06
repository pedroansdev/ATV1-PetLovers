import Service from "./service";

export default class ServConsBySpecies {
    private service: Service;
    private species: string;
    private timesConsumed: number;
    constructor(service: Service, species: string) {
        this.service = service;
        this.species = species;
        this.timesConsumed = 1;
    }
    
    public addTimesConsumed(number: number) {
        this.timesConsumed += number;
    }
    
    public get getServiceId(): number {
        return this.service.getId;
    }

    public get getSpecies(): string {
        return this.species;
    }

    public get getTimesConsumed(): number {
        return this.timesConsumed;
    }
}