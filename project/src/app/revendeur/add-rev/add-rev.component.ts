import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RevendeurService } from '../../Services2/revendeur.service';
import { Revendeur } from '../../Models/Revendeur';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-rev',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-rev.component.html',
  styleUrl: './add-rev.component.css'
})
export class AddRevComponent {

  nom: string = '';
  responsable: string = '';
  MF: string = '';
  email: string = '';
  telephone: string = '';




  message: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private RevendeurService: RevendeurService) {}



  goBack() {
    this.router.navigate(['/revendeur']);
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

    const rev = new Revendeur('',this.nom,this.responsable,this.email,this.MF,this.telephone);

    console.log('Client à ajouter:', rev);

    this.RevendeurService.addRevendeur(rev).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Revendeur Ajouté avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur d\'ajout', err);
        this.message = 'Erreur lors de l\'ajout du revendeur. Veuillez réessayer.';
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
