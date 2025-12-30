import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ClientsService } from '..//Services/clients.service';
import { Client } from '../Models/Client';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ReclamationService } from '../service3/reclamation.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, RouterOutlet, FormsModule,MatPaginatorModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  user: any = {};
  clients: any[] = [];
  isCollapsed = true;
  NomEtPrenom: string = 'Yessin Ktari';
  searchTerm: string = '';
  clientMois : any[] = [];
  client: any;
  ARTtId: any;
  docId: any;



  constructor(private ReclamationService:ReclamationService, private ClientsService:ClientsService,private route: ActivatedRoute,public router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    }
  }

  create() {
    console.log('Navigation vers AddClient...');
    this.router.navigate(['AddClient'],{ relativeTo: this.route });
  }

  update(id: string) {
    console.log('Navigation vers UpdateClient avec ID:', id);
    this.router.navigate(['UpdateClient', id], { relativeTo: this.route });
  }


  delete(id:any)
  {
    const client = this.clients.find((cli) => cli.idclient === id);
    if (client) {
      this.client = client;
      this.ARTtId = client.id;
      this.docId = client.documentId;
    }
    this.ReclamationService.GetAll().subscribe({
      next: (res) => {
        const recArts = res.data;

        recArts.forEach((rec: any) => {
          console.log("→ Comparaison :", rec.client?.documentId, "===", this.docId);
        });
  
        const utilisé = recArts.some((rec: any) => {
          console.log(rec.client?.documentId);
          return rec.client?.documentId.toString() === this.docId.toString();
        });
  
        if (utilisé) {
          Swal.fire({
            icon: 'warning',
            title: 'Suppression refusée',
            text: 'Cet Utilisateur est utilisé dans une réclamation et ne peut pas être supprimé.'
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
            this.ClientsService.deleteClient(this.docId).subscribe({
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

  ToArticle(){this.router.navigate(['/article']); }

  ToRevendeur(){this.router.navigate(['/revendeur']);}

  ToTechnicien(){this.router.navigate(['/technicien']);}

  ToService(){this.router.navigate(['/service']); }
  
  ToReclamation()
  {
    this.router.navigate(['/reclamation']); 
  }




  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {
    this.ClientsService.GetAll().subscribe({
      next: (res) => {
        this.clients = res.data;
      },
      error: (err) => {
        console.error('Error loading clients:', err);
        this.clients = [];
      }
    });
    
    this.getClientsCeMois();
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      this.router.navigate(['/login']);
    }
  }

  getUniqueZones(): string[] {
    const cities = this.clients.map(client => client.ville).filter(city => city);
    return [...new Set(cities)];
  }

  getClientsCeMois() {
    this.ClientsService.GetClientsCeMois().subscribe({
      next: (res) => {
        this.clientMois = res.data;
      },
      error: (err) => {
        console.error('Error loading clients:', err);
        this.clientMois = [];
      }
    });
  }

  getFilteredClients(): any[] {
    if (!this.searchTerm.trim()) {
      return this.clients;
    }
    const search = this.searchTerm.toLowerCase();
    return this.clients.filter(client => 
      (client.nom && client.nom.toLowerCase().includes(search)) ||
      (client.prenom && client.prenom.toLowerCase().includes(search)) ||
      (client.email && client.email.toLowerCase().includes(search)) ||
      (client.ville && client.ville.toLowerCase().includes(search)) ||
      (client.personneAcontacter && client.personneAcontacter.toLowerCase().includes(search))
    );
  }
  
  trackByClientId(index: number, client: any): number {
    return client.id || index;
  }
}



  
