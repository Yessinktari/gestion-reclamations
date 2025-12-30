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
@Component({
  selector: 'app-reclamation',
  imports: [CommonModule, MatButtonModule, MatMenuModule, RouterOutlet, FormsModule,MatPaginatorModule],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent {

  user: any = {};
  reclamations: any[] = [];
  isCollapsed = true;
  NomEtPrenom: string = 'Yessin Ktari';
  searchTerm: string = '';
  rec_articles:any[]=[];
  article:any;
  

  constructor( private ReclamationService:ReclamationService,private route: ActivatedRoute,public router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    }
  }

  create() {
    console.log('Navigation vers AddReclamation...');
    this.router.navigate(['AddReclamation'],{ relativeTo: this.route });
  }

  update(id: string) {
    console.log('Navigation vers UpdateReclamation avec ID:', id);
    this.router.navigate(['UpdateReclamation', id], { relativeTo: this.route });
  }

  ToArticle(){this.router.navigate(['/article']); }

  ToRevendeur(){this.router.navigate(['/revendeur']);}

  ToTechnicien(){this.router.navigate(['/technicien']);}

  ToService(){this.router.navigate(['/service']); }

  
  ToClient()
  {this.router.navigate(['/client']); }





  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {
    this.ReclamationService.GetAll().subscribe({
      next: (res) => {
        this.reclamations = res.data;
        this.rec_articles = this.reclamations.flatMap(rec => rec.reclamation_articles);
      },
      error: (err) => {
        console.error('Error loading clients:', err);
        this.reclamations = [];
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
  getNombreReclamationsCloturees(): number {
    return this.reclamations.filter(rec =>
      rec.statut?.toLowerCase() === 'clôturé' || rec.statut?.toLowerCase() === 'cloturé'
    ).length;
  }


  getNombreReclamationsCeMois(): number {
    const now = new Date();
    return this.reclamations.filter(rec => {
      const date = new Date(rec.createdAt);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;
  }

  getTotalMontantReclamations(): number {
    return this.reclamations
      .map(r => parseFloat(r.prixFinal))
      .filter(p => !isNaN(p))
      .reduce((a, b) => a + b, 0);
  }
 

   getFilteredReclamation(): any[] {
     if (!this.searchTerm.trim()) {
       return this.reclamations;
     }
     const search = this.searchTerm.toLowerCase();
     return this.reclamations.filter(reclamation => 
      (reclamation.idreclamation && reclamation.idreclamation.toLowerCase().includes(search)) ||
       (reclamation.client?.nom && reclamation.client.nom.toLowerCase().includes(search)) ||
       (reclamation.client?.prenom &&reclamation.client.prenom.toLowerCase().includes(search)) ||
       (reclamation.client?.telPersonneAcontacter && reclamation.client.telPersonneAcontacter.toLowerCase().includes(search)) ||
       (reclamation.technicien?.nom && reclamation.technicien.nom.toLowerCase().includes(search)) ||
       (reclamation.revendeur?.nom && reclamation.revendeur.nom.toLowerCase().includes(search))
     );
 }

  
  trackByReclamationId(index: number, reclamation: any): number {
    return reclamation.id || index;
  }

}
