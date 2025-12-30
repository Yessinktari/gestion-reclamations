import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../Services2/services.service';
import { Service } from '../../Models/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-serv',
  imports: [CommonModule,FormsModule],
  templateUrl: './modifier-serv.component.html',
  styleUrl: './modifier-serv.component.css'
})
export class ModifierServComponent {

  nom: string = '';
  montant: string = '';
  TVA:string = '';
  remise: string = '';
  prixTOT: string = '';
  partTech: string = '';
  partESE: string = '';

  services: any[] = [];
  idservice='';
  service!: any;
  servId!: string;
  docId!:string;

  isLoading = false;
  message='';

  constructor(private router: Router, private route: ActivatedRoute, private ServicesService:ServicesService) {}

  goBack() {
    this.router.navigate(['/service'])
  }


  ngOnInit() {   
    this.ServicesService.GetAll().subscribe({
      next: (res) => {
        this.services = res.data;
        this.idservice = this.route.snapshot.paramMap.get('id')?? '';
        const serv = this.services.find((serv) => serv.idservice === this.idservice);
        if (serv) {
          this.service = serv;
          this.servId = serv.id;
          this.docId = serv.documentId;
          console.log(this.docId)
          console.log(this.servId);
          console.log('service trouvé :', this.service);

          this.nom = serv.nom;
          this.montant=serv.montant;
          this.TVA=serv.TVA;
          this.remise=serv.remise;
          this.prixTOT=serv.prixTOT;
          this.partTech=serv.partTech;
          this.partESE=serv.partESE;
        } else {
          console.warn('service introuvable pour ID:', this.idservice);
        }
  }});
    
  }


  onUpdate()
  {
    console.log('onUpdate() appelé');
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

   
    const serv = new Service(this.idservice,this.nom,String(this.montant),
    String(this.TVA),
    String(this.prixTOT),
    String(this.remise),
    String(this.partTech),
    String(this.partESE));

    console.log('service à modifier:', serv);
    this.ServicesService.updateService(this.docId,serv).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse du serveur:', response);
        Swal.fire({
          title: 'Succès',
          text: 'Service Modifié avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/service']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur d\'ajout', err);
        this.message = 'Erreur lors de la Modification de service. Veuillez réessayer.';
      }
    });
  }


  clearMessage() {
    this.message = '';
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

}
