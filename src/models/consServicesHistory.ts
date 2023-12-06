import Client from "./client";
import Pet from "./pet";
import Service from "./service";

export default class ConsServHistory {
    private service: Service;
    private client: Client;
    private pet: Pet;
    constructor(service: Service, client: Client, pet: Pet) {
        this.service = service;
        this.client = client;
        this.pet = pet;
    }

    public get getService() {
        return this.service;
    }

    public get getClient() {
        return this.client;
    }

    public get getPet() {
        return this.pet;
    }
}