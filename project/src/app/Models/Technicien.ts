export class Technicien 
{
    idtechnicien:string;
    nom:string;
    prenom:string;
    telephone:string;
    adresse:string;
    nomSociete:string;
    email:string;
    MF:string;

    constructor( idtechnicien:string, nom:string, prenom:string,telephone:string, adresse:string, nomSociete:string,email:string,MF:string)
    {
        this.idtechnicien = idtechnicien;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.adresse = adresse;
        this.nomSociete = nomSociete;
        this.email = email;
        this.MF = MF;

    }


    toString(): string {
        return `Technicien [id=${this.idtechnicien}, nom=${this.nom}, =email=${this.email}]`;
    }


    equals(other: Technicien): boolean {
        if (!(other instanceof Technicien)) {
            return false;
        }
        return this.idtechnicien === other.idtechnicien;
    }
 

}