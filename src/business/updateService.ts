import Input from "../io/input";
import Company from "../models/company";
import Service from "../models/service";
import { Capitalize } from "../utilities/formats";
import UpdateModel from "./updateModel";

export default class UpdateService extends UpdateModel {
    private services: Array<Service>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.services = company.getServices;
        this.input = new Input();
    }

    public update(): void {
        console.log(`\nATUALIZAÇÃO DE SERVIÇO\n`);
        console.log(`-- CASO NÃO QUEIRA ATUALIZAR ALGUMA INFORMAÇÃO A DEIXE EM BRANCO --\n`);

        let execution = false;

        var newName !: string;
        var newType !: string;
        var newPrice !: number;

        do {
            var serviceId = this.input.receiveNumber(`Insira o código do serviço a ser atualizado: `);

            var foundService = this.services.find(service => service.getId === serviceId);

            if (foundService === undefined) {
                var response = this.input.receiveText(`Nenhum serviço encontrado com este ID, deseja tentar outro? [S/N]: `).toUpperCase();
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

                console.log(`Serviço encontrado com o ID indicado: ${foundService.getName}(${foundService.getPrice})`);

                let executionResp = false;

                var services = [];

                do {
                    response = this.input.receiveText(`Confirma a atualização do serviço? [S/N]: `).toUpperCase();

                    if (response !== 'S' && response !== 'N') {
                        console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                        executionResp = true;
                    } else if (response === 'N') {
                        console.log(`Operação cancelada...\n`);
                        execution = false;
                    } else {
                        newName = this.input.receiveText(`Digite o novo nome: `);
                        newType = this.input.receiveText(`Digite o novo tipo: `);
                        newPrice = this.input.receiveNumber(`Digite o novo preço: `);

                        if(newName === '') {
                            newName = foundService.getName;
                        }

                        if(newType === '') {
                            newType = foundService.getType;
                        }

                        if(newPrice === 0) {
                            newPrice = foundService.getPriceValue;
                        }
                        executionResp = false;
                    }
                } while (executionResp)

                foundService.updateService(Capitalize(newName), Capitalize(newType), newPrice);
                services = this.services.filter(services => services.getId !== foundService?.getId);
                services.push(foundService);
                this.company.updateServices(services);

                console.log(`\nSERVIÇO ATUALIZADO COM SUCESSO!`);

                execution = false;

            }
        } while (execution);
    }
}