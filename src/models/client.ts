import RG from "./rg";
import CPF from "./cpf";
import Phone from "./phone";
import Pet from "./pet";
import Product from "./product";
import Service from "./service";

export default class Client {
    private id: number;
    private name: string;
    private socialName: string;
    private cpf: CPF;
    private rgs: Array<RG>;
    private registrationDate: Date;
    private phones: Array<Phone>;
    private consumedProducts: Array<Product>;
    private consumedServices: Array<Service>;
    private pets: Array<Pet>;
    constructor(id: number, name: string, socialName: string, cpf: CPF) {
        this.id = id;
        this.name = name;
        this.socialName = socialName;
        this.cpf = cpf;
        this.rgs = [];
        this.registrationDate = new Date();
        this.phones = [];
        this.consumedProducts = [];
        this.consumedServices = [];
        this.pets = [];
    }
    
    public updateClient(newName: string, newSocialName: string, newRgs: Array<RG>, newPhones: Array<Phone>) {
        this.name = newName;
        this.socialName = newSocialName;
        this.rgs = newRgs;
        this.phones = newPhones;
    }

    public addConsProduct(product: Product) {
        this.consumedProducts.push(product);
    }

    public addConsService(service: Service) {
        this.consumedServices.push(service);
    }

    public addPet(pet: Pet) {
        this.pets.push(pet);
    }

    public deletePet(pet: Array<Pet>) {
        this.pets = pet;
    }

    public updatePets(pets: Array<Pet>) {
        this.pets = pets;
    }

    public addPhone(phone: Phone) {
        this.phones.push(phone);
    }

    public addRG(rg: RG) {
        this.rgs.push(rg);
    }

    public get getId(): number {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getSocialName(): string {
        return this.socialName;
    }

    public get getCPF(): string {
        return this.cpf.getFormattedValue;
    }

    public get getRGS(): Array<string> {
        return this.rgs.map(rg => rg.getFormattedValue);
    }

    public get getRGSFull(): Array<RG> {
        return this.rgs;
    }

    public get getRegistrationDate(): Date {
        return this.registrationDate;
    }

    public get getPhones(): Array<string> {
        return this.phones.map(phone => phone.getPhone);
    }

    public get getPhonesFull(): Array<Phone> {
        return this.phones;
    }

    public get getConsumedProducts(): Array<Product> {
        return this.consumedProducts;
    }

    public get getConsumedServies(): Array<Service> {
        return this.consumedServices;
    }

    public get getQuantityBought(): number {
        let sum = 0;
        return this.getConsumedProducts.length + this.consumedServices.length;
    }

    public get getTotalSpentValue(): number {
        let sum = 0;
        this.getConsumedProducts.forEach(product => {
            sum += product.getPriceValue;
        });
        this.getConsumedServies.forEach(service => {
            sum += service.getPriceValue;
        })
        return sum;
    }

    public get getTotalSpent(): string {
        let sum = 0;
        this.getConsumedProducts.forEach(product => {
            sum += product.getPriceValue;
        });
        this.getConsumedServies.forEach(service => {
            sum += service.getPriceValue;
        })
        return `R$ ${sum.toFixed(2)}`;
    }

    public get getPets(): Array<Pet> {
        return this.pets
    }

    public get getPetsFull(): Array<Pet> {
        return this.pets;
    }
}