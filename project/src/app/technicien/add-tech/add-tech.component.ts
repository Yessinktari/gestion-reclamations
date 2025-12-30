import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnicienService } from '../../Services2/technicien.service';
import { Technicien } from '../../Models/Technicien';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tech',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-tech.component.html',
  styleUrl: './add-tech.component.css'
})
export class AddTechComponent {



  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  adresse: string = '';
  nomSociete: string = '';
  email: string = '';
  MF: string = '';

  message: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private TechnicienService: TechnicienService) {}

  goBack() {
    this.router.navigate(['/technicien']);
  }

  onsubmit() {
    console.log('onsubmit() appelé');
    if (!this.nom.trim()) {
      this.message = 'Le nom est obligatoire';
      return;
    }

    // Validation email si fourni
    if (this.email && !this.isValidEmail(this.email)) {
      this.message = 'Format d\'email invalide';
      return;
    }

    this.isLoading = true;
    this.message = '';

    const tech = new Technicien(
      '', // id (sera généré par le service)
      this.nom,
      this.prenom,
      this.telephone,
      this.adresse,
      this.nomSociete,
      this.email,
      this.MF);

    console.log('Technicien à ajouter:', tech);

    this.TechnicienService.addTechnicien(tech).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Technicien Ajouté avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/technicien']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur d\'ajout', err);
        this.message = 'Erreur lors de l\'ajout du technicien. Veuillez réessayer.';
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
