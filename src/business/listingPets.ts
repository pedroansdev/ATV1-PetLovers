import Company from "../models/company";
import Pet from "../models/pet";
import ListingModel from "./listingModel";

export default class ListPet extends ListingModel {
    private pets: Array<Pet>;
    private company: Company;
    constructor(company: Company) {
        super();
        this.company = company;
        this.pets = company.getPets;
    }

    public list(): void {
        console.log(`\nLISTA DE TODOS OS PETS:`);
        this.pets.forEach(pet => {
            console.log(`\nId: ${pet.getId}`)
            console.log(`Nome: ${pet.getName}`);
            console.log(`Porte: ${pet.getSize}`);
            console.log(`Raça: ${pet.getBreed}`);
            console.log(`Espécie: ${pet.getSpecies}`);
            console.log(`Gênero: ${pet.getGenre}`);
            if(pet.getOwner.length !== 0) {
                console.log(`Dono: ${pet.getOwner[0].getName}(${pet.getOwner[0].getName})\n`);
            } else {
                console.log(`Dono: [Não possui]\n`);
            }
            console.log(`=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
        });
    }
}