import Input from "../io/input";
import Client from "../models/client";
import Company from "../models/company";
import DeleteModel from "./deleteModel";

export default class DeleteClient extends DeleteModel {
    private clients: Array<Client>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.clients = company.getClients;
        this.input = new Input();
    }

    public delete(): void {
        console.log(`\nEXCLUSÃO DE CLIENTES\n`);

        var clients = [];
        var clientCPF = '';
        var execution = false;

        do {
            clientCPF = this.input.receiveText(`Insira o CPF do cliente a ser excluído: `);
            if (/^(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})$/.test(clientCPF)) {
                let foundClient = this.clients.find(client => client.getCPF === clientCPF);

                if (foundClient === undefined) {
                    let response = this.input.receiveText(`Nenhum cliente encontrado com este CPF, deseja tentar outro? [S/N]: `).toUpperCase();
                    if (response !== 'S' && response !== 'N') {
                        console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                    } else if (response === 'N') {
                        console.log(`Operação cancelada!\n`);
                        execution = false;
                    }
                    continue;
                } else {
                    console.log(`Cliente encontrado com o ID indicado: ${foundClient.getName}`);
                    let executionResp = false;
                    do {
                        let response = this.input.receiveText(`Confirma a identidade do cliente? [S/N]: `).toUpperCase();
                        if (response !== 'S' && response !== 'N') {
                            console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                            executionResp = true;
                        } else if (response === 'N') {
                            console.log(`Operação cancelada!\n`);
                            executionResp = false;
                        } else {
                            clients = this.clients.filter(clients => clients.getCPF !== foundClient?.getCPF);
                            this.company.updateClients(clients);
                            
                            console.log(`\nCLIENTE EXCLUÍDO COM SUCESSO!`);
                            
                            executionResp = false;
                            execution = false;
                        }
                    } while (executionResp);
                }
            } else {
                console.log(`Por favor, insira no seguinte formato: XXX.XXX.XXX-XX`);
                execution = true;
            }
        } while (execution);
    }
}