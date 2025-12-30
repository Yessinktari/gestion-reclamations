import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ServicesService } from '../Services2/services.service';
import { Service } from '../Models/Service';
import { ReclamationService } from '../service3/reclamation.service';
import {  RecServService } from '../service3/rec-serv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  imports: [CommonModule, MatButtonModule, MatMenuModule, RouterOutlet, FormsModule,MatPaginatorModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {

  user: any = {};
  services: any[] = [];
  isCollapsed = true;
  NomEtPrenom: string = 'Yessin Ktari';
  searchTerm: string = '';
  service: any;
  ARTtId: any;
  docId: any;





  constructor(private  RecServService : RecServService , private ServicesService:ServicesService,private route: ActivatedRoute,public router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    }
  }
  ngOnInit() {
    this.ServicesService.GetAll().subscribe({
      next: (res) => {
        this.services = res.data;
      },
      error: (err) => {
        console.error('Error loading articles:', err);
        this.services = [];
      }
    });
  }



  create() {
    console.log('Navigation vers AddService...');
    this.router.navigate(['AddService'],{ relativeTo: this.route });
  }

  update(id: string) {
    console.log('Navigation vers UpdateService avec ID:', id);
    this.router.navigate(['UpdateService', id], { relativeTo: this.route });
  }

  delete(id: string) {
    const service = this.services.find((serv) => serv.idservice === id);
    if (service) {
      this.service = service;
      this.ARTtId = service.id;
      this.docId = service.documentId;
    }
  
    this.RecServService.GetServ().subscribe({
      next: (res) => {
        const recArts = res.data;

        recArts.forEach((rec: any) => {
          console.log("→ Comparaison :", rec.service?.documentId, "===", this.docId);
        });
  
        const utilisé = recArts.some((rec: any) => {
          return rec.service?.documentId.toString() === this.docId.toString();
        });
  
        if (utilisé) {
          Swal.fire({
            icon: 'warning',
            title: 'Suppression refusée',
            text: 'Cet Service est utilisé dans une réclamation et ne peut pas être supprimé.'
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
              this.ServicesService.deleteService(this.docId).subscribe({
                next: () => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Suppression réussie',
                    text: 'Service supprimé avec succès.'
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

  ToTechnicien(){this.router.navigate(['/technicien']); }

  ToClient(){this.router.navigate(['/client']); }

  ToRevendeur(){this.router.navigate(['/revendeur']);}

  ToArticle(){this.router.navigate(['/article']); }
  
  ToReclamation() {
    this.router.navigate(['/reclamation']); 
  }


  getMontantTotal(services: any[]): number {
    return services.reduce((sum, s) => sum + Number(s.montant), 0);
  }
  
getPartESETotale(services: any[]): number {
  return services.reduce((sum, s) => sum + Number(s.partESE), 0);
}

getFilteredServices(): any[] {
  if (!this.searchTerm.trim()) {
    return this.services;
  }
  const search = this.searchTerm.toLowerCase();
  return this.services.filter(service => 
    (service.nom && service.nom.toLowerCase().includes(search)) ||
    (service.montant && service.montant.toLowerCase().includes(search)) ||
    (service.TVA && service.TVA.toLowerCase().includes(search)) ||
    (service.prixTOT && service.prixTOT.toLowerCase().includes(search)) ||
    (service.remise && service.remise.toLowerCase().includes(search))
  );
}
trackByServiceId(index: number, service: any): number {
  return service.id || index;
}






}
