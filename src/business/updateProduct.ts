import Input from "../io/input";
import Company from "../models/company";
import Product from "../models/product";
import { Capitalize } from "../utilities/formats";
import UpdateModel from "./updateModel";

export default class UpdateProduct extends UpdateModel {
    private products: Array<Product>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.products = company.getProducts;
        this.input = new Input();
    }

    public update(): void {
        console.log(`\nATUALIZAÇÃO DE PRODUTO\n`);
        console.log(`-- CASO NÃO QUEIRA ATUALIZAR ALGUMA INFORMAÇÃO A DEIXE EM BRANCO --\n`);

        let execution = false;

        var newName !: string;
        var newPrice !: number;

        do {
            var productId = this.input.receiveNumber(`Insira o código do produto a ser atualizado: `);

            var foundProduct = this.products.find(product => product.getId === productId);

            if (foundProduct === undefined) {
                var response = this.input.receiveText(`Nenhum produto encontrado com este ID, deseja tentar outro? [S/N]: `).toUpperCase();
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

                console.log(`Produto encontrado com o ID indicado: ${foundProduct.getName}(${foundProduct.getPrice})`);

                let executionResp = false;

                var products = [];

                do {
                    response = this.input.receiveText(`Confirma a atualização produto? [S/N]: `).toUpperCase();

                    if (response !== 'S' && response !== 'N') {
                        console.log(`Opção não entendida, responda com apenas S(para sim) ou N(para não)`);
                        executionResp = true;
                    } else if (response === 'N') {
                        console.log(`Operação cancelada...\n`);
                    } else {
                        newName = this.input.receiveText(`Digite o novo nome: `);
                        newPrice = this.input.receiveNumber(`Digite o novo preço: `);

                        if(newName === '') {
                            newName = foundProduct.getName;
                        }

                        if(newPrice === 0) {
                            newPrice = foundProduct.getPriceValue;
                        }
                        executionResp = false;
                    }
                } while (executionResp)

                foundProduct.updateProduct(Capitalize(newName), newPrice);
                products = this.products.filter(product => product.getId !== foundProduct?.getId);
                products.push(foundProduct);
                this.company.updateProducts(products);
                
                console.log(`\nPRODUTO ATUALIZADO COM SUCESSO!`);
                
                execution = false;
            }
        } while (execution);
    }
}