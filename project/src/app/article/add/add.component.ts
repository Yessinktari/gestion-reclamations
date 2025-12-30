import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../Services/articles.service';
import { Article } from '../../Models/Article';
import Swal from 'sweetalert2';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-add',
  imports: [CommonModule,FormsModule, MatButtonModule, MatMenuModule,MatPaginatorModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddARTComponent {

  NomEtPrenom = 'Yessin Ktari'
 
  designation:string='';
  famille:string='';
  unite:string='';
  marque:string='';
  modele:string='';
  libelle:string='';
  prixHT:string='';
  TVA:string='';
  prixTTC:string='';
  prixESE:string='';

  isLoading = false;
  message='';
  isCollapsed = false;

  constructor(private router: Router, private route: ActivatedRoute, private ArticlesServices:ArticlesService,@Inject(PLATFORM_ID) private platformId: Object) {}

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
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


  onsubmit() {
    console.log('onsubmit() appelé');
    if (!this.libelle.trim()) {
      this.message = 'Le libelle est obligatoire';
      return;
    }

    const prix = Number(this.prixHT);
    if (isNaN(prix) || prix <= 0) {
      this.message = 'Le prix HT est obligatoire et doit être un nombre positif';
      return;
    }

   

    this.isLoading = true;
    this.message = '';
    this.prixESE = this.prixTTC+20;
    const article1 = new Article(
      '',
      this.designation,
      this.famille,
      this.unite,
      this.marque,
      this.modele,
      this.libelle,
      String(this.prixHT),
      String(this.TVA),
      String(this.prixTTC),
      String(this.prixESE)
    );
    console.log('Article à ajouter:', article1);
    this.ArticlesServices.addArticle(article1).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Article Ajouté avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur d\'ajout', err);
        this.message = 'Erreur lors de l\'ajout du Article. Veuillez réessayer.';
      }
    });
  }


  clearMessage() {
    this.message = '';
  }


  updatePrixTTC()
  {const ht = parseFloat(this.prixHT);
    const tva = parseFloat(this.TVA);
  
    if (!isNaN(ht) && !isNaN(tva)) {
      const ttc = ht + (ht * tva / 100);
      this.prixTTC = ttc.toFixed(2); 
    } else {
      this.prixTTC = '';
    }
  }
}
