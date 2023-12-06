import Client from "./client";
import Pet from "./pet";
import ProdConsByBreed from "./prodConsByBreed";
import ProdConsBySpecies from "./prodConsBySpecies";
import Product from "./product";
import ServConsByBreed from "./servConsByBreed";
import ServConsBySpecies from "./servConsBySpecies";
import Service from "./service";

export default class Company {
    private clients: Array<Client>;
    private products: Array<Product>;
    private services: Array<Service>;
    private pets: Array<Pet>;
    private prodHistorySpecies: Array<ProdConsBySpecies>;
    private prodHistoryBreed: Array<ProdConsByBreed>;
    private servHistorySpecies: Array<ServConsBySpecies>;
    private servHistoryBreed: Array<ServConsByBreed>;
    constructor(){
        this.clients = [];
        this.products = [];
        this.services = [];
        this.pets = [];
        this.prodHistorySpecies = [];
        this.prodHistoryBreed = [];
        this.servHistorySpecies = [];
        this.servHistoryBreed = [];
    }

    public updateClients(clients: Array<Client>) {
        this.clients = clients;
    }

    public addClient(client: Client) {
        this.clients.push(client);
    }

    public addProdHistSpecies(newProd: ProdConsBySpecies) {
        this.prodHistorySpecies.push(newProd);
    }

    public addProdHistBreed(newProd: ProdConsByBreed) {
        this.prodHistoryBreed.push(newProd);
    }

    public addServHistSpecies(newServ: ServConsBySpecies) {
        this.servHistorySpecies.push(newServ);
    }
    
    public addServHistBreed(newServ: ServConsByBreed) {
        this.servHistoryBreed.push(newServ);
    }

    public updatePets(pets: Array<Pet>) {
        this.pets = pets;
    }

    public addPet(pet: Pet) {
        this.pets.push(pet);
    }

    public updateProducts(products: Array<Product>) {
        this.products = products;
    }

    public addProduct(product: Product) {
        this.products.push(product);
    }

    public updateServices(services: Array<Service>) {
        this.services = services;
    }

    public addService(service:Service) {
        this.services.push(service);
    }

    public get getClients(): Array<Client> {
        return this.clients.sort((a, b) => a.getId - b.getId);
    }
    
    public get getProducts(): Array<Product> {
        return this.products.sort((a, b) => a.getId - b.getId);
    }
    
    public get getServices(): Array<Service> {
        return this.services.sort((a, b) => a.getId - b.getId);
    }

    public get getPets(): Array<Pet> {
        return this.pets.sort((a, b) => a.getId - b.getId);
    }

    public get getProdHistorySpecies(): Array<ProdConsBySpecies> {
        return this.prodHistorySpecies;
    }

    public get getProdHistoryBreed(): Array<ProdConsByBreed> {
        return this.prodHistoryBreed;
    }

    public get getServHistorySpecies(): Array<ServConsBySpecies> {
        return this.servHistorySpecies;
    }

    public get getServHistoryBreed(): Array<ServConsByBreed> {
        return this.servHistoryBreed;
    }
}