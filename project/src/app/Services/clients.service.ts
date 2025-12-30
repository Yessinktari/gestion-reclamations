import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Client } from '../Models/Client';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:1337/api/clients';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  GetAll(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/clients'); // GET all
  }

  getClientById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?filters[idclient]=${id}`);
  }


  
  GetClientsCeMois(): Observable<any> {
    const now = new Date();
    const debutMois = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const finMois = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
  
    const params = new HttpParams()
      .set('filters[createdAt][$gte]', debutMois)
      .set('filters[createdAt][$lte]', finMois);
  
    return this.http.get<any>('http://localhost:1337/api/clients', { params });
  }



  addClient(client: Client): Observable<any> {
    console.log('addClient appelé avec :', client);
    const payload = {
      data: {
        idclient: this.generateUniqueId(),
        nom: client.nom,
        prenom: client.prenom,
        personneAcontacter: client.personneAcontacter,
        tel1: client.tel1,
        tel2: client.tel2,
        telPersonneAcontacter: client.telPersonneAcontacter,
        email: client.email,
        MF: client.MF,
        manicipalite: client.manicipalite,
        ville: client.ville,
        adresse: client.adresse,
        pays: client.pays,
        zone: client.zone,
        note: client.note
      }
    };

    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }


 
  updateClient(id: string, client: Client): Observable<any> {
    console.log('modifier appelé avec :', client);
    return this.http.put(`http://localhost:1337/api/clients/${id}`, {
      data: client // Encapsuler dans "data"
    });
      }
  

  
  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  private generateUniqueId(): string {
    return 'CLI-' + Date.now().toString();
  }

}
