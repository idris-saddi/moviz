import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  title = 'Login';
  constructor() {}
  login(credentials: CredentialsDto) {
    this.authService.login(credentials).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['home']);
          console.log('Login success');
          
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
