import Input from "../io/input";
import Company from "../models/company";
import Product from "../models/product";
import DeleteModel from "./deleteModel";

export default class DeleteProduct extends DeleteModel {
    private products: Array<Product>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.products = company.getProducts;
        this.input = new Input();
    }

    public delete(): void {
        console.log(`\nEXCLUSÃO DE PRODUTOS\n`);

        var products = [];
        var productId = 0;
        var execution = true;

        do {
            productId = this.input.receiveNumber(`Insira o ID do produto a ser excluído: `);

            let foundProduct = this.products.find(product => product.getId === productId);

            if(foundProduct === undefined) {
                let response = this.input.receiveText(`Nenhum produto encontrado com este ID, deseja tentar outro? [S/N]: `).toUpperCase();
                if(response !== 'S' && response !== 'N') {
                    console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                } else if(response === 'N') {
                    console.log(`Operação cancelada!`);
                    execution = false;
                }
                continue;
            } else {
                console.log(`Produto encontrado com o ID indicado: ${foundProduct.getName}(${foundProduct.getPrice})`);
                let executionResp = false;
                do {
                    let response = this.input.receiveText(`Confirma a exclusão do produto? [S/N]: `).toUpperCase();
                    if(response !== 'S' && response !== 'N') {
                        console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                        executionResp = true;
                    } else if(response === 'N') {
                        console.log(`Operação cancelada!\n`);
                        executionResp = false;
                    } else {
                        products = this.products.filter(products => products.getId !== foundProduct?.getId);
                        this.company.updateProducts(products);
                        executionResp = false;
                    }
                } while(executionResp)
                
                console.log(`\nPRODUTO EXCLUÍDO COM SUCESSO!`);

                execution = false;
            }
        } while(execution);
    }
}