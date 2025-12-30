import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../Services/articles.service';
import Swal from 'sweetalert2';
import { Article } from '../../Models/Article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier',
  imports: [CommonModule,FormsModule],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css'
})
export class ModifierARTComponent {

  
 
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

  articles: any[] = [];
  idarticle='';
  article!: any;
  ARTtId!: string;
  docId!:string;

  isLoading = false;
  message='';

  constructor(private router: Router, private route: ActivatedRoute, private ArticlesServices:ArticlesService) {}

  goBack() {
    this.router.navigate(['/article'])
  }



  ngOnInit() {   
    this.ArticlesServices.GetAll().subscribe({
      next: (res) => {
        this.articles = res.data;
        this.idarticle = this.route.snapshot.paramMap.get('id')?? '';
        const article = this.articles.find((art) => art.idarticle === this.idarticle);
        if (article) {
          this.article = article;
          this.ARTtId = article.id;
          this.docId = article.documentId;
          console.log(this.docId)
          console.log(this.ARTtId);
          console.log('article trouvé :', this.article);

          this.designation = article.designation;
          this.famille=article.famille;
          this.unite=article.unite;
          this.marque=article.marque;
          this.modele=article.modele;
          this.libelle=article.libelle;
          this.prixHT=article.prixHT;
          this.TVA=article.TVA;
          this.prixTTC=article.prixTTC;
          this.prixESE=article.prixESE;
        } else {
          console.warn('ARTICLE introuvable pour ID:', this.idarticle);
        }
  }});
    
  }


  onUpdate() {
    console.log('onUpdate() appelé');
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
      this.idarticle, 
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


    console.log('Article à modifier:', article1);
    this.ArticlesServices.updateArticle(this.docId,article1).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Article Modifié avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/article']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur d\'ajout', err);
        this.message = 'Erreur lors de la Modification de l\'article. Veuillez réessayer.';
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
