import RegisterClient from "../business/registerClient";
import ListClients from "../business/listingClients";
import Company from "../models/company";
import Input from "../io/input";
import RegisterProduct from "../business/registerProduct";
import ListProducts from "../business/listingProducts";
import RegisterService from "../business/registerService";
import ListServices from "../business/listingServices";
import RegisterPet from "../business/registerPet";
import ListPet from "../business/listingPets";
import DeleteClient from "../business/deleteClient";
import DeleteProduct from "../business/deleteProduct";
import DeleteService from "../business/deleteService";
import DeletePet from "../business/deletePet";
import UpdateProduct from "../business/updateProduct";
import UpdateService from "../business/updateService";
import UpdatePet from "../business/updatePet";
import UpdateClient from "../business/updateClient";
import ConsumeProduct from "../business/consumeProduct";
import ConsumeService from "../business/consumeService";
import ListGeneral from "../business/listingGeneral";

console.log(`\nBEM-VINDO AO SISTEMA DO PETLOVERS :)\n`);

let company = new Company();
let execution = true;

while(execution) {
    console.log(`Opções:`);
    console.log(`1 - Operações com clientes`);
    console.log(`2 - Operações com produtos`);
    console.log(`3 - Operações com serviços`);
    console.log(`4 - Operações com pets`);
    console.log(`5 - Listagens gerais`);
    console.log(`0 - Sair\n`);

    let input = new Input();
    let option = input.receiveNumber(`Por favor, selecione uma das opções acima: `);

    switch(option) {
        case 1:
            let execution1 = true;
            while(execution1){
                console.log(`\n1 - Cadastrar cliente`);
                console.log(`2 - Listar clientes`);
                console.log(`3 - Atualizar dados de clientes`);
                console.log(`4 - Deletar clientes`);
                console.log(`5 - Cadastrar consumo de produtos`);
                console.log(`6 - Cadastrar consumo de serviços`);
                console.log(`0 - Voltar\n`);
                let option = input.receiveNumber(`Por favor, informe a operação desejada: `);
                switch(option) {
                    case 1:
                        let register = new RegisterClient(company);
                        register.register();
                        break;
                    case 2:
                        let list = new ListClients(company);
                        list.list();
                        break;
                    case 3:
                        let update = new UpdateClient(company);
                        update.update();
                        break;
                    case 4:
                        let deleting = new DeleteClient(company);
                        deleting.delete();
                        break;
                    case 5:
                        let consumeProd = new ConsumeProduct(company);
                        consumeProd.consume();
                        break;
                    case 6:
                        let consumeServ = new ConsumeService(company);
                        consumeServ.consume();
                        break;
                    case 0:
                        execution1 = false;
                        console.log(`\nVoltando ao menu inicial... \n`);
                        break;
                    default:
                        console.log(`Opção não entendida :(`);
                }
            }
            break;
        case 2:
            let execution2 = true;
            while(execution2){
                console.log(`\n1 - Cadastrar produto`);
                console.log(`2 - Listar produtos`);
                console.log(`3 - Atualizar dados de produtos`);
                console.log(`4 - Deletar produtos`);
                console.log(`0 - Voltar\n`);
                let option = input.receiveNumber(`Por favor, informe a operação desejada: `);
                switch(option) {
                    case 1:
                        let register = new RegisterProduct(company);
                        register.register();
                        break;
                    case 2:
                        let list = new ListProducts(company);
                        list.list();
                        break;
                    case 3:
                        let update = new UpdateProduct(company);
                        update.update();
                        break;
                    case 4:
                        let deleting = new DeleteProduct(company);
                        deleting.delete();
                        break;
                    case 0:
                        execution2 = false;
                        console.log(`\nVoltando ao menu inicial... \n`);
                        break;
                    default: 
                        console.log(`Opção não entendida :(`);
                }
            }
            break;
        case 3:
            let execution3 = true;
            while(execution3){
                console.log(`\n1 - Cadastrar serviço`);
                console.log(`2 - Listar serviços`);
                console.log(`3 - Atualizar dados de serviços`);
                console.log(`4 - Deletar serviços`);
                console.log(`0 - Voltar\n`);
                let option = input.receiveNumber(`Por favor, informe a operação desejada: `);
                switch(option) {
                    case 1:
                        let register = new RegisterService(company);
                        register.register();
                        break;
                    case 2:
                        let list = new ListServices(company);
                        list.list();
                        break;
                    case 3:
                        let update = new UpdateService(company);
                        update.update();
                        break;
                    case 4:
                        let deleting = new DeleteService(company);
                        deleting.delete();
                        break;
                    case 0:
                        execution3 = false;
                        console.log(`\nVoltando ao menu inicial... \n`);
                        break;
                    default:
                        console.log(`Opção não entendida :(`);
                }
            }
            break;
        case 4:
            let execution4 = true;
            while(execution4){
                console.log(`\n1 - Cadastrar pet`);
                console.log(`2 - Listar pets`);
                console.log(`3 - Atualizar dados de pets`);
                console.log(`4 - Deletar pets`);
                console.log(`0 - Voltar\n`);
                let option = input.receiveNumber(`Por favor, informe a operação desejada: `);
                switch(option) {
                    case 1:
                        let register = new RegisterPet(company);
                        register.register();
                        break;
                    case 2:
                        let list = new ListPet(company);
                        list.list();
                        break;
                    case 3:
                        let update = new UpdatePet(company);
                        update.update();
                        break;
                    case 4:
                        let deleting = new DeletePet(company);
                        deleting.delete();
                        break;
                    case 0:
                        execution4 = false;
                        console.log(`\nVoltando ao menu inicial... \n`);
                        break;
                    default:
                        console.log(`Operação não entendida :(`);
                }
            }
            break;
        case 5:
            let list = new ListGeneral(company);
            list.list();
            // while(execution5) {
            //     console.log(`1 - Top 10 clientes que mais consumiram produtos e serviços (quantidade)`);
            //     let option = input.receiveNumber(`Por favor, informe a operação desejada: `);
            //     switch(option) {
            //         case 1:
            //             let list = 
            //     }
            // }
            break;
        case 0:
            execution = false;
            console.log(`\nQue pena que quis sair, até mais! :)`);
            break;
        default:
            console.log(`Opção não entendida :(`);
    }
}