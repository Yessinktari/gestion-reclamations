import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../Services2/services.service';
import { Service } from '../../Models/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-serv',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-serv.component.html',
  styleUrl: './add-serv.component.css'
})
export class AddServComponent {

  nom: string = '';
  montant: string = '';
  TVA:string = '';
  remise: string = '';
  prixTOT: string = '';
  partTech: string = '';
  partESE: string = '';


  message: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private servicesService: ServicesService) {}



  goBack() {
    this.router.navigate(['/service']);
  }


  onsubmit() {
    console.log('onsubmit() appelé');
    if (!this.nom.trim()) {
      this.message = 'Le nom est obligatoire';
      return;
    }

    this.isLoading = true;
    this.message = '';

    const prix = Number(this.montant);
    if (isNaN(prix) || prix <= 0 ) {
      this.message = 'Le montant est obligatoire et doit être un nombre positif';
      return;
    }
    const tva = Number(this.TVA);
    if (isNaN(tva) || tva <= 0 ) {
      this.message = 'Le TVA est obligatoire et doit être un nombre positif';
      return;
    }

  
    this.isLoading = true;
    this.message = '';

   
    const serv = new Service('',this.nom,String(this.montant),
    String(this.TVA),
    String(this.prixTOT),
    String(this.remise),
    String(this.partTech),
    String(this.partESE));

    console.log('Article à ajouter:', serv);
    this.servicesService.addService(serv).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Service Ajouté avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/service']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur d\'ajout', err);
        this.message = 'Erreur lors de l\'ajout du service. Veuillez réessayer.';
      }
    });
  }


  updatePrixTTC()
  {const ht = parseFloat(this.montant);
    const tva = parseFloat(this.TVA);
  
    if (!isNaN(ht) && !isNaN(tva)) {
      const ttc = ht + (ht * tva / 100);
      const part =(ht / 2);
      this.prixTOT = ttc.toFixed(2); 
      this.partTech = part.toFixed(2); 
      this.partESE = part.toFixed(2); 
    } else {
      this.prixTOT = '';
      this.partESE = ''; 
      this.partTech = ''; 
    }
  }

  
  
  clearMessage() {
    this.message = '';
  }








}
