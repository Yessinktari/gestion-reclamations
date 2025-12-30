import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Article } from '../Models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private apiUrl = 'http://localhost:1337/api/articles';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  GetAll(): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/articles'); // GET all
  }

  getArticleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.data) // <- important pour éviter {data: []}
    );
  }

  addArticle(article: Article): Observable<any> {
    const payload = {
      data: {
        idarticle: this.generateUniqueId(),
        designation: article.designation || '',
        famille: article.famille || '',
        unite: article.unite || '',
        marque: article.marque || '',
        modele: article.modele || '',
        libelle: article.libelle || '',
        prixHT: article.prixHT || '',
        TVA: article.TVA || '',
        prixTTC: article.prixTTC || '',
        prixESE: article.prixESE || '',
      }
    };
    console.log('Payload envoyé à Strapi:', payload);
    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }


 
  updateArticle(id: string, article: Article): Observable<any> {
    console.log('modifier appelé avec :', article);
    return this.http.put(`http://localhost:1337/api/articles/${id}`, {
      data: {
        idarticle: article.idarticle  ,
        designation: article.designation || '',
        famille: article.famille || '',
        unite: article.unite || '',
        marque: article.marque || '',
        modele: article.modele || '',
        libelle: article.libelle || '',
        prixHT: article.prixHT || '',
        TVA: article.TVA || '',
        prixTTC: article.prixTTC || '',
        prixESE: article.prixESE || '',
      }
    });
      }
  

  
  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  private generateUniqueId(): string {
    return 'ART-' + Date.now().toString();
  }

}
