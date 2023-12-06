import Input from "../io/input";
import Client from "../models/client";
import Company from "../models/company";
import CPF from "../models/cpf";
import Phone from "../models/phone";
import RG from "../models/rg";
import { FormatCPF, Capitalize, FormatRG } from "../utilities/formats";
import RegisterModel from "./registerModel";

export default class RegisterClient extends RegisterModel {
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.input = new Input();
    }
    
    public register(): void {
        console.log(`\nCADASTRO DE CLIENTES\n`);
        let name = this.input.receiveText(`Nome do cliente: `);
        let response = this.input.receiveText(`Possui nome social? [S/N]: `).toUpperCase();

        let socialName = '[Não possui]';

        if(response === 'S'){
            socialName = this.input.receiveText(`Nome social do cliente: `);
        }

        console.log(`\n-- Dados do CPF --`);

        let execution = false;

        do {
            var valueCPF = this.input.receiveText(`Informe o número do cpf: `);
            if(/^(\d{11})$/.test(valueCPF)) {
                execution = false;
            }
            else {
                console.log(`Por favor, entre no padrão correto: Apenas números, 11 caracteres`);
                execution = true;
            }
        } while(execution);

        var cpf !: CPF;

        do {
            var inputDateCPF = this.input.receiveText(`Informe a data de emissão do cpf (DD/MM/AAAA): `);
            
            if(/^(\d{1,2})\/(\d{1,2})\/(19|20)(\d{2})$/.test(inputDateCPF)){
                let splitDate = inputDateCPF.split('/');
                let year = new Number(splitDate[2].valueOf()).valueOf();
                let month = new Number(splitDate[1].valueOf()).valueOf();
                let day = new Number(splitDate[0].valueOf()).valueOf();
                var emissionDateCPF = new Date(year, month, day);
                cpf = new CPF(FormatCPF(valueCPF), emissionDateCPF);

                execution = false;
            }
            else {
                console.log(`Por favor, entre com o padrão correto: (DD/MM/AAAA)`);
                execution = true;
            }
        } while(execution);

        var lastId!: number;

        let lengthArray = this.company.getClients.length; 

        if(lengthArray === 0){
            lastId = 1;
        } else {
            lastId = lengthArray + 1;
        }

        let client = new Client(lastId, Capitalize(name), Capitalize(socialName), cpf);

        this.company.addClient(client);

        console.log(`\n-- Cadastro dos rgs --`);

        execution = false;
        let count = 1;
        do {
            console.log(`\n-- RG ${count} --`);

            let executionRg = false;

            do {
                var valueRG = this.input.receiveText(`Informe o número do rg: `);
                if(/^(\d{9})$/.test(valueRG)) {
                    executionRg = false;
                }
                else {
                    console.log(`Por favor, entre no padrão correto: Apenas números, 9 caracteres`);
                    executionRg = true;
                }
            } while(executionRg);

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
                    client.addRG(rg);

                    executionDate = false;
                }
                else {
                    console.log(`Por favor, entre com o padrão correto: (DD/MM/AAAA)`);
                    executionDate = true;
                }
            } while(executionDate)

            let response = this.input.receiveText(`Deseja adicionar mais um RG? [S/N]: `).toUpperCase();

            if(response === 'S') {
                execution = true;
                count += 1;
                continue;
            }
            execution = false;
        } while (execution);

        console.log(`\n-- Cadastro dos telefones --`);

        count = 1;
        do {
            console.log(`\n-- Telefone ${count} --`);
            
            let executionPhone = false;
            let executionDDD = false;
            let valueDDD = '';
            let valuePhone = '';

            do {
                valueDDD = this.input.receiveText(`Informe o DDD: `);
                if(/^(\d{2})$/.test(valueDDD)){
                    executionDDD = false;
                } else {
                    console.log(`Por favor, entre no padrão correto: Apenas números, 2 caracteres`);
                    executionDDD = true;
                }
            } while(executionDDD)

            do {
                valuePhone = this.input.receiveText(`Informe o número: `);
                if(/^(\d{8,9})$/.test(valuePhone)){
                    executionPhone = false;
                } else {
                    console.log(`Por favor, entre no padrão correto: Apenas números, 9 caracteres`);
                    executionPhone = true;
                }
            } while(executionPhone)
            
            let phone = new Phone(valueDDD, valuePhone);
            client.addPhone(phone);
            let response = this.input.receiveText(`Deseja adicionar mais um telfone? [S/N]: `).toUpperCase();
            
            if(response === 'S') {
                execution = true;
                count += 1;
                continue;
            }
            execution = false;
        } while (execution);

        console.log(`\nCADASTRO CONCLUÍDO COM SUCESSO!`);
    }
}