import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReclamationArticle } from '../Models/ReclamationArticles';

@Injectable({
  providedIn: 'root'
})
export class RecArtService {

  private apiUrl = 'http://localhost:1337/api/reclamation-articles';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  GetAll(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/reclamation-articles'); // GET all
  }

  GetArt(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/reclamation-articles?populate=article'); // GET all
  }

  getRecArtById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?filters[idRec]=${id}`);
  }


 

  addRecArt(docArt:any,docRec:any,recArt : ReclamationArticle): Observable<any> {
    console.log('Ajouter Rec Art appelé avec :', recArt);

    const payload = {
      data: {
        idRec: recArt.reclamation.idreclamation,
        quantite: recArt.quantite,
        prixFinal: recArt.prixFinal,
        remise:recArt.remise,
        article: docArt || null,
        reclamation: docRec || null
       
      }
    };

    console.log('Payload envoyé :', payload);

    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }


 
  updateRecArt(id: string, reclamation: ReclamationArticle): Observable<any> {
    console.log('modifier appelé avec :', reclamation);
    return this.http.put(`http://localhost:1337/api/reclamation-services/${id}`, {
      data: reclamation 
    });
      }
  

  
  deleteRecArt(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  private generateUniqueId(): string {
    return 'REC-ART-' + Date.now().toString();
  }

}
