import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from '../../service3/reclamation.service';
import { RecArtService } from '../../service3/rec-art.service';

import { RecServService } from '../../service3/rec-serv.service';

import { ServicesService } from '../../Services2/services.service';
import { CommonModule, isPlatformBrowser, Time } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../Services/clients.service';
import { RevendeurService } from '../../Services2/revendeur.service';
import { ArticlesService } from '../../Services/articles.service';
import { TechnicienService } from '../../Services2/technicien.service';
import { time } from 'console';
import { Reclamation } from '../../Models/Reclamation';
import { ReclamationServ } from '../../Models/ReclamationServ';
import { Facture } from '../../Models/Facture';
import Swal from 'sweetalert2';
import { ReclamationArticle } from '../../Models/ReclamationArticles';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-update-reclamation',
  imports: [CommonModule,FormsModule],
  templateUrl: './update-reclamation.component.html',
  styleUrl: './update-reclamation.component.css'
})
export class UpdateReclamationComponent {

  idreclamation:string='';
  reclamation:any;
  RectId:string='';
  docId:string='';

  Selectedclient :any ;
  personneAcontacter:string='';
  telPersonneAcontacter:string ='';

  Selectedrevendeur:any;

  Selectedarticle:any;
  numS:string='';

  typeRegulation:string='';
  typeInter:string="";

  Selectedtechnicien:any;
  rdv:string= '';
  heure: string = '';

  noteSav: string = '';
  noteTech: string = '';

  etatTermine:boolean=false;
  etatVisite:any;
  etatTermineClose:boolean=true;

  articlesSelectionnes: any[] = [];
  servicesSelectionnes: any[] = [];
  recArt:any
  recServ:any

  //articleSelectionne
  montant='';
  remise:any;
  partTech: number = 0;
  partESE: number = 0;
  cout: number = 0;
  


  qte:any;



  user: any = {};


  clients: any[] = [];
  revendeurs: any[] = [];
  articles: any[] = [];
  techniciens: any[] = [];
  reclamations:any[]=[];
  services: any[] = [];

  rec:any;
  message: string = '';
  isLoading: boolean = false;
  isCollapsed = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientsService: ClientsService,
     private ServicesService: ServicesService,
    private RevendeurService: RevendeurService,
    private ArticlesService: ArticlesService,
    private TechnicienService: TechnicienService,
    private reclamationService: ReclamationService,
    private RecArtService:RecArtService,
    private RecServService:RecServService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    }
  }



  ngOnInit(): void {
    this.clientsService.GetAll().subscribe({
      next: (res) => {
        this.clients = res.data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des clients:', err);
        this.clients = [];
      }
    });
////////////////////////////////////////
this.RevendeurService.GetAll().subscribe({
  next: (res) => {
    this.revendeurs = res.data;
  },
  error: (err) => {
    console.error('Erreur lors du chargement des revendeurs:', err);
    this.revendeurs = [];
  }
});
/////////////////////////////////////////

this.ServicesService.GetAll().subscribe({
  next: (res) => {
    this.services = res.data;
  },
  error: (err) => {
    console.error('Erreur lors du chargement des revendeurs:', err);
    this.services = [];
  }
});


////////////////////////////////////////
this.ArticlesService.GetAll().subscribe({
  next: (res) => {
    this.articles = res.data;
  },
  error: (err) => {
    console.error('Erreur lors du chargement des articles:', err);
    this.articles = [];
  }
});
////////////////////////////////////////
this.TechnicienService.GetAll().subscribe({
  next: (res) => {
    this.techniciens = res.data;
  },
  error: (err) => {
    console.error('Erreur lors du chargement des techniciens:', err);
    this.techniciens = [];
  }
});
//////////////////////////////////
this.reclamationService.GetAll().subscribe({
  next: (res) => {
    this.reclamations = res.data;
    this.idreclamation = this.route.snapshot.paramMap.get('id')?? '';
    const reclamation = this.reclamations.find((rec) => rec.idreclamation === this.idreclamation);
    if (reclamation) {
      this.reclamation = reclamation;
      this.RectId = reclamation.id;
      this.docId = reclamation.documentId;
      console.log(this.docId)
      console.log(this.RectId);
      console.log('Reclamation trouvé :', this.reclamation);


      this.Selectedclient = reclamation.client.idclient;
      this.personneAcontacter = reclamation.client.personneAcontacter;
      this.telPersonneAcontacter = reclamation.client.telPersonneAcontacter;
      this.Selectedrevendeur = reclamation.revendeur.idrevendeur;
      this.Selectedarticle = reclamation.article.idarticle;
      //this.numS = reclamation.article.idservice;
      this.typeRegulation = reclamation.typeRegulation;
      this.typeInter = reclamation.typeInter;
      this.Selectedtechnicien = reclamation.technicien.idtechnicien;
      this.rdv = reclamation.DateRandezVous;
      this.heure = reclamation.heureDebut;
      this.noteSav = reclamation.noteSAV;
      this.noteTech = reclamation.noteTech;

  

    } else {
      console.warn('Reclamation introuvable pour ID:', this.idreclamation);
    }
}});


this.qte ='1';

  }



  goBack(): void {
    this.router.navigate(['/reclamation']);
  }


  onsubmit(): void 
  {

   if(this.reclamation.statut === 'Non Planifié')
    {

  const cli = this.clients.find(cl => cl.idclient === this.Selectedclient);
  const rev = this.revendeurs.find(rev => rev.idrevendeur === this.Selectedrevendeur);
  const art = this.articles.find(art => art.idarticle === this.Selectedarticle);
  const tech = this.techniciens.find(tech => tech.idtechnicien === this.Selectedtechnicien);



  if (!cli || !cli.id) { this.message = "Client n'est pas Choisi ou ID Strapi manquant"; return; }
  if (!rev || !rev.id) { this.message = "Revendeur n'est pas Choisi ou ID Strapi manquant"; return; }
  if (!art || !art.id) { this.message = "Article n'est pas Choisi ou ID Strapi manquant"; return; }
  if (!this.typeInter.trim()) { this.message = "Type d'Intervention n'est pas Choisi "; return; }
  if (!this.typeRegulation.trim()) { this.message = "Type de Réglement n'est pas Choisi "; return; }

  this.isLoading = true;
  this.message = '';

  
  const recArtIds = [art.id];
  const recServIds: number[] = []; 

  const rec = {
    idreclamation: this.idreclamation,
    statut: (!this.rdv.trim() && !this.heure.trim()) ? 'Non Planifié' : 'Planifié',
    dateSaisie: '',
    DateRandezVous: this.rdv,
    heureDebut: this.heure,
    typeInter: this.typeInter,
    typeRegulation: this.typeRegulation,
    numFac: '',
    interventionFac: '',
    cout: '',
    partTech: '',
    partESE: '',
    etatVisite: '',
    prixTOT: '',
    remiseGlob: '',
    prixFinal: '',
    noteSAV: this.noteSav,
    noteTech: this.noteTech,
    reclamation_articles: recArtIds,
    reclamation_services: recServIds,
    article : art.documentId
  };

  this.reclamationService.updateReclamation(this.docId,cli.id,art.documentId,tech ? tech.id : null,rev.id,rec).subscribe({
    next: (response) => {
      this.isLoading = false;
      Swal.fire({
        title: 'Succès',
        text: 'Réclamation Modifié avec succès !',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['/reclamation']);
    },
    
    error: (err) => {
      this.isLoading = false;
      this.message = 'Erreur lors de l\'ajout d\'une Réclamation. Veuillez réessayer.';
    }
  });

  }


  if(this.reclamation.statut === 'Planifié')
    {

  const cli = this.clients.find(cl => cl.idclient === this.Selectedclient);
  const rev = this.revendeurs.find(rev => rev.idrevendeur === this.Selectedrevendeur);
  const art = this.articles.find(art => art.idarticle === this.Selectedarticle);
  const tech = this.techniciens.find(tech => tech.idtechnicien === this.Selectedtechnicien);



  if (!cli || !cli.id) { this.message = "Client n'est pas Choisi ou ID Strapi manquant"; return; }
  if (!rev || !rev.id) { this.message = "Revendeur n'est pas Choisi ou ID Strapi manquant"; return; }
  if (!art || !art.id) { this.message = "Article n'est pas Choisi ou ID Strapi manquant"; return; }
  if (!this.typeInter.trim()) { this.message = "Type d'Intervention n'est pas Choisi "; return; }
  if (!this.typeRegulation.trim()) { this.message = "Type de Réglement n'est pas Choisi "; return; }

  this.isLoading = true;
  this.message = '';

   let rec:any;
  
  const recArtIds = [art.id];
  const recServIds: number[] = []; 


if(this.etatTermine == true)
  {
     rec = {
      idreclamation: this.idreclamation,
      statut: 'cloturé',
      dateSaisie: '',
      DateRandezVous: this.rdv,
      heureDebut: this.heure,
      typeInter: this.typeInter,
      typeRegulation: this.typeRegulation,
      numFac: '',
      interventionFac: '',
      cout: '',
      partTech: '',
      partESE: '',
      etatVisite: 'Terminé',
      prixTOT: '',
      remiseGlob: '',
      prixFinal: '',
      noteSAV: this.noteSav,
      noteTech: this.noteTech,
      reclamation_articles: recArtIds,
      reclamation_services: recServIds,
      article : art.documentId
    };

  }
  else
  {
     rec = {
      idreclamation: this.idreclamation,
      statut: 'Non Planifié',
      dateSaisie: '',
      DateRandezVous: '',
      heureDebut:'',
      typeInter: this.typeInter,
      typeRegulation: this.typeRegulation,
      numFac: '',
      interventionFac: '',
      cout: '',
      partTech: '',
      partESE: '',
      etatVisite: '',
      prixTOT: '',
      remiseGlob: '',
      prixFinal: '',
      noteSAV: this.noteSav,
      noteTech: this.noteTech,
      reclamation_articles: recArtIds,
      reclamation_services: recServIds,
      article : art.documentId
    };
  }

 

  this.reclamationService.updateReclamation(this.docId,cli.id,art.documentId,tech ? tech.id : null,rev.id,rec).subscribe({
    next: (response) => {
      this.isLoading = false;
      Swal.fire({
        title: 'Succès',
        text: 'Réclamation Modifié avec succès !',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['/reclamation']);
    },
    
    error: (err) => {
      this.isLoading = false;
      this.message = 'Erreur lors de l\'ajout d\'une Réclamation. Veuillez réessayer.';
    }
  });


  }

///////// cloturé


  if(this.reclamation.statut === 'cloturé'){

  const cli = this.clients.find(cl => cl.idclient === this.Selectedclient);
  const rev = this.revendeurs.find(rev => rev.idrevendeur === this.Selectedrevendeur);
  const art = this.articles.find(art => art.idarticle === this.Selectedarticle);
  const tech = this.techniciens.find(tech => tech.idtechnicien === this.Selectedtechnicien);



  if (!cli || !cli.id) { this.message = "Client n'est pas Choisi ou ID Strapi manquant"; return; }
  if (!rev || !rev.id) { this.message = "Revendeur n'est pas Choisi ou ID Strapi manquant"; return; }
  if (!art || !art.id) { this.message = "Article n'est pas Choisi ou ID Strapi manquant"; return; }
  if (!this.typeInter.trim()) { this.message = "Type d'Intervention n'est pas Choisi "; return; }
  if (!this.typeRegulation.trim()) { this.message = "Type de Réglement n'est pas Choisi "; return; }

  this.isLoading = true;
  this.message = '';

  const recArtObservables = this.articlesSelectionnes.map(art =>
    this.ArticlesService.getArticleById(art.documentId).pipe(
      switchMap(article => {
        console.log("Article récupéré : ", article);
        const recAr = new ReclamationArticle(this.idreclamation, this.qte, this.cout.toString(), this.remise, article, this.reclamation);
        return this.RecArtService.addRecArt(article.documentId,this.docId,recAr);
      })
    )
  );

  const recServObservables = this.servicesSelectionnes.map(serv =>
    this.ServicesService.getServiceById(serv.documentId).pipe(
      switchMap(service => {
        const recServ = new ReclamationServ(this.idreclamation, this.cout.toString(), this.remise, service, this.reclamation);
        return this.RecServService.addRecServ(service.documentId,this.docId,recServ);
      })
    )
  );

  this.isLoading = true;

  // Attendre la fin de tous les ajouts
  forkJoin([...recArtObservables, ...recServObservables]).subscribe({
    next: (_) => {
      // maintenant les recArt et recServ sont créés
      const rec = {
        idreclamation: this.idreclamation,
        statut: 'close',
        DateRandezVous: this.rdv,
        heureDebut: this.heure,
        typeInter: this.typeInter,
        typeRegulation: this.typeRegulation,
        noteSAV: this.noteSav,
        noteTech: this.noteTech,
        reclamation_articles: this.recArt, // tu peux aussi relire depuis le backend
        reclamation_services: this.recServ,
        article: this.Selectedarticle
      };

      this.reclamationService.updateReclamation(this.docId,cli.id,art.documentId,tech ? tech.id : null,rev.id,rec).subscribe({
        next: (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Succès',
            text: 'Réclamation Modifié avec succès !',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/reclamation']);
        },
        
        error: (err) => {
          this.isLoading = false;
          this.message = 'Erreur lors de l\'ajout d\'une Réclamation. Veuillez réessayer.';
        }
      });
    },
    error: (err) => {
      this.isLoading = false;
      this.message = 'Erreur lors de la création des articles/services.';
      console.error(err);
    }
  });
}

  }







ouvrirPopup(type: 'article' | 'service') {
  const liste = type === 'article' ? this.articles : this.services;
   let htmlContent:any;
  if(type == 'article' ){
   htmlContent = `
    <label for="selectItem" style="display:block; margin-bottom:8px;">Choisissez un ${type} :</label>
      <select id="selectItem" style="
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border-radius: 6px;
        border: 1px solid #ccc;
        outline: none;
        background-color: #f9f9f9;
        text-align: left;
      ">
        ${liste.map(item => `<option value="${item.id}">${item.modele}</option>`).join('')}
      </select>
  `;}
 if(type == 'service' ){
    htmlContent = `
    <label for="selectItem" style="display:block; margin-bottom:8px;">Choisissez un ${type} :</label>
      <select id="selectItem" style="
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border-radius: 6px;
        border: 1px solid #ccc;
        outline: none;
        background-color: #f9f9f9;
        text-align: left;
      ">
        ${liste.map(item => `<option value="${item.id}">${item.nom}</option>`).join('')}
      </select>
  `;}
  Swal.fire({
    title: type === 'article' ? 'Sélectionnez un article' : 'Sélectionnez un service',
    html: htmlContent,
    showCancelButton: true,
    confirmButtonText: 'Confirmer',
    cancelButtonText: 'Annuler',
    preConfirm: () => {
      const selectedId = (document.getElementById('selectItem') as HTMLSelectElement)?.value;
      const selectedItem = liste.find(item => item.id.toString() === selectedId);
      if (selectedItem) {
        return selectedItem;
      } else {
        Swal.showValidationMessage('Veuillez sélectionner un élément');
        return null;
      }
    }
  }).then(result => {
    if (result.isConfirmed && result.value) {
      const selected = result.value;
        if (type === 'article') {
          if (!this.articlesSelectionnes.some(a => a.id === selected.id)) {
            this.articlesSelectionnes.push(selected);
          }
        } else {
          if (!this.servicesSelectionnes.some(s => s.id === selected.id)) {
            this.servicesSelectionnes.push(selected);
          }
        }
        this.recalculerTotaux();
    }
  });
}

DeleteArt(id:any)
{
  const index = this.articlesSelectionnes.findIndex(s => s.id === id);
  if (index !== -1) {
    this.articlesSelectionnes.splice(index, 1); 
    this.recalculerTotaux();
  }
}





DeleteServ(id:any)
{
  const index = this.servicesSelectionnes.findIndex(s => s.id === id);
  if (index !== -1) {
    this.servicesSelectionnes.splice(index, 1); 
    this.recalculerTotaux();
  }
}
onMontantChange(serv: any): void {
  const montant = +serv.montant || 0; // convertir en nombre
  let partTech = +serv.partTech || 0;

  
  if (partTech > montant) {
    partTech = montant;
    serv.partTech = partTech;
  }

  // Calcul automatique de la part entreprise
  serv.partESE = montant - partTech;

  // Optionnel : garder les valeurs positives
  if (serv.partESE < 0) serv.partESE = 0;

  this.recalculerTotaux();
}

onPartTechChange(serv: any): void {
  const montant = serv.montant ?? 0;
  serv.partTech = serv.partTech ?? 0;

  if (serv.partTech > montant) {
    serv.partTech = 0;
    serv.partESE = 0;
  }

  serv.partESE = montant - serv.partTech;
  this.recalculerTotaux();
}


recalculerTotaux() {
  this.partTech = this.servicesSelectionnes.reduce((total, s) => {
    const qte = s.qte ?? 1;
    const remise = s.remise ?? 0;
    return total + (s.partTech ?? 0) * qte * (1 - remise / 100);
  }, 0);

  this.partESE = this.servicesSelectionnes.reduce((total, s) => {
    const qte = s.qte ?? 1;
    const remise = s.remise ?? 0;
    return total + (s.partESE ?? 0) * qte * (1 - remise / 100);
  }, 0);

  const totalArticles = this.articlesSelectionnes.reduce((total, a) => {
    const qte = a.qte ?? 1;
    const remise = a.remise ?? 0;
    return total + ((a.prixHT ?? 0) * qte * (1 - remise / 100));
  }, 0);

  const totalServices = this.servicesSelectionnes.reduce((total, s) => {
    const qte = s.qte ?? 1;
    const remise = s.remise ?? 0;
    return total + ((s.montant ?? 0) * qte * (1 - remise / 100));
  }, 0);

  this.cout = totalArticles + totalServices;

}



  clearMessage(): void {
    this.message = '';
  }
  onClientChange(): void {
    const cli = this.clients.find(cl => cl.idclient === this.Selectedclient);
    if (cli) {
      this.personneAcontacter = cli.personneAcontacter || '';
      this.telPersonneAcontacter = cli.telPersonneAcontacter || '';
    } else {
      this.personneAcontacter = '';
      this.telPersonneAcontacter = '';
    }

}

}
