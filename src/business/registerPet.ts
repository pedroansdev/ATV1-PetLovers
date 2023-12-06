import Input from "../io/input";
import Client from "../models/client";
import Company from "../models/company";
import Pet from "../models/pet";
import { Capitalize } from "../utilities/formats";
import RegisterModel from "./registerModel";

export default class RegisterPet extends RegisterModel {
    private clients: Array<Client>;
    private pets: Array<Pet>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.clients = company.getClients;
        this.pets = company.getPets;
        this.input = new Input();
    }

    public register(): void {
        console.log(`\nCADASTRO DE PETS\n`);
        let name = this.input.receiveText(`Nome do pet: `);
        let size = '';

        let species = this.input.receiveText(`Insira a espécie do pet: `);
        let breed = this.input.receiveText(`Insira a raça do pet: `);

        console.log(`-- Porte --`);
        console.log(`1 - Pequeno`);
        console.log(`2 - Médio`);
        console.log(`3 - Grande`);
        let option = this.input.receiveNumber(`Insira o porte do pet: `);

        switch (option) {
            case 1:
                size = 'Pequeno';
                break;
            case 2:
                size = 'Médio';
                break;
            case 3:
                size = 'Grande';
                break;
            default:
                size = '?';
                console.log(`Porte não entendido :(`);
        }

        let execution = false;
        let genre = '';

        do {
            genre = this.input.receiveText(`Insira o gênero do pet [M/F]: `).toUpperCase();
            if (genre !== 'M' && genre !== 'F') {
                console.log(`Gênero não entendido, coloque apenas M(para macho) ou F(para fêmea)`);
                execution = true;
            } else if (genre == 'M') {
                genre = 'Macho';
                execution = false;
            } else {
                genre = 'Fêmea';
                execution = false;
            }
        } while (execution);

        var lastId!: number;

        let lengthArray = this.company.getPets.length;

        if (lengthArray === 0) {
            lastId = 1;
        } else {
            lastId = lengthArray + 1;
        }

        let pet = new Pet(lastId, Capitalize(name), Capitalize(size), Capitalize(breed), Capitalize(species), genre);
        this.company.addPet(pet);

        execution = false;

        do {
            let response = this.input.receiveText(`Deseja cadastrar este pet em um cliente já existente? [S/N]: `).toUpperCase();
            if (response != 'S' && response != 'N') {
                console.log(`Opção não entendida, coloque apeans S(para sim) ou N(para não)`);
                execution = true;
            } else if (response == 'N') {
                console.log(`Operação cancelada...\n`)
                execution = false;
            } else {
                var clientId = this.input.receiveNumber(`Insira o ID do dono do pet: `);

                let foundClient = this.clients.find(client => client.getId === clientId);

                if (foundClient === undefined) {
                    response = this.input.receiveText(`Nenhum cliente encontrado com este ID, deseja tentar outro? [S/N]: `).toUpperCase();
                    if (response === 'S') {
                        continue;
                    } else {
                        execution = false;
                    }
                } else {
                    console.log(`Cliente encontrado com o ID indicado: ${foundClient.getName}`);

                    let executionOwner = false;

                    do {
                        response = this.input.receiveText(`Confirma a identidade do dono? [S/N]: `).toUpperCase();

                        if (response !== 'S' && response !== 'N') {
                            console.log(`Opção não entendida, coloque apenas S(para sim) ou N(para não)`);
                            executionOwner = true;
                        } else if (response === 'S') {
                            foundClient.addPet(pet);
                            pet.addOwner(foundClient);
                            executionOwner = false;
                        } else {
                            executionOwner = false;
                        }
                    } while (executionOwner)

                    execution = false;
                }
            }
        } while (execution);
    }
}