import Client from "./client";

export default class Pet {
    private id: number;
    private name: string;
    private size: string;
    private breed: string;
    private species: string;
    private genre: string;
    private owner: Array<Client>;
    constructor(id: number, name: string, size: string, breed: string, species: string, genre: string) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.breed = breed;
        this.species = species;
        this.genre = genre;
        this.owner = [];
    }

    public addOwner(owner: Client) {
        this.owner.push(owner);
    }

    public updateOwner(owner: Array<Client>) {
        this.owner = owner;
    }

    public updatePet(newName: string, newBreed: string, newGenre: string, newSize: string, newSpecies: string) {
        this.name = newName;
        this.size = newSize;
        this.breed = newBreed;
        this.species = newSpecies;
        this.genre = newGenre;
    }

    public get getId(): number {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getSize(): string {
        return this.size;
    }

    public get getBreed(): string {
        return this.breed;
    }

    public get getSpecies(): string {
        return this.species;
    }

    public get getGenre(): string {
        return this.genre;
    }

    public get getOwner(): Array<Client> {
        return this.owner;
    }
}