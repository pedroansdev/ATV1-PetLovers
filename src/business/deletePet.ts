import Input from "../io/input";
import Company from "../models/company";
import Pet from "../models/pet";
import { Capitalize } from "../utilities/formats";
import DeleteModel from "./deleteModel";

export default class DeletePet extends DeleteModel {
    private pets: Array<Pet>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.pets = company.getPets;
        this.input = new Input();
    }

    public delete(): void {
        console.log(`\nEXCLUSÃO DE PETS\n`);

        var pets = [];
        var petName = '';
        var execution = true;

        do {
            petName = Capitalize(this.input.receiveText(`Insira o nome do pet a ser excluído: `));

            let foundPet = this.pets.find(pet => pet.getName === petName);

            if(foundPet === undefined) {
                let response = this.input.receiveText(`Nenhum pet encontrado com este nome, deseja tentar outro? [S/N]: `).toUpperCase();
                if(response !== 'S' && response !== 'N') {
                    console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                } else if(response === 'N') {
                    console.log(`Operação cancelada!`);
                    execution = false;
                }
                continue;
            } else {
                console.log(`Pet encontrado com o nome indicado: ${foundPet.getName} (${foundPet.getOwner})`);
                let executionResp = false;
                do {
                    let response = this.input.receiveText(`Confirma o pet? [S/N]: `).toUpperCase();
                    if(response !== 'S' && response !== 'N') {
                        console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                        executionResp = true;
                    } else if(response === 'N') {
                        console.log(`Operação cancelada!\n`);
                        executionResp = false;
                    } else {
                        pets = this.pets.filter(pets => (pets.getName !== foundPet?.getName) && (pets.getOwner !== foundPet?.getOwner));
                        this.company.updatePets(pets);
                        executionResp = false;
                    }
                } while(executionResp)
                
                console.log(`\nPET EXCLUÍDO COM SUCESSO!`);

                execution = false;
            }
        } while (execution)
    }
}