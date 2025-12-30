import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Client } from '../../Models/Client';
import { ClientsService } from '../../Services/clients.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css'
})
export class ModifierComponent {
  
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

  idclient!: string ;
  client!: any;
  clitId!: string;
  docId!:string;

  clients: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ClientsService: ClientsService
  ) {}

  goBack() {
    this.router.navigate(['/client']);
  }

  clearMessage() {
    this.message = '';
  }

  ngOnInit() {   
    this.ClientsService.GetAll().subscribe({
      next: (res) => {
        this.clients = res.data;
        this.idclient = this.route.snapshot.paramMap.get('id')?? '';
        const cli = this.clients.find((cl) => cl.idclient === this.idclient);
        if (cli) {
          this.client = cli;
          this.clitId = cli.id;
          this.docId = cli.documentId;
          console.log(this.docId)
          console.log(this.clitId);
          console.log('Client trouvé :', this.client);

          this.nom = cli.nom;
          this.prenom = cli.prenom;
          this.personneAcontacter = cli.personneAcontacter;
          this.telPersonneAcontacter = cli.telPersonneAcontacter;
          this.tel1 = cli.tel1;
          this.tel2 = cli.tel2;
          this.email = cli.email;
          this.MF = cli.MF;
          this.pays = cli.pays;
          this.ville = cli.ville;
          this.adresse = cli.adresse;
          this.manicipalite = cli.manicipalite;
          this.zone = cli.zone;
          this.note = cli.note;
        } else {
          console.warn('Client introuvable pour ID:', this.idclient);
        }

  }});
    
  }
  onUpdate()
  {

    if (!this.nom.trim()) {
      this.message = 'Le nom est obligatoire';
      return;
    }

    if (!this.telPersonneAcontacter.trim()) {
      this.message = 'Le téléphone de la personne à contacter est obligatoire';
      return;
    }

    this.isLoading = true;
    this.message = '';


    const client1 = new Client(
      this.idclient,
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
    console.log('Client à modifier:', client1);

    this.ClientsService.updateClient(this.docId,client1).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Client modifié avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/client']); 
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur de modification', err);
        this.message = 'Erreur lors de modification du client. Veuillez réessayer.';
      }
    });


}
    
    
  
}
