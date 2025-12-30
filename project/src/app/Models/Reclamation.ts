import { Article } from "./Article";
import { Client } from "./Client";
import { Facture } from "./Facture";
import { Revendeur } from "./Revendeur";
import { Technicien } from "./Technicien";

export class Reclamation 
{
    idreclamation:string;

    statut:string;
    dateSaisie:string;
    DateRandezVous:string;
    heureDebut:string;

    typeInter:string;
    typeRegulation:string;
    numFac:string;
    interventionFac:string;

    cout:string;
    partTech:string;
    partESE:string;
    etatVisite:string;

    prixTOT:string;
    remiseGlob:string;
    prixFinal:string;

    noteSAV:string;
    noteTech:string;

    client: Client;
    revendeur: Revendeur;
    technicien: Technicien;
    article:Article
    facture: Facture;

    ReclamationArticle: any[]; 
    ReclamationService: any[]; 

    constructor( idreclamation:string,statut:string, dateSaisie:string,DateRandezVous:string,heureDebut:string,typeInter:string
    ,typeRegulation:string,numFac:string,interventionFac:string, cout:string, partTech:string, partESE:string,etatVisite:string,
    prixTOT:string,remiseGlob:string,prixFinal:string,noteSAV:string,noteTech:string,client:Client,revendeur: Revendeur,technicien: Technicien,
   article:Article, facture: Facture, ReclamationArticle: any[], ReclamationService: any[]
    )
    {
    this.idreclamation = idreclamation;
    this.statut = statut;
    this.dateSaisie = dateSaisie;
    this.DateRandezVous = DateRandezVous ?? '';
    this.heureDebut = heureDebut ?? '';
    this.typeInter = typeInter;
    this.typeRegulation = typeRegulation;
    this.numFac = numFac ?? '';
    this.interventionFac = interventionFac ?? '';
    this.cout = cout ?? '';
    this.partTech = partTech ?? '';
    this.partESE = partESE ?? '';
    this.etatVisite = etatVisite ?? '';
    this.prixTOT = prixTOT ?? '';
    this.remiseGlob = remiseGlob ?? '';
    this.prixFinal = prixFinal ?? '';
    this.noteSAV = noteSAV ?? '';
    this.noteTech = noteTech ?? '';


    this.client = client ?? '';
    this.revendeur = revendeur ?? '';
    this.technicien = technicien ?? '';
    this.article =article ?? '';
    
    this.facture = facture ?? '';
    
    this.ReclamationArticle = ReclamationArticle ?? [];
    this.ReclamationService = ReclamationService ?? [];

    }

    
    toString(): string {
        return `Reclamation [id=${this.idreclamation}, Statut=${this.statut}, date Saisi=${this.dateSaisie}]`;
    }


    equals(other: Reclamation): boolean {
        if (!(other instanceof Reclamation)) {
            return false;
        }
        return this.idreclamation === other.idreclamation;
    }
  





}