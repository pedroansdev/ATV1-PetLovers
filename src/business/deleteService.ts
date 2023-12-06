import Input from "../io/input";
import Company from "../models/company";
import Service from "../models/service";
import DeleteModel from "./deleteModel";

export default class DeleteService extends DeleteModel {
    private services: Array<Service>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.services = company.getServices;
        this.input = new Input();
    }

    public delete(): void {
        console.log(`\nEXCLUSÃO DE SERVIÇOS\n`);

        var services = [];
        var serviceId = 0;
        var execution = true;

        do {
            serviceId = this.input.receiveNumber(`Insira o ID do serviço a ser excluído: `);

            let foundService = this.services.find(service => service.getId === serviceId);

            if(foundService === undefined) {
                let response = this.input.receiveText(`Nenhum produto encontrado com este ID, deseja tentar outro? [S/N]: `).toUpperCase();
                if(response !== 'S' && response !== 'N') {
                    console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                } else if(response === 'N') {
                    console.log(`Operação cancelada!`);
                    execution = false;
                }
                continue;
            } else {
                console.log(`Serviço encontrado com o ID indicado: ${foundService.getName}(${foundService.getPrice})`);
                let executionResp = false;
                do {
                    let response = this.input.receiveText(`Confirma a exclusão do serviço? [S/N]: `).toUpperCase();
                    if(response !== 'S' && response !== 'N') {
                        console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                        executionResp = true;
                    } else if(response === 'N') {
                        console.log(`Operação cancelada!\n`);
                        executionResp = false;
                    } else {
                        services = this.services.filter(services => services.getId !== foundService?.getId);
                        this.company.updateServices(services);
                        executionResp = false;
                    }
                } while(executionResp)
                
                console.log(`\nSERVIÇO EXCLUÍDO COM SUCESSO!`);
                
                execution = false;
            }
        } while(execution)
    }
}