import Input from "../io/input";
import Company from "../models/company";
import Pet from "../models/pet";
import { Capitalize } from "../utilities/formats";
import UpdateModel from "./updateModel";

export default class UpdatePet extends UpdateModel {
    private pets: Array<Pet>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.pets = company.getPets;
        this.input = new Input();
    }

    public update(): void {
        console.log(`\nATUALIZAÇÃO DE PET\n`);
        console.log(`-- CASO NÃO QUEIRA ATUALIZAR ALGUMA INFORMAÇÃO A DEIXE EM BRANCO --\n`);

        let execution = false;

        let newName !: string;
        let newSize !: string;
        let newBreed !: string;
        let newSpecies !: string;
        let newGenre !: string;

        do {
            var petId = this.input.receiveNumber(`Insira o código do pet a ser atualizado: `);

            var foundPet = this.pets.find(pet => pet.getId === petId);

            if (foundPet === undefined) {
                var response = this.input.receiveText(`Nenhum pet encontrado com este ID, deseja tentar outro? [S/N]: `).toUpperCase();
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

                console.log(`Pet encontrado com o ID indicado: ${foundPet.getName}(${foundPet.getSpecies})`);

                let executionResp = false;

                var pets = [];

                do {
                    response = this.input.receiveText(`Confirma a atualização do pet? [S/N]: `).toUpperCase();

                    if (response !== 'S' && response !== 'N') {
                        console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                        executionResp = true;
                    } else if (response === 'N') {
                        console.log(`Operação cancelada...\n`);
                    } else {
                        newName = this.input.receiveText(`Digite o novo nome: `);
                        newSpecies = this.input.receiveText(`Digite a nova espécie: `);
                        newBreed = this.input.receiveText(`Digite a nova raça: `);

                        console.log(`-- Porte --`);
                        console.log(`1 - Pequeno`);
                        console.log(`2 - Médio`);
                        console.log(`3 - Grande`);
                        let option = this.input.receiveNumber(`Insira o novo porte: `);
                        
                        switch(option) {
                            case 1:
                                newSize = 'Pequeno';
                                break;
                            case 2:
                                newSize = 'Médio';
                                break;
                            case 3:
                                newSize = 'Grande';
                                break;
                            default:
                                newSize = foundPet.getSize;
                        }

                        let executionGenre = false;

                        do {
                            newGenre = this.input.receiveText(`Insira o novo gênero [M/F]: `).toUpperCase();
                            if(newGenre === '') {
                                newGenre = foundPet.getGenre;
                            } else if(newGenre !== 'M' && newGenre !== 'F'){
                                console.log(`Gênero não entendido, coloque apenas M(para macho) ou F(para fêmea)`);
                                executionGenre = true;
                            } else if(newGenre == 'M') {
                                newGenre = 'Macho';
                                executionGenre = false;
                            } else {
                                newGenre = 'Fêmea';
                                executionGenre = false;
                            }
                        } while(executionGenre);

                        if(newName === '') {
                            newName = foundPet.getName;
                        }

                        if(newBreed === '') {
                            newBreed = foundPet.getBreed;
                        }

                        if(newSpecies === '') {
                            newSpecies = foundPet.getSpecies;
                        }
                        executionResp = false;
                    }
                } while (executionResp)

                foundPet.updatePet(Capitalize(newName), Capitalize(newBreed), newGenre, newSize, Capitalize(newSpecies));
                pets = this.pets.filter(pets => pets.getId !== foundPet?.getId);
                pets.push(foundPet);
                this.company.updatePets(pets);

                console.log(`\nPET ATUALIZADO COM SUCESSO!`);

                execution = false;
            }
 
        } while(execution)
    }
}