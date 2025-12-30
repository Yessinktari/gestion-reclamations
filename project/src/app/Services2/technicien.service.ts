import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Technicien } from '../Models/Technicien';

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {

  private apiUrl = 'http://localhost:1337/api/techniciens';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}
 
  GetAll(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/techniciens'); // GET all
  }

  getTechnicienById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?filters[idtechnicien]=${id}`);
  }

  addTechnicien(Technicien: Technicien): Observable<any> {
    console.log('addService appelé avec :', Technicien);
    const payload = {
      data: {
        idtechnicien: this.generateUniqueId(),
        nom: Technicien.nom,
        prenom:Technicien.prenom,
        telephone:Technicien.telephone,
        adresse:Technicien.adresse,
        nomSociete:Technicien.nomSociete,
        email:Technicien.email,
        MF:Technicien.MF
      }
    };

    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }


 
  updateTechnicien(id: string, technicien: Technicien): Observable<any> {
    console.log('modifier appelé avec :', technicien);
    return this.http.put(`http://localhost:1337/api/techniciens/${id}`, {
      data: technicien 
    });
      }
  

  
  deleteTechnicien(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  private generateUniqueId(): string {
    return 'TECH-' + Date.now().toString();
  }
}
