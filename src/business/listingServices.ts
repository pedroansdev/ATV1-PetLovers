import Company from "../models/company";
import Service from "../models/service";
import ListingModel from "./listingModel";

export default class ListServices extends ListingModel {
    private services: Array<Service>;
    private company: Company;
    constructor(company: Company) {
        super();
        this.company = company;
        this.services = company.getServices;
    }

    public list():void {
        console.log(`\nLISTA DE SERVIÇOS:`);
        this.services.forEach(service => {
            console.log(`\nId: ${service.getId}`);
            console.log(`Nome: ${service.getName}`);
            console.log(`Tipo: ${service.getType}`);
            console.log(`Preço: ${service.getPrice}\n`);
            console.log(`Vezes consumido: ${service.getTimesConsumed}\n`);
            console.log(`=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
        });
    }
}