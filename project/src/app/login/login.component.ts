import { Component } from '@angular/core';
import { LoginServicesService } from '../Services/login-services.service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule,HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private LoginServicesService: LoginServicesService, private router: Router) {}

  onLogin() {
    this.LoginServicesService.login(this.email, this.password).subscribe({
      next: (users) => {
        const user = users.data.find((u: any) =>
          u.email === this.email && u.password === this.password
        );
  
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/client']);
          this.errorMessage = 'Connexion réussie.';
        } else {
          this.errorMessage = 'Identifiants incorrects.';
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        this.errorMessage = 'Erreur serveur.';
      }
    });
  }

}
