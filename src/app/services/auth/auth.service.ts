import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../config';
import { AuthGuard } from '../../core/guards/auth/auth.guard';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    console.log(`${environment.apiUrl}/auth/login`);

    return this.http
      .post(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((response) => {
          console.log(response)
          localStorage.setItem(
            'userData',
            JSON.stringify(response)
          )
          this.loggedIn.next(true);
          this.router.navigate(['/dashboard']);

          const userDataString = localStorage.getItem('userData');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            console.log('Datos en caché:', userData);
          } else {
            console.log('No hay datos en caché para userData');
          }
        })
      );
  }

  register(username: string, password: string, rol: string): Observable<any> {
    const user = { username, password, rol };
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  isLoggedIn() {
    console.log(this.loggedIn);
    return this.loggedIn.asObservable();
  }

  logout() {
    // Lógica de cierre de sesión
    localStorage.clear();
    this.setLoggedIn(false);
    this.router.navigate(['/']);
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }
}
