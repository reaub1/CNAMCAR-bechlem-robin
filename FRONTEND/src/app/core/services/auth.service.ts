import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthApiService } from './auth-api.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private authApiService: AuthApiService) {
    const currentUserData = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(currentUserData ? JSON.parse(currentUserData) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.authApiService.login(username, password).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  register(user: User): Observable<User> {
    return this.authApiService.register(user);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
    console.log('logout')
    this.currentUserSubject.next(null);
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('jwtToken');
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      const now = Date.now() / 1000;

      return decodedToken.exp > now;
    } catch (error) {
      return false;
    }
  }
  isAdmin(): boolean {
    const user = localStorage.getItem('currentUser');

    if (user) {
        try {
            const currentUser = JSON.parse(user);

            if (currentUser.user && typeof currentUser.user.isAdmin === 'boolean') {
                return currentUser.user.isAdmin;
            }
        } catch (e) {
            console.error('Erreur lors de la lecture de currentUser:', e);
        }
    }

    return false;
  }

  getCurrentUser(): User | null {
    if (!this.isTokenValid()) return null;

    const token = localStorage.getItem('jwtToken');
    if (!token) return null; 
    const decodedToken: any = jwtDecode(token);
    return decodedToken;
  }
}
