export class Article 
{
    public idarticle:string;
    public designation:string;
    public famille:string;
    public unite:string;
    public marque:string;
    public modele:string;
    public libelle:string;
    public prixHT:string;
    public TVA:string;
    public prixTTC:string;
    public prixESE:string;

    constructor(id?: string,des?: string,fam?: string,unite?: string,marque?: string,
modele?: string,libelle?: string,prixht?: string,tva?: string,prixttc?: string,
prixese?: string) 
{
        this.idarticle = id?? '';
        this.designation = des ?? '';
        this.famille = fam??'';
        this.unite = unite??'';
        this.marque = marque?? '';
        this.modele = modele ?? '';
        this.libelle = libelle ?? '';
        this.prixHT = prixht ?? '';
        this.TVA = tva ?? '';
        this.prixTTC = prixttc ?? '';
        this.prixESE = prixese ?? '';
    }

    toString(): string {
        return `Article [id=${this.idarticle}, designation=${this.designation}, famille=${this.famille}]`;
    }


    equals(other: Article): boolean {
        if (!(other instanceof Article)) {
            return false;
        }
        return this.idarticle === other.idarticle;
    }











}