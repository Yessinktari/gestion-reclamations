import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Client } from '../../Models/Client';
import { ClientsService } from '../../Services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  nom: string = '';
  prenom: string = '';
  personneAcontacter: string = '';
  telPersonneAcontacter: string = '';
  tel1: string = '';
  tel2: string = '';
  email: string = '';
  MF: string = '';
  pays: string = '';
  ville: string = '';
  adresse: string = '';
  manicipalite: string = '';
  zone: string = '';
  note: string = '';
  message: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private ClientsService: ClientsService) {}

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onsubmit() {
    console.log('onsubmit() appelé');
    if (!this.nom.trim()) {
      this.message = 'Le nom est obligatoire';
      return;
    }

    if (!this.telPersonneAcontacter.trim()) {
      this.message = 'Le téléphone de la personne à contacter est obligatoire';
      return;
    }

    // Validation email si fourni
    if (this.email && !this.isValidEmail(this.email)) {
      this.message = 'Format d\'email invalide';
      return;
    }

    this.isLoading = true;
    this.message = '';

    const client1 = new Client(
      '', // id (sera généré par le service)
      this.nom,
      this.prenom,
      this.personneAcontacter,
      this.tel1,
      this.tel2,
      this.telPersonneAcontacter,
      this.email,
      this.MF,
      this.manicipalite,
      this.ville,
      this.adresse,
      this.pays,
      this.zone,
      this.note
    );

    console.log('Client à ajouter:', client1);

    this.ClientsService.addClient(client1).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Client Ajouté avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur d\'ajout', err);
        this.message = 'Erreur lors de l\'ajout du client. Veuillez réessayer.';
      }
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearMessage() {
    this.message = '';
  }
}
