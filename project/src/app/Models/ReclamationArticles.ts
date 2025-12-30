import { Article } from "./Article";
import { Reclamation } from "./Reclamation";

export class ReclamationArticle
{

    idrec:string ;
    quantite:string ;
    prixFinal:string;
    remise:string;
    article:Article;
    reclamation:Reclamation;


    constructor(idrec:string ,quantite:string ,prixFinal:string, remise:string, article:Article,reclamation:Reclamation)
    {
        this.idrec = idrec;
        this.quantite = quantite;
        this.prixFinal =prixFinal;
        this.remise =remise;
        this.article =article ;
        this.reclamation =reclamation;
    }

    equals(other: ReclamationArticle): boolean {
        if (!(other instanceof ReclamationArticle)) {
            return false;
        }
        return this.idrec === other.idrec;
    }
  


}
