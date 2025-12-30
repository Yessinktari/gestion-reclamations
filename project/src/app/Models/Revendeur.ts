export class Revendeur {
    idrevendeur:string;
    nom:string;
    responsable:string;
    email:string;
    MF:string;
    telephone:string;

    constructor(idrevendeur:string, nom:string,responsable:string,email:string,MF:string,telephone:string){
                this.idrevendeur = idrevendeur;
                this.nom = nom;
               this.responsable = responsable;
                this.email = email ?? '';
                this.MF = MF ?? '';
                this.telephone = telephone ?? '';
            }
        
            toString(): string {
                return `Client [id=${this.idrevendeur}, nom=${this.nom}, email=${this.email}]`;
            }
        
        
            equals(other: Revendeur): boolean {
                if (!(other instanceof Revendeur)) {
                    return false;
                }
                return this.idrevendeur === other.idrevendeur;
            }
}