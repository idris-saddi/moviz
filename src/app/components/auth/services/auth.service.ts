import { Injectable, inject, computed, signal, PLATFORM_ID } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserInfo, UserLogin } from '../dto/user.dto';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() {
    const storedUser = localStorage.getItem(environment.userkey);
    if (storedUser) {
      this.userSignal.set(JSON.parse(storedUser) as UserLogin);
    }
  }

  private readonly userSignal = signal<UserLogin | null>(null);
  user = this.userSignal.asReadonly();
  isAuthenticated = computed<boolean>(() => {
    const user = this.userSignal();
    return user !== null && user.token !== null;
  });

  userInfo = computed<UserInfo | null>(() => {
    const user = this.userSignal();
    return user ? { userId: user.userId, email: user.email } : null;
  });

  login(credentials: CredentialsDto): Observable<UserLogin> {
    return this.http.post<LoginResponseDto>(environment.login_url, credentials).pipe(
      map((response) => {
        console.log(response);
      
        const user: UserLogin = {
          token: response.id,
          created: response.created,
          ttl: response.ttl,
          userId: response.userId,
          email: credentials.email,
        };

        this.userSignal.set(user);
        localStorage.setItem(environment.userkey, JSON.stringify(user));

        return user; // Return the transformed user object
      })
    );
  }

  logout() {
    this.userSignal.set(null);
    localStorage.removeItem(environment.userkey);
  }
}
