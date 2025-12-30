import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Service } from '../Models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost:1337/api/services';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}
 
  GetAll(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/services'); // GET all
  }

  getServiceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.data)
    );
  }

  addService(service: Service): Observable<any> {
    console.log('addService appelé avec :', service);
    const payload = {
      data: {
        idservice: this.generateUniqueId(),
        nom: service.nom,
        montant:service.montant,
        TVA:service.TVA,
        prixTOT:service.prixTOT,
        remise:service.remise,
        partTech:service.partTech,
        partESE:service.partESE
      }
    };

    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }


 
  updateService(id: string, service: Service): Observable<any> {
    console.log('modifier appelé avec :', service);
    return this.http.put(`http://localhost:1337/api/services/${id}`, {
      data: service 
    });
      }
  

  
  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  private generateUniqueId(): string {
    return 'SERV-' + Date.now().toString();
  }
}
