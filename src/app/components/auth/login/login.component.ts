import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    
  ],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  
  constructor() {}
  
  login(credentials: CredentialsDto) {
    this.authService.login(credentials).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['home']);
          console.log('Login success');
          this.toastr.success(`Bienvenu chez vous :)`);
        }
      },
      error: (error) => {
        this.toastr.error('Veuillez vérifier vos credentials');
        console.error(error);
      },
    });
  }
}
