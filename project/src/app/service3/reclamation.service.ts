import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../Models/Reclamation';
import { RecArtService } from '../service3/rec-art.service'

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private apiUrl = 'http://localhost:1337/api/reclamations';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,RecArtService:RecArtService) {}

  GetAll(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/reclamations?populate[client]=true&populate[article]=true&populate[technicien]=true&populate[revendeur]=true&populate[reclamation_articles][populate][article]=true'); 
  }

  

  getReclamationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?filters[idreclamation]=${id}`);
  }


  addReclamation(idc:number,ida:number,idt:number,idr:number,reclamation:any): Observable<any> {
    console.log('addReclamation appelé avec :', reclamation);

    console.log(idc);
    console.log(ida);
    console.log(idt);
    console.log(idr);

    const payload = {
      data: {
        idreclamation: this.generateUniqueId(),
        statut: reclamation.statut,
        dateSaisie:reclamation.dateSaisie,
        DateRandezVous:reclamation.DateRandezVous || '',
        heureDebut:reclamation.heureDebut || '',
        typeInter:reclamation.typeInter,
        typeRegulation:reclamation.typeRegulation ,
        numFac:reclamation.numFac || '', 
        interventionFac:reclamation.interventionFac || '',
        cout:reclamation.cout || '',
        partTech:reclamation.partTech || '',
        partESE:reclamation.partESE || '',
        etatVisite:reclamation.etatVisite || '',
        prixTOT:reclamation.prixTOT || '',
        remiseGlob:reclamation.remiseGlob || '',
        prixFinal:reclamation.prixFinal || '',
        noteSAV:reclamation.noteSAV || '',
        noteTech:reclamation.noteTech || '',
        client:idc|| null,
        revendeur:idr|| null,
        technicien:idt || null,
        facture: null,
        reclamation_articles:reclamation.ReclamationArticle ,
        reclamation_services: reclamation.ReclamationService ,
        article : ida || null
      }
    };

    console.log('Payload envoyé :', payload);



    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }


 
  updateReclamation(id: string,idc:number,ida:number,idt:number,idr:number,reclamation:any): Observable<any> {
    console.log('modifier appelé avec :', reclamation);
    return this.http.put(`http://localhost:1337/api/reclamations/${id}`, {
      data: {
        idreclamation: reclamation.idreclamation,
        statut: reclamation.statut,
        dateSaisie:reclamation.dateSaisie,
        DateRandezVous:reclamation.DateRandezVous || '',
        heureDebut:reclamation.heureDebut || '',
        typeInter:reclamation.typeInter,
        typeRegulation:reclamation.typeRegulation ,
        numFac:reclamation.numFac || '', 
        interventionFac:reclamation.interventionFac || '',
        cout:reclamation.cout || '',
        partTech:reclamation.partTech || '',
        partESE:reclamation.partESE || '',
        etatVisite:reclamation.etatVisite || '',
        prixTOT:reclamation.prixTOT || '',
        remiseGlob:reclamation.remiseGlob || '',
        prixFinal:reclamation.prixFinal || '',
        noteSAV:reclamation.noteSAV || '',
        noteTech:reclamation.noteTech || '',
        client:idc|| null,
        revendeur:idr|| null,
        technicien:idt || null,
        facture: null,
        reclamation_articles:reclamation.ReclamationArticle ,
        reclamation_services: reclamation.ReclamationService ,
        article : ida || null
      }
    });
      }
  

  
  deleteReclamation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  private generateUniqueId(): string {
    return 'REC-' + Date.now().toString();
  }

}
