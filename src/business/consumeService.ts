import Input from "../io/input";
import Client from "../models/client";
import Company from "../models/company";
import ConsServHistory from "../models/consServicesHistory";
import Pet from "../models/pet";
import ServConsByBreed from "../models/servConsByBreed";
import ServConsBySpecies from "../models/servConsBySpecies";
import Service from "../models/service";
import ConsumeModel from "./consumeModel";

export default class ConsumeService extends ConsumeModel {
    private services: Array<Service>;
    private servHistSpecies: Array<ServConsBySpecies>;
    private servHistBreed: Array<ServConsByBreed>;
    private clients: Array<Client>;
    private pets: Array<Pet>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.services = company.getServices;
        this.servHistSpecies = company.getServHistorySpecies;
        this.servHistBreed = company.getServHistoryBreed;
        this.clients = company.getClients;
        this.pets = company.getPets;
        this.input = new Input();
    }
    public consume(): void {
        console.log(`\nCONSUMO DE SERVIÇOS\n`);

        let execution = false;
        do {
            var clientId = this.input.receiveNumber(`Insira o código do cliente que irá consumir o serviço: `);
        
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
                            let chosenPetCode = this.input.receiveNumber(`Digite o código do pet que usufruirá do serviço: `);
                            if(chosenPetCode > foundClientPets.length){
                                console.log(`Opção inválida! Escolha um dos pets listados acima.`);
                                executionChosPet = true;
                            } else {
                                chosenPet = foundClientPets[chosenPetCode - 1];
                                executionChosPet = false;
                            }
                        } while(executionChosPet) 

                        let foundServices: Array<Service> = [];
                        count = 1;
                        this.company.getServices.forEach(service => {
                            console.log(`${count} - ${service.getName}(${service.getPrice})`);
                            foundServices.push(service);
                            count ++;
                        });

                        let serviceIndex = 0;
                        var chosenService!: Service;
                        let executionChosService = false;

                        do {
                            let chosenServiceCode = this.input.receiveNumber(`Digite o código do serviço que será consumido: `);
                            if(chosenServiceCode > foundServices.length){
                                console.log(`Opção inválida! Escolha um dos serviços listados acima.`);
                                executionChosService = true;
                            } else {
                                chosenService = foundServices[chosenServiceCode - 1];
                                console.log(chosenService);
                                
                                foundClient.addConsService(chosenService);

                                serviceIndex = this.services.findIndex((service) => service.getId === chosenService.getId);
                                this.services[serviceIndex].updateTimesConsumed(1);

                                let servHistIndex = this.servHistSpecies.findIndex(item => item.getServiceId === chosenService.getId && item.getSpecies === chosenPet.getSpecies);

                                if(servHistIndex === undefined) {
                                    let newServ = new ServConsBySpecies(chosenService, chosenPet.getSpecies);
                                    this.company.addServHistSpecies(newServ);
                                } else {
                                    this.servHistSpecies[servHistIndex].addTimesConsumed(1);
                                }

                                servHistIndex = this.servHistBreed.findIndex(item => item.getServiceId === chosenService.getId && item.getBreed === chosenPet.getBreed);

                                if(servHistIndex === undefined) {
                                    let newServ = new ServConsByBreed(chosenService, chosenPet.getBreed);
                                    this.company.addServHistBreed(newServ);
                                } else {
                                    this.servHistBreed[servHistIndex].addTimesConsumed(1);
                                }
                            }
                        } while(executionChosService)
                        
                        executionResp = false;

                    }
                } while(executionResp)

            }

        } while(execution)

        console.log(`\nCONSUMO REALIZADO COM SUCESSO!`);
    }
}