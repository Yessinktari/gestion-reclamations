import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TechnicienService } from '../Services2/technicien.service';
import { ReclamationService } from '../service3/reclamation.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-technicien',
  imports: [CommonModule, MatButtonModule, MatMenuModule, RouterOutlet, FormsModule,MatPaginatorModule],
  templateUrl: './technicien.component.html',
  styleUrl: './technicien.component.css'
})
export class TechnicienComponent {


  
  user: any = {};
  techniciens: any[] = [];
  isCollapsed = true;
  NomEtPrenom: string = 'Yessin Ktari';
  searchTerm: string = '';
  technicien: any;
  ARTtId: any;
  docId: any;





  constructor(private ReclamationService:ReclamationService, private TechnicienService:TechnicienService,private route: ActivatedRoute,public router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    }
  }



  ngOnInit() {
    this.TechnicienService.GetAll().subscribe({
      next: (res) => {
        this.techniciens = res.data;
      },
      error: (err) => {
        console.error('Error loading articles:', err);
        this.techniciens = [];
      }
    });
  }



  create() {
    console.log('Navigation vers AddTechnicien...');
    this.router.navigate(['AddTechnicien'],{ relativeTo: this.route });
  }

  update(id: string) {
    console.log('Navigation vers UpdateTechnicien avec ID:', id);
    this.router.navigate(['UpdateTechnicien', id], { relativeTo: this.route });
  }




  delete(id:any)
  {
    const technicien = this.techniciens.find((tech) => tech.idtechnicien === id);
    if (technicien) {
      this.technicien = technicien;
      this.ARTtId = technicien.id;
      this.docId = technicien.documentId;
    }
    this.ReclamationService.GetAll().subscribe({
      next: (res) => {
        const recArts = res.data;

        recArts.forEach((rec: any) => {
          console.log("→ Comparaison :", rec.revendeur?.documentId, "===", this.docId);
        });
  
        const utilisé = recArts.some((rec: any) => {
          console.log(rec.technicien?.documentId);
          return rec.technicien?.documentId.toString() === this.docId.toString();
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
              this.TechnicienService.deleteTechnicien(this.docId).subscribe({
                next: () => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Suppression réussie',
                    text: 'Client supprimé avec succès.'
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

  ToService(){this.router.navigate(['/service']); }

  ToClient(){this.router.navigate(['/client']); }

  ToRevendeur(){this.router.navigate(['/revendeur']);}

  ToArticle(){this.router.navigate(['/article']); }

  ToReclamation()
  {
    this.router.navigate(['/reclamation']); 
  }


  getTauxProfilsComplets(techniciens: any[]): number {
    const complets = techniciens.filter(t =>
      t.email?.trim() !== '' &&
      t.telephone?.trim() !== ''
    ).length;
  
    return Math.round((complets / techniciens.length) * 100);
  }
  

  getTechniciensDeSfax(techniciens: any[]): any[] {
    return techniciens.filter(t =>t.adresse?.toLowerCase().includes('sfax')
    );
  }
  

  
getFilteredTechniciens(): any[] {
  if (!this.searchTerm.trim()) {
    return this.techniciens;
  }
  const search = this.searchTerm.toLowerCase();
  return this.techniciens.filter(technicien => 
    (technicien.nom && technicien.nom.toLowerCase().includes(search)) ||
    (technicien.prenom && technicien.prenom.toLowerCase().includes(search)) ||
    (technicien.adresse && technicien.adresse.toLowerCase().includes(search))
  );
}
trackByTechId(index: number, technicien: any): number {
  return technicien.id || index;
}




}
