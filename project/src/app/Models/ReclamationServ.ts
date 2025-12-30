import { Reclamation } from "./Reclamation";
import { Service } from "./Service";

export class ReclamationServ
{

    idRec:string ;
    prixFinal:string;
    remise:string;
    service:Service;
    reclamation:Reclamation;


    constructor(idrec:string ,prixFinal:string, remise:string,service:Service, reclamation:Reclamation)
    {
        this.idRec = idrec;
        this.prixFinal =prixFinal;
        this.remise =remise;
        this.service =service;
        this.reclamation = reclamation;
    }

    equals(other: ReclamationServ): boolean {
        if (!(other instanceof ReclamationServ)) {
            return false;
        }
        return this.idRec === other.idRec;
    }
  


}
