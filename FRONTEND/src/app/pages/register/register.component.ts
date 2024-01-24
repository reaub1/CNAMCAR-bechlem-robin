import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  codepostal: string = '';
  ville: string = '';
  sexe: string = '';
  login: string = '';
  telephone: string = '';
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    const newUser: User = new User(
      0,
      this.username,
      this.email,
      'user',
      this.password,
      '', 
      this.nom,
      this.prenom,
      this.adresse,
      this.codepostal,
      this.ville,
      this.sexe,
      this.login,
      this.telephone,
      this.isAdmin
    );

    this.authService.register(newUser).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Registration failed';
        }
      },
      error => {
        console.error('Registration error', error);
        this.errorMessage = 'Registration failed';
      }
    );
  }
}
