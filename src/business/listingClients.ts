import Client from "../models/client";
import Company from "../models/company";
import ListingModel from "./listingModel";

export default class ListClients extends ListingModel {
    private clients: Array<Client>;
    private company: Company;
    constructor(company: Company) {
        super();
        this.clients = company.getClients;
        this.company = company;
    }
    
    public list(): void {
        console.log(`\nLISTA DE TODOS OS CLIENTES:`);
        this.clients.forEach(client => {
            console.log(`\nId: ${client.getId}`);
            console.log(`Nome: ${client.getName}`);
            console.log(`Nome social: ${client.getSocialName}`);
            console.log(`Data de registro: ${client.getRegistrationDate}`);
            console.log(`CPF: ${client.getCPF}`);
            if(client.getRGS.length === 1) {
                console.log(`RG: ${client.getRGS}`);
            } else {
                let count = 1;
                client.getRGS.forEach(rg => {
                    console.log(`RG ${count}: ${rg}`);
                    count += 1;
                });
            }
            if(client.getPhones.length === 1) {
                console.log(`Telefone: ${client.getPhones}`);
            } else {
                let count = 1;
                client.getPhones.forEach(phone => {
                    console.log(`Telefone ${count}: ${phone}`);
                    count += 1;
                });
            }
            if(client.getPets.length === 1) {
                console.log(`Pet: ${client.getPets[0].getName}(${client.getPets[0].getSpecies}`);
                console.log(`     ${client.getPets[0].getBreed} - ${client.getPets[0].getSize}`);
                console.log(`     ${client.getPets[0].getGenre}`);
            } else if(client.getPets.length > 1) {
                let count = 1;
                client.getPets.forEach(pet => {
                    console.log(`Pet ${count}: ${pet.getName}(${pet.getSpecies})\n`);
                    console.log(`       ${pet.getBreed} - ${pet.getSize}`);
                    console.log(`       ${pet.getGenre}`);
                    count += 1;
                });
            } else {
                console.log(`Pet: [Não possui]\n`);
            }
            console.log(`Quantidade comprada na loja: ${client.getQuantityBought}`);
            console.log(`Total gasto na loja: ${client.getTotalSpent} \n`);
            console.log(`=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
        });
    }
}