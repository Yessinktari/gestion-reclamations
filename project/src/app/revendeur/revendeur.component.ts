import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RevendeurService } from '../Services2/revendeur.service';
import { ReclamationService } from '../service3/reclamation.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-revendeur',
  imports: [CommonModule, MatButtonModule, MatMenuModule, RouterOutlet, FormsModule,MatPaginatorModule],
  templateUrl: './revendeur.component.html',
  styleUrl: './revendeur.component.css'
})
export class RevendeurComponent {
  user: any = {};
  isCollapsed = true;
  revendeurs: any[] = [];
  NomEtPrenom='';
  searchTerm: string = '';
  revendeur: any;
  ARTtId: any;
  docId: any;


  constructor(private ReclamationService:ReclamationService, private RevendeurService:RevendeurService,private route: ActivatedRoute,public router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
      this.NomEtPrenom = this.user.NomEtPrenom;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    }
  }

  


  create() {
   
    console.log('Navigation vers AddRevendeur...');
    this.router.navigate(['AddRevendeur'],{ relativeTo: this.route });
  }

  update(id: string) {
    console.log('Navigation vers UpdateRevendeur avec ID:', id);
    this.router.navigate(['UpdateRevendeur', id], { relativeTo: this.route });
  }




  delete(id:any)
  {
    const revendeur = this.revendeurs.find((rev) => rev.idrevendeur === id);
    if (revendeur) {
      this.revendeur = revendeur;
      this.ARTtId = revendeur.id;
      this.docId = revendeur.documentId;
    }
    this.ReclamationService.GetAll().subscribe({
      next: (res) => {
        const recArts = res.data;

        recArts.forEach((rec: any) => {
          console.log("→ Comparaison :", rec.revendeur?.documentId, "===", this.docId);
        });
  
        const utilisé = recArts.some((rec: any) => {
          console.log(rec.revendeur?.documentId);
          return rec.revendeur?.documentId.toString() === this.docId.toString();
        });
  
        if (utilisé) {
          Swal.fire({
            icon: 'warning',
            title: 'Suppression refusée',
            text: 'Cet Revendeur est utilisé dans une réclamation et ne peut pas être supprimé.'
          });
        } else {
          Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Cette action est irréversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
          }).then((result) => {
            if (result.isConfirmed) {
              this.RevendeurService.deleteRevendeur(this.docId).subscribe({
                next: () => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Suppression réussie',
                    text: 'Revendeur supprimé avec succès.'
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
        console.error('Erreur lors du chargement des clients :', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de vérifier les réclamations liées.'
        });
      }
    });

  }










  ToArticle(){this.router.navigate(['/article']); }

  ToClient(){this.router.navigate(['/client']);}

  ToTechnicien(){this.router.navigate(['/technicien']);}

  ToService(){this.router.navigate(['/service']); }
  
  ToReclamation() {
    this.router.navigate(['/reclamation']); 
  }


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


  ngOnInit() {
    this.RevendeurService.GetAll().subscribe({
      next: (res) => {
        this.revendeurs = res.data;
      },
      error: (err) => {
        console.error('Error loading revendeurs:', err);
        this.revendeurs = [];
      }
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      this.router.navigate(['/login']);
    }
  }


  getTauxDonneesCompletes(revendeurs: any[]): number {
    const complets = revendeurs.filter(r =>
      r.email && r.email.trim() !== '' &&
      r.telephone && r.telephone.trim() !== ''
    ).length;
  
    return Math.round((complets / revendeurs.length) * 100);
  }

  getRevendeursWithPhone(): any[] {
    return this.revendeurs.filter(revendeur => revendeur.telephone&& revendeur.telephone.trim() !== '');
  }
  






  getFilteredRevendeurs(): any[] {
    if (!this.searchTerm.trim()) {
      return this.revendeurs;
    }
    const search = this.searchTerm.toLowerCase();
    return this.revendeurs.filter(revendeur => 
      (revendeur.nom && revendeur.nom.toLowerCase().includes(search)) ||
      (revendeur.responsable && revendeur.responsable.toLowerCase().includes(search)) ||
      (revendeur.email && revendeur.email.toLowerCase().includes(search)) ||
      (revendeur.telephone && revendeur.telephone.toLowerCase().includes(search)) ||
      (revendeur.MF && revendeur.MF.toLowerCase().includes(search))
    );
  }
  
  trackByRevendeurId(index: number, revendeur: any): number {
    return revendeur.id || index;
  }



}
