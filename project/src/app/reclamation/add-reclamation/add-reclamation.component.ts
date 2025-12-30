import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from '../../service3/reclamation.service';
import { RecArtService } from '../../service3/rec-art.service';

import { RecServService } from '../../service3/rec-serv.service';


import { CommonModule, isPlatformBrowser, Time } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../Services/clients.service';
import { RevendeurService } from '../../Services2/revendeur.service';
import { ArticlesService } from '../../Services/articles.service';
import { TechnicienService } from '../../Services2/technicien.service';
import { time } from 'console';
import { Reclamation } from '../../Models/Reclamation';
import { Facture } from '../../Models/Facture';
import Swal from 'sweetalert2';
import { ReclamationArticle } from '../../Models/ReclamationArticles';

@Component({
  selector: 'app-add-reclamation',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-reclamation.component.html',
  styleUrl: './add-reclamation.component.css'
})
export class AddReclamationComponent {
  
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




  user: any = {};

  recArt :any[]=[];
  recServ :any[]=[];

  clients: any[] = [];
  revendeurs: any[] = [];
  articles: any[] = [];
  techniciens: any[] = [];

  rec:any;
  message: string = '';
  isLoading: boolean = false;
  isCollapsed = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientsService: ClientsService,
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

  }



  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }



 onsubmit(): void {

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


  this.reclamationService.addReclamation(cli.id,art.documentId,tech ? tech.id : null,rev.id,rec).subscribe({
    next: (response) => {
      this.isLoading = false;
      Swal.fire({
        title: 'Succès',
        text: 'Réclamation Ajouté avec succès !',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['../'], { relativeTo: this.route });
    },
    
    error: (err) => {
      this.isLoading = false;
      this.message = 'Erreur lors de l\'ajout d\'une Réclamation. Veuillez réessayer.';
    }
  });


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