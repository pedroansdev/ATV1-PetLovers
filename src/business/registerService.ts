import Input from "../io/input";
import Company from "../models/company";
import Service from "../models/service";
import { Capitalize } from "../utilities/formats";
import RegisterModel from "./registerModel";

export default class RegisterService extends RegisterModel {
    private services: Array<Service>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.services = company.getServices;
        this.input = new Input();
    }

    public register(): void {
        console.log(`\nCADASTRO DE PRODUTOS\n`);
        let name = this.input.receiveText(`Nome do serviço: `);
        let type = this.input.receiveText(`Tipo do serviço: `);
        let price = this.input.receiveNumber(`Preço do serviço: `).valueOf();

        var lastId!: number;
        
        let lengthArray = this.company.getServices.length; 

        if(lengthArray === 0){
            lastId = 1;
        } else {
            lastId = lengthArray + 1;
        }

        let service = new Service(lastId, Capitalize(name), Capitalize(type), price);

        this.company.addService(service);

        console.log(`\nCADASTRO CONCLUÍDO COM SUCESSO!`);
    }
}