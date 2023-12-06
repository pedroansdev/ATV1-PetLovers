import Input from "../io/input";
import Company from "../models/company";
import Product from "../models/product";
import { Capitalize } from "../utilities/formats";
import RegisterModel from "./registerModel";

export default class RegisterProduct extends RegisterModel {
    private products: Array<Product>;
    private company: Company;
    private input: Input;
    constructor(company: Company) {
        super();
        this.company = company;
        this.products = company.getProducts;
        this.input = new Input();
    }

    public register(): void {
        console.log(`\nCADASTRO DE PRODUTOS\n`);
        let name = this.input.receiveText(`Nome do produto: `);
        let price = this.input.receiveNumber(`Preço do produto: `).valueOf();

        var lastId!: number;

        let lengthArray = this.company.getProducts.length; 

        if(lengthArray === 0){
            lastId = 1;
        } else {
            lastId = lengthArray + 1;
        }

        let product = new Product(lastId, Capitalize(name), price);

        this.company.addProduct(product);
        
        console.log(`\nCADASTRO CONCLUÍDO COM SUCESSO!`);
    }
}