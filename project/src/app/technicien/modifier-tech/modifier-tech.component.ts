import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnicienService } from '../../Services2/technicien.service';
import { Technicien } from '../../Models/Technicien';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-tech',
  imports: [CommonModule,FormsModule],
  templateUrl: './modifier-tech.component.html',
  styleUrl: './modifier-tech.component.css'
})
export class ModifierTechComponent {


   
  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  adresse: string = '';
  nomSociete:string='';
  email: string = '';
  MF: string = '';

  message: string = '';
  isLoading: boolean = false;

  idtechnicien!: string ;
  tech!: any;
  techId!: string;
  docId!:string;

  techs: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private TechnicienService: TechnicienService
  ) {}

  goBack() {
    this.router.navigate(['/technicien']);
  }


  ngOnInit() {   
    this.TechnicienService.GetAll().subscribe({
      next: (res) => {
        this.techs = res.data;
        this.idtechnicien = this.route.snapshot.paramMap.get('id')?? '';
        const te = this.techs.find((t) => t.idtechnicien === this.idtechnicien);
        if (te) {
          this.tech = te;
          this.techId = te.id;
          this.docId = te.documentId;
          console.log(this.docId)
          console.log(this.techId);
          console.log('Client trouvé :', this.tech);

          this.nom = te.nom;
          this.prenom = te.prenom;
          this.telephone = te.telephone;
          this.adresse = te.adresse;
          this.nomSociete = te.nomSociete;
          this.email = te.email;
          this.MF = te.MF;
         
        
        } else {
          console.warn('technicien introuvable pour ID:', this.idtechnicien);
        }

  }});
    
  }


  onUpdate() {
    console.log('onUpdate() appelé');
    if (!this.nom.trim()) {
      this.message = 'Le nom est obligatoire';
      return;
    }

    if (this.email && !this.isValidEmail(this.email)) {
      this.message = 'Format d\'email invalide';
      return;
    }

    this.isLoading = true;
    this.message = '';

    const tech = new Technicien(
      this.idtechnicien,
      this.nom,
      this.prenom,
      this.telephone,
      this.adresse,
      this.nomSociete,
      this.email,
      this.MF);

    console.log('Technicien à modifié:', tech);

    this.TechnicienService.updateTechnicien(this.docId,tech).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Technicien Modifié avec succès !',
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
