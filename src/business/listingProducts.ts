import Company from "../models/company";
import Product from "../models/product";
import ListingModel from "./listingModel";

export default class ListProducts extends ListingModel {
    private products: Array<Product>;
    private company: Company;
    constructor(company: Company) {
        super();
        this.company = company;
        this.products = company.getProducts;
    }

    public list(): void {
        console.log(`\nLISTA DE PRODUTOS:`);
        this.products.forEach(product => {
            console.log(`\nId: ${product.getId}`);
            console.log(`Nome: ${product.getName}`);
            console.log(`Preço: ${product.getPrice}\n`);
            console.log(`Vezes consumido: ${product.getTimesConsumed}`);
            console.log(`=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
        });
    }
}