import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../Models/Reclamation';
import { ReclamationServ} from '../Models/ReclamationServ';

@Injectable({
  providedIn: 'root'
})
export class RecServService {

  private apiUrl = 'http://localhost:1337/api/reclamation-services';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  GetAll(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/reclamation-services'); // GET all
  }

  getReclamationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?filters[idRec]=${id}`);
  }

  GetServ(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/reclamation-services?populate=service'); // GET all
  }

 

  addRecServ(docServ:any,docRec:any,recServ : ReclamationServ): Observable<any> {
    console.log('Ajouter Rec SERV appelé avec :', recServ);
    const payload = {
      data: {
        idRec: recServ.reclamation.idreclamation,
        prixFinal: recServ.prixFinal,
        remise:recServ.remise,
        service:docServ || null,
        reclamation:docRec || null
       
      }
    };

    console.log('Payload envoyé :', payload);

    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }


 
  updateRecServ(id: string, reclamation: ReclamationServ): Observable<any> {
    console.log('modifier appelé avec :', reclamation);
    return this.http.put(`http://localhost:1337/api/reclamation-services/${id}`, {
      data: reclamation 
    });
      }
  

  
  deleteRecServ(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  private generateUniqueId(): string {
    return 'REC-SERV-' + Date.now().toString();
  }

}
