import Input from "../io/input";
import Client from "../models/client";
import Company from "../models/company";
import Pet from "../models/pet";
import ProdConsByBreed from "../models/prodConsByBreed";
import ProdConsBySpecies from "../models/prodConsBySpecies";
import Product from "../models/product";
import ConsumeModel from "./consumeModel";

export default class ConsumeProduct extends ConsumeModel {
    private products: Array<Product>;
    private prodHistSpecies: Array<ProdConsBySpecies>;
    private prodHistBreed: Array<ProdConsByBreed>;
    private clients: Array<Client>;
    private pets: Array<Pet>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.products = company.getProducts;
        this.prodHistSpecies = company.getProdHistorySpecies;
        this.prodHistBreed = company.getProdHistoryBreed;
        this.clients = company.getClients;
        this.pets = company.getPets;
        this.input = new Input();
    }
    public consume(): void {
        console.log(`\nCONSUMO DE PRODUTOS\n`);
        
        let execution = false;
        do {
            var clientId = this.input.receiveNumber(`Insira o código do cliente que irá consumir o produto: `);
        
            var foundClient = this.clients.find(client => client.getId === clientId);

            if(foundClient === undefined) {
                var response = this.input.receiveText(`Nenhum cliente encontrado com este ID, deseja tentar outro? [S/N]: `).toUpperCase();
                if (response !== 'S' && response !== 'N') {
                    console.log(`Opção não entendida, coloque apeans S(para sim) ou N(para não)`);
                    execution = true;
                } else if (response === 'N') {
                    console.log(`Operação cancelada...\n`);
                    execution = false;
                } else {
                    continue;
                }
            } else {
                console.log(`Cliente encontrado com o ID indicado: ${foundClient.getName}(${foundClient.getCPF})`);

                let executionResp = false;

                do {
                    response = this.input.receiveText(`Confirma a identidade do cliente? [S/N]: `).toUpperCase();

                    if (response !== 'S' && response !== 'N') {
                        console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                        executionResp = true;
                    } else if (response === 'N') {
                        console.log(`Operação cancelada...\n`);
                    } else {
                        console.log(`Pets encontrados do cliente: `);
                        let foundClientPets:Array<Pet> = [];
                        let count = 1;
                        foundClient.getPetsFull.forEach(pet => {
                            console.log(`${count} - ${pet.getName}`);
                            foundClientPets.push(pet);
                            count ++;
                        });

                        var chosenPet!: Pet;
                        let executionChosPet = false;

                        do {
                            let chosenPetCode = this.input.receiveNumber(`Digite o código do pet que usufruirá do produto: `);
                            if(chosenPetCode > foundClientPets.length){
                                console.log(`Opção inválida! Escolha um dos pets listados acima.`);
                                executionChosPet = true;
                            } else {
                                chosenPet = foundClientPets[chosenPetCode - 1];
                                executionChosPet = false;
                            }
                        } while(executionChosPet) 

                        let foundProducts: Array<Product> = [];
                        count = 1;
                        this.company.getProducts.forEach(product => {
                            console.log(`${count} - ${product.getName}(${product.getPrice})`);
                            foundProducts.push(product);
                            count ++;
                        });

                        let productIndex = 0;
                        var chosenProduct!: Product;
                        let executionChosProduct = false;

                        do {
                            let chosenProductCode = this.input.receiveNumber(`Digite o código do produto que será consumido: `);
                            if(chosenProductCode > foundProducts.length){
                                console.log(`Opção inválida! Escolha um dos produtos listados acima.`);
                                executionChosProduct = true;
                            } else {
                                chosenProduct = foundProducts[chosenProductCode - 1];
                                executionChosProduct = false;

                                foundClient.addConsProduct(chosenProduct);

                                productIndex = this.products.findIndex((product) => product.getId === chosenProduct.getId);
                                this.products[productIndex].updateTimesConsumed(1);

                                let prodHistIndex = this.prodHistSpecies.findIndex(item => item.getProductId === chosenProduct.getId && item.getSpecies === chosenPet.getSpecies);
                                
                                console.log(prodHistIndex);
                                console.log(this.prodHistSpecies[prodHistIndex]);
                                
                                if(prodHistIndex < 0) {
                                    let newProd = new ProdConsBySpecies(chosenProduct, chosenPet.getSpecies);
                                    this.company.addProdHistSpecies(newProd);
                                } else {
                                    this.prodHistSpecies[prodHistIndex].addTimesConsumed(1);
                                }

                                prodHistIndex = this.prodHistBreed.findIndex(item => item.getProductId === chosenProduct.getId && item.getBreed === chosenPet.getBreed);

                                if(prodHistIndex < 0) {
                                    let newProd = new ProdConsByBreed(chosenProduct, chosenPet.getBreed);
                                    this.company.addProdHistBreed(newProd);
                                } else {
                                    this.prodHistBreed[prodHistIndex].addTimesConsumed(1);
                                }

                            }
                        } while(executionChosProduct)

                        executionResp = false;

                    }
                } while(executionResp)
                
            }

        } while(execution)
        
        console.log(`\nPRODUTO CONSUMIDO COM SUCESSO!`);
    }
}