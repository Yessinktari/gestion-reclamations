import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ArticlesService } from '..//Services/articles.service';
import { Article } from '../Models/Article';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ReclamationService } from '../service3/reclamation.service';
import { RecArtService } from '../service3/rec-art.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  standalone:true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, RouterOutlet, FormsModule,MatPaginatorModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  user: any = {};
  articles: any[] = [];
  isCollapsed = true;
  NomEtPrenom: string = 'Yessin Ktari';
  searchTerm: string = '';
  idarticle: any;
  article: any;
  ARTtId: any;
  docId: any;
  



  constructor( private ArticlesService:ArticlesService
    ,private route: ActivatedRoute
    ,public RecArtService:RecArtService
    ,public ReclamationService:ReclamationService
    ,public router: Router
    ,@Inject(PLATFORM_ID) private platformId: Object
  
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    }
  }
  ngOnInit() {
    this.ArticlesService.GetAll().subscribe({
      next: (res) => {
        this.articles = res.data;
      },
      error: (err) => {
        console.error('Error loading articles:', err);
        this.articles = [];
      }
    });
  }


  create() {
    console.log('Navigation vers AddArticle...');
    this.router.navigate(['AddArticle'],{ relativeTo: this.route });
  }

  update(id: string) {
    console.log('Navigation vers UpdateArticle avec ID:', id);
    this.router.navigate(['UpdateArticle', id], { relativeTo: this.route });
  }

  delete(id: string) {
    this.RecArtService.GetArt().subscribe({
      next: (res) => {
        const article = this.articles.find((art) => art.idarticle === id);
        if (article) {
          this.article = article;
          this.ARTtId = article.id;
          this.docId = article.documentId;
        }
  
        const recArts = res.data;
        const utilisé = recArts.some((rec: any) => {
          const recDocId = rec.article?.documentId?.toString().trim();
          const targetDocId = this.docId?.toString().trim();
          return recDocId === targetDocId;
        });
  
        if (utilisé) {
          Swal.fire({
            icon: 'warning',
            title: 'Suppression refusée',
            text: 'Cet article est utilisé dans une réclamation et ne peut pas être supprimé.'
          });
        } else {
          // 🔽 Message de confirmation avant suppression
          Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Cette action est irréversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
          }).then((result) => {
            if (result.isConfirmed) {
              // Suppression
              this.ArticlesService.deleteArticle(this.docId).subscribe({
                next: () => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Suppression réussie',
                    text: 'Article supprimé avec succès.'
                  });
                },
                error: (err) => {
                  console.error('Erreur de suppression :', err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de la suppression.'
                  });
                }
              });
            }
          });
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réclamations articles :', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de vérifier les réclamations liées.'
        });
      }
    });
  }
  


  //log out 
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      this.router.navigate(['/login']);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  //routing
  ToTechnicien()
  {
    this.router.navigate(['/technicien']); 
  }

  ToService()
  {
    this.router.navigate(['/service']); 
  }


  ToReclamation()
  {
    this.router.navigate(['/reclamation']); 
  }
  

  ToClient()
  {
    this.router.navigate(['/client']); 
  }

  ToRevendeur(){this.router.navigate(['/revendeur']);}

  getUniqueFamilles(): string[] {
    const familles = this.articles.map(article => article.famille).filter(fam => fam);
    return [...new Set(familles)];
  }


 getArticlesPrixTTCAbove(threshold: number = 1000): any[] {
  return this.articles.filter(article => parseFloat(article.prixTTC) > threshold);
}
 getAveragePrixTTC(): number {
  const prixList = this.articles
    .map(article => parseFloat(article.prixTTC))
    .filter(prix => !isNaN(prix));

  if (prixList.length === 0) return 0;

  const total = prixList.reduce((acc, val) => acc + val, 0);
  return total / prixList.length;
}


  getFilteredArticles(): any[] {
    if (!this.searchTerm.trim()) {
      return this.articles;
    }
    const search = this.searchTerm.toLowerCase();
    return this.articles.filter(article => 
      (article.designation &&article.designation.toLowerCase().includes(search)) ||
      (article.modele && article.modele .toLowerCase().includes(search)) ||
      (article.libelle && article.libelle.toLowerCase().includes(search)) ||
      (article.marque && article.marque.toLowerCase().includes(search)) ||
      (article.famille && article.famille.toLowerCase().includes(search))
    );
  }
  trackByArticleId(index: number, article: any): number {
    return article.id || index;
  }



}
