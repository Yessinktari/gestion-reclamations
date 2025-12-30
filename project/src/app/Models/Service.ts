export class Service 
{
    idservice:string;
    nom:string;
    montant:string;
    TVA:string;
    prixTOT:string;
    remise:string;
    partTech:string;
    partESE:string;

    constructor( idservice:string, nom:string, montant:string,TVA:string, prixTOT:string, remise:string,partTech:string,partESE:string)
    {
        this.idservice = idservice;
        this.nom = nom;
        this.montant = montant;
        this.TVA = TVA;
        this.prixTOT = prixTOT;
        this.remise = remise;
        this.partTech = partTech;
        this.partESE = partESE;

    }


    toString(): string {
        return `Service [id=${this.idservice}, nom=${this.nom}, montant=${this.montant}]`;
    }


    equals(other: Service): boolean {
        if (!(other instanceof Service)) {
            return false;
        }
        return this.idservice === other.idservice;
    }
 

}