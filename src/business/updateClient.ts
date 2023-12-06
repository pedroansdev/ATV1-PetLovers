import Input from "../io/input";
import Client from "../models/client";
import Company from "../models/company";
import Pet from "../models/pet";
import Phone from "../models/phone";
import RG from "../models/rg";
import { Capitalize, FormatRG } from "../utilities/formats";
import UpdateModel from "./updateModel";

export default class UpdateClient extends UpdateModel {
    private clients: Array<Client>;
    private pets: Array<Pet>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.clients = this.company.getClients;
        this.pets = this.company.getPets;
        this.input = new Input();
    }

    public update(): void {
        console.log(`\nATUALIZAÇÃO DE CLINETE`);
        console.log(`-- CASO NÃO QUEIRA ATUALIZAR ALGUMA INFORMAÇÃO A DEIXE EM BRANCO --\n`);


        var pets = [];
        var clients = [];

        var execution = false;

        do {
            var clientId = this.input.receiveNumber(`Insira o código do cliente a ser atualizado: `);

            var foundClient = this.clients.find(client => client.getId === clientId);

            if (foundClient === undefined) {
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

                var newName: string;
                var newSocialName: string;
                var newRgs: Array<RG> = [];
                var newPhones: Array<Phone> = [];

                console.log(`Cliente encontrado com o ID indicado: ${foundClient.getName}(${foundClient.getCPF})`);

                let executionResp = false;

                do {
                    response = this.input.receiveText(`Confirma a atualização do cliente? [S/N]: `).toUpperCase();

                    if (response !== 'S' && response !== 'N') {
                        console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                        executionResp = true;
                    } else if (response === 'N') {
                        console.log(`Operação cancelada...\n`);
                        executionResp = false;
                        execution = false;
                    } else {
                        newName = this.input.receiveText(`Digite o novo nome: `);
                        newSocialName = this.input.receiveText(`Digite o novo nome social: `);

                        console.log(`-- RGS --`);
                        console.log(`1 - Adicionar RG`);
                        console.log(`2 - Editar RG`);
                        console.log(`3 - Deletar RG`);
                        let option = this.input.receiveNumber(`Insira o que deseja fazer com os RGs: `);
                        
                        switch(option) {
                            case 1:
                                let executionRg = false;
                                do {
                                    var valueRG = this.input.receiveText(`Informe o número do novo rg: `);
                                    if(/^(\d{9})$/.test(valueRG)) {
                                        executionRg = false;
                                    }
                                    else {
                                        console.log(`Por favor, entre no padrão correto: Apenas números, 9 caracteres`);
                                        executionRg = true;
                                    }
                                } while(executionRg)

                                let executionDate = false;

                                do {
                                    var inputDateRG = this.input.receiveText(`Informe a data de emissão do rg (DD/MM/AAAA): `);

                                    if(/^(\d{1,2})\/(\d{1,2})\/(19|20)(\d{2})$/.test(inputDateRG)){
                                        let splitDate = inputDateRG.split('/');
                                        let year = new Number(splitDate[2].valueOf()).valueOf();
                                        let month = new Number(splitDate[1].valueOf()).valueOf();
                                        let day = new Number(splitDate[0].valueOf()).valueOf();
                                        var emissionDateRG = new Date(year, month, day);

                                        var rg = new RG(FormatRG(valueRG), emissionDateRG);
                                        newRgs = foundClient.getRGSFull;
                                        newRgs.push(rg);

                                        executionDate = false;
                                    }
                                    else {
                                        console.log(`Por favor, entre com o padrão correto: (DD/MM/AAAA)`);
                                        executionDate = true;
                                    }
                                } while(executionDate)
                                break;
                            case 2:
                                let count = 0;
                                foundClient.getRGSFull.forEach(rg => {
                                    
                                    var valueRG: string;
                                    var emissionDateRG: Date;

                                    console.log(`RG ${count + 1}: ${rg.getFormattedValue}`);
                                    response = this.input.receiveText(`Deseja alterar este RG? [S/N]: `).toUpperCase();
                                    if(response === 'S') {
                                        let executionRg = false;
                                        do {
                                            var valueRG = this.input.receiveText(`Informe o novo número do rg: `);
                                            if(/^(\d{9})$/.test(valueRG)) {
                                                executionRg = false;
                                            } else if(valueRG === '') {
                                                valueRG = rg.getFormattedValue;
                                            } else {
                                                console.log(`Por favor, entre no padrão correto: Apenas números, 9 caracteres`);
                                                executionRg = true;
                                            }
                                        } while(executionRg)
                                        let executionDate = false;

                                        do {
                                            var inputDateRG = this.input.receiveText(`Informe a nova data de emissão do rg: `);

                                            if(/^(\d{1,2})\/(\d{1,2})\/(19|20)(\d{2})$/.test(inputDateRG)){
                                                let splitDate = inputDateRG.split('/');
                                                let year = new Number(splitDate[2].valueOf()).valueOf();
                                                let month = new Number(splitDate[1].valueOf()).valueOf();
                                                let day = new Number(splitDate[0].valueOf()).valueOf();
                                                emissionDateRG = new Date(year, month, day);

                                                var rg = new RG(FormatRG(valueRG), emissionDateRG);
                                                newRgs.push(rg);
                                                
                                                executionDate = false;
                                            } else if(inputDateRG === '') {
                                                emissionDateRG = rg.getEmissionDate;
                                                
                                                var rg = new RG(FormatRG(valueRG), emissionDateRG);
                                                newRgs.push(rg);
                                            }
                                            else {
                                                console.log(`Por favor, entre com o padrão correto: (DD/MM/AAAA)`);
                                                executionDate = true;
                                            }
                                        } while(executionDate)

                                        count += 1;

                                    } else {
                                        newRgs.push(rg);
                                    }
                                    count += 1;
                                });
                                break;
                            case 3:
                                count = 0;
                                newRgs = foundClient.getRGSFull;

                                foundClient.getRGSFull.forEach(rg => {
                                    console.log(`RG ${count + 1}: ${rg.getFormattedValue}`);
                                    response = this.input.receiveText(`Deseja excluir este RG? [S/N]: `).toUpperCase();
                                    if(response === 'S') {
                                        let rgs = foundClient?.getRGSFull.filter(actRg => actRg.getFormattedValue !== rg.getFormattedValue);
                                        if(rgs !== undefined) {
                                            newRgs = rgs;
                                        }
                                    } else {
                                        newRgs = newRgs;
                                    }
                                })
                                break;
                            default:
                                newRgs = foundClient.getRGSFull;
                                console.log(`Opção não entendida, cancelando operações com RGs...`);
                        }

                        console.log(`-- TELEFONES --`);
                        console.log(`1 - Adicionar telefone`);
                        console.log(`2 - Editar telefone`);
                        console.log(`3 - Deletar telefone`);
                        option = this.input.receiveNumber(`Insira o que deseja fazer com os telefones: `);

                        var valueDDD: string;
                        var valuePhone: string;

                        switch(option) {
                            case 1:

                                newPhones = foundClient.getPhonesFull;

                                let executionDDD = false;
                                do {
                                    valueDDD = this.input.receiveText(`Informe o ddd do novo telefone: `);
                                    if(/^(\d{2})$/.test(valueDDD)) {
                                        executionDDD = false;
                                    }
                                    else {
                                        console.log(`Por favor, entre no padrão correto: Apenas números, 2 caracteres`);
                                        executionDDD = true;
                                    }
                                } while(executionDDD)

                                let executionPhone = false;

                                do {
                                    valuePhone = this.input.receiveText(`Informe o número: `);
                                    if(/^(\d{8,9})$/.test(valuePhone)){
                                        executionPhone = false;
                                    } else {
                                        console.log(`Por favor, entre no padrão correto: Apenas números, 9 caracteres`);
                                        executionPhone = true;
                                    }
                                } while(executionPhone)
                                
                                var phone = new Phone(valueDDD, valuePhone);
                                newPhones.push(phone);
                                break;
                            case 2:
                                let count = 0;
                                foundClient.getPhonesFull.forEach(phone => {
                                    
                                    console.log(`Telefone ${count + 1}: ${phone.getPhone}`);
                                    response = this.input.receiveText(`Deseja alterar este telefone? [S/N]: `).toUpperCase();
                                    if(response === 'S') {
                                        let executionDDD = false;
                                        do {
                                            valueDDD = this.input.receiveText(`Informe o novo ddd do telefone: `);
                                            if(/^(\d{2})$/.test(valueDDD)) {
                                                executionDDD= false;
                                            } else if(valueDDD === '') {
                                                valueDDD = phone.getDDD;
                                            } else {
                                                console.log(`Por favor, entre no padrão correto: Apenas números, 2 caracteres`);
                                                executionDDD = true;
                                            }
                                        } while(executionDDD)

                                        let executionPhone = false;

                                        do {
                                            var valuePhone = this.input.receiveText(`Informe o novo número do telefone: `);

                                            if(/^(\d{8,9})$/.test(valuePhone)){
                                                executionPhone = false;
                                            } else if(valuePhone === '') {
                                                valuePhone = phone.getNumber;
                                                
                                                var phone = new Phone(valueDDD, valuePhone);
                                                newPhones.push(phone);
                                            }
                                            else {
                                                console.log(`Por favor, entre no padrão correto: Apenas números, 9 caracteres`);
                                                executionPhone = true;
                                            }
                                        } while(executionPhone)

                                        count += 1;

                                    } else {
                                        newPhones.push(phone);
                                    }
                                    count += 1;
                                });
                                break;
                            case 3:
                                count = 0;
                                newPhones = foundClient.getPhonesFull;

                                foundClient.getPhonesFull.forEach(phone => {
                                    console.log(`Telefone ${count + 1}: ${phone.getPhone}`);
                                    response = this.input.receiveText(`Deseja excluir este Telefone? [S/N]: `).toUpperCase();
                                    if(response === 'S') {
                                        let phones = foundClient?.getPhonesFull.filter(actPhone => actPhone.getPhone !== phone.getPhone);
                                        if(phones !== undefined) {
                                            newPhones = phones;
                                        }
                                    } else {
                                        newPhones = newPhones;
                                    }
                                })
                                break;
                            default:
                                newPhones = foundClient.getPhonesFull;
                                console.log(`Opção não entendida, cancelando operações com telefones...`);
                        }

                        if(newName === '') {
                            newName = foundClient.getName;
                        }

                        if(newSocialName === '') {
                            newSocialName = foundClient.getSocialName;
                        }

                        executionResp = false;

                        foundClient.updateClient(Capitalize(newName), Capitalize(newSocialName), newRgs, newPhones);
                        clients = this.clients.filter(client => client.getId !== foundClient?.getId);
                        clients.push(foundClient);
                        this.company.updateClients(clients);

                    }
                } while (executionResp)

                console.log(`\nCLIENTE ATUALIZADO COM SUCESSO!`);

                execution = false;
            }
        } while(execution)
    }
}