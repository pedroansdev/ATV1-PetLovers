import Input from "../io/input";
import Client from "../models/client";
import Company from "../models/company";
import Pet from "../models/pet";
import ProdConsByBreed from "../models/prodConsByBreed";
import ProdConsBySpecies from "../models/prodConsBySpecies";
import Product from "../models/product";
import ServConsByBreed from "../models/servConsByBreed";
import ServConsBySpecies from "../models/servConsBySpecies";
import Service from "../models/service";
import { Capitalize } from "../utilities/formats";
import ListingModel from "./listingModel";

export default class ListGeneral extends ListingModel {
    private company: Company;
    private products: Array<Product>;
    private prodHistSpecies: Array<ProdConsBySpecies>;
    private prodHistBreed: Array<ProdConsByBreed>;
    private servHistSpecies: Array<ServConsBySpecies>;
    private servHistBreed: Array<ServConsByBreed>;
    private services: Array<Service>;
    private clients: Array<Client>;
    private pets: Array<Pet>;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.products = company.getProducts;
        this.services = company.getServices;
        this.prodHistSpecies = company.getProdHistorySpecies;
        this.prodHistBreed = company.getProdHistoryBreed
        this.servHistSpecies = company.getServHistorySpecies;
        this.servHistBreed = company.getServHistoryBreed;
        this.clients = company.getClients;
        this.pets = company.getPets;
        this.input = new Input();
    }
    public list(): void {
        let execution = true;

        while(execution) {
            console.log(`\n1 - Top 10 clientes que mais consumiram produtos e serviços (quantidade)`);
            console.log(`2 - Top 5 clientes que mais consumiram produtos e serviços (valor)`);
            console.log(`3 - Listagem geral dos produtos mais consumidos`);
            console.log(`4 - Listagem geral dos serviços mais consumidos`);
            console.log(`5 - Listagem geral dos produtos e serviços mais consumidos`);
            console.log(`6 - Listagem geral dos produtos mais consumidos por tipo (espécie)`);
            console.log(`7 - Listagem geral dos produtos mais consumidos por raça`);
            console.log(`8 - Listagem geral dos serviços mais consumidos por tipo (espécie)`);
            console.log(`9 - Listagem geral dos serviços mais consumidos por raça`);
            console.log(`0 - Voltar`);
            let option = this.input.receiveNumber(`Por favor, informe a operação desejada: `);

            let orderedList: any[] = [];
            let count = 1;

            switch(option) {
                case 1:
                    console.log(`\nTOP CLIENTES QUE MAIS CONSUMIRAM (EM QUANTIDADE):`);

                    orderedList = this.company.getClients.sort((a, b) => b.getQuantityBought - a.getQuantityBought);
                    if(orderedList.length < 10) {
                        orderedList.forEach(client => {
                            console.log(`${count} - ${client.getName} (${client.getQuantityBought})`);
                            count ++;
                        });
                    } else {
                        for(let i = 0; i < 10; i++){
                            orderedList.forEach(client => console.log(`${i + 1} - ${client.getName} (${client.getQuantityBought})`))
                        }
                    }
                    break;
                case 2:
                    console.log(`\nTOP CLIENTES QUE MAIS CONSUMIRAM (EM VALOR):`);

                    orderedList = this.company.getClients.sort((a, b) => b.getTotalSpentValue - a.getTotalSpentValue);
                    if(orderedList.length < 5) {
                        orderedList.forEach(client => {
                            console.log(`${count} - ${client.getName} (${client.getTotalSpent})`);
                            count ++;
                        });
                    } else {
                        for(let i = 0; i < 5; i ++) {
                            orderedList.forEach(client => `${i + 1} - ${client.getName} (${client.getTotalSpent})`);
                        }
                    }
                    break;
                case 3:
                    orderedList = [];

                    console.log(`\nPRODUTOS MAIS CONSUMIDOS:`);
                    
                    this.company.getProducts.forEach(product => orderedList.push(product));
                    
                    orderedList = orderedList.sort((a, b) => b.getTimesConsumed - a.getTimesConsumed);

                    orderedList.forEach(product => {
                        console.log(`${count} - ${product.getName} (${product.getTimesConsumed})`);
                    });
                    break;
                case 4:
                    orderedList = [];

                    console.log(`\nSERVIÇOS MAIS CONSUMIDOS:`);
                    
                    this.company.getServices.forEach(service => orderedList.push(service));
                    
                    orderedList = orderedList.sort((a, b) => b.getTimesConsumed - a.getTimesConsumed);

                    orderedList.forEach(service => {
                        console.log(`${count} - ${service.getName} (${service.getTimesConsumed})`);
                    });
                    break;
                case 5:
                    orderedList = [];

                    console.log(`\nTODOS OS PRODUTOS E SERVIÇOS MAIS CONSUMIDOS:`);
                    
                    this.company.getProducts.forEach(product => orderedList.push(product));
                    this.company.getServices.forEach(service => orderedList.push(service));
                    
                    orderedList = orderedList.sort((a, b) => b.getTimesConsumed - a.getTimesConsumed);
                    
                    orderedList.forEach(item => {
                        console.log(`${count} - ${item.getName} (${item.getTimesConsumed})`);
                        count++;
                    });
                    break;
                case 6:
                    orderedList = [];

                    console.log(`\nLISTA DE PRODUTOS MAIS CONSUMIDOS POR ESPÉCIE:`);

                    let species = Capitalize(this.input.receiveText(`Escreva a espécie que você deseja para a listagem: `));

                    this.company.getProdHistorySpecies.forEach(item => {
                        if(item.getSpecies === species) {
                            orderedList.push(item);
                        }
                    });

                    orderedList = orderedList.sort((a, b) => b.getTimesConsumed - a.getTimesConsumed);

                    orderedList.forEach(item => {
                        console.log(`${count} - ${item.getProductName} (${item.getTimesConsumed})`);
                        count++;
                    });
                    break;
                case 7:
                    orderedList = [];

                    console.log(`\nLISTA DE PRODUTOS MAIS CONSUMIDOS POR RAÇA:`);

                    let breed = Capitalize(this.input.receiveText(`Escreva a raça que você deseja para a listagem: `));

                    this.company.getProdHistoryBreed.forEach(item => {
                        if(item.getBreed === breed) {
                            orderedList.push(item);
                        }
                    });

                    orderedList = orderedList.sort((a, b) => b.getTimesConsumed - a.getTimesConsumed);

                    orderedList.forEach(item => {
                        console.log(`${count} - ${item.getProductName} (${item.getTimesConsumed})`);
                        count++;
                    });
                    break;
                case 8:
                    orderedList = [];

                    console.log(`\nLISTA DE SERVIÇOS MAIS CONSUMIDOS POR ESPÉCIE:`);

                    species = Capitalize(this.input.receiveText(`Escreva a espécie que você deseja para a listagem: `));

                    this.company.getServHistorySpecies.forEach(item => {
                        if(item.getSpecies === species) {
                            orderedList.push(item);
                        }
                    });

                    orderedList = orderedList.sort((a, b) => b.getTimesConsumed - a.getTimesConsumed);

                    orderedList.forEach(item => {
                        console.log(`${count} - ${item.getServiceName} (${item.getTimesConsumed})`);
                        count++;
                    });
                    break;
                case 9:
                    orderedList = [];

                    console.log(`\nLISTA DE SERVIÇOS MAIS CONSUMIDOS POR RAÇA:`);

                    breed = Capitalize(this.input.receiveText(`Escreva a raça que você deseja para a listagem: `));

                    this.company.getServHistoryBreed.forEach(item => {
                        if(item.getBreed === breed) {
                            orderedList.push(item);
                        }
                    });

                    orderedList = orderedList.sort((a, b) => b.getTimesConsumed - a.getTimesConsumed);

                    orderedList.forEach(item => {
                        console.log(`${count} - ${item.getServiceName} (${item.getTimesConsumed})`);
                        count++;
                    })
                case 0:
                    execution = false;
                    break;
            }
        }
    }
}