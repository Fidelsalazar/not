import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private subscription: Subscription = new Subscription();

  loginForm: FormGroup;

  isLogged: boolean = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedInStatus) => {
      this.isLogged = loggedInStatus;
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(() => {
        this.isLogged = true;
        this.cdr.detectChanges();
        this.router.navigate(['/dashboard']);
      });
    }
  }

  register() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.subscription = this.authService
        .register(username, password, 'user')
        .subscribe({
          next: (response) => {
            console.log('Registro exitoso', response);
          },
          error: (error) => {
            console.error('Error en el registro', error);
          },
        });
    }
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
