import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RevendeurService } from '../../Services2/revendeur.service';
import { Revendeur } from '../../Models/Revendeur';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-rev',
  imports: [CommonModule,FormsModule],
  templateUrl: './modifier-rev.component.html',
  styleUrl: './modifier-rev.component.css'
})
export class ModifierRevComponent {

  nom: string = '';
  responsable: string = '';
  MF: string = '';
  email: string = '';
  telephone: string = '';

  message: string = '';
  isLoading: boolean = false;

  idrev!: string ;
  rev!: any;
  revId!: string;
  docId!:string;

  revendeurs: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private RevendeurService: RevendeurService
  ) {}

  goBack() {
    this.router.navigate(['/revendeur']);
  }

  clearMessage() {
    this.message = '';
  }


  ngOnInit() {   
    this.RevendeurService.GetAll().subscribe({
      next: (res) => {
        this.revendeurs = res.data;
        this.idrev = this.route.snapshot.paramMap.get('id')?? '';
        const revendeur = this.revendeurs.find((rev) => rev.idrevendeur === this.idrev);
        if (revendeur) {
          this.rev = revendeur;
          this.revId = revendeur.id;
          this.docId = revendeur.documentId;
          console.log(this.docId)
          console.log(this.revId);
          console.log('revendeur trouvé :', this.rev);

          this.nom = revendeur.nom;
        this.responsable = revendeur.responsable
          this.email = revendeur.email;
          this.MF = revendeur.MF;
         this.telephone = revendeur.telephone
        } else {
          console.warn('revendeur introuvable pour ID:', this.idrev);
        }

  }});

}


onUpdate()
{
  if (!this.nom.trim()) {
    this.message = 'Le nom est obligatoire';
    return;
  }

  this.isLoading = true;
    this.message = '';

    const reve = new Revendeur(
      this.idrev,
      this.nom,
      this.responsable,
      this.email,
      this.MF,
      this.telephone,
     
    );
    console.log('revendeur à modifier:', reve);

    this.RevendeurService.updateRevendeur(this.docId,reve).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Revendeur modifié avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/revendeur']); 
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur de modification', err);
        this.message = 'Erreur lors de modification du revendeur. Veuillez réessayer.';
      }
    });


}

}
