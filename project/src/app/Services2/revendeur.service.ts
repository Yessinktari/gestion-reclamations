import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Revendeur } from '../Models/Revendeur';

@Injectable({
  providedIn: 'root'
})
export class RevendeurService {

  private apiUrl = 'http://localhost:1337/api/revendeurs';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  GetAll(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/revendeurs'); // GET all
  }

  getRevendeurById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?filters[idrevendeur]=${id}`);
  }

  addRevendeur(revendeur: Revendeur): Observable<any> {
    console.log('addRevendeur appelé avec :', revendeur);
    const payload = {
      data: {
        idrevendeur: this.generateUniqueId(),
        nom: revendeur.nom,
        responsable:revendeur.responsable,
        email:revendeur.email,
        MF:revendeur.MF,
        telephone:revendeur.telephone
      }
    };

    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }


 
  updateRevendeur(id: string, revendeur: Revendeur): Observable<any> {
    console.log('modifier appelé avec :', revendeur);
    return this.http.put(`http://localhost:1337/api/revendeurs/${id}`, {
      data: revendeur 
    });
      }
  

  
  deleteRevendeur(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  private generateUniqueId(): string {
    return 'REV-' + Date.now().toString();
  }

}
