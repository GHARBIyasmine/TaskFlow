import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { APP_ROUTES } from 'src/app/config/app-routes.config';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent {

  registerRedirectPath: string = '/' + APP_ROUTES.register

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login({
        email: form.value.email,
        password: form.value.password
      }).pipe(
        tap(() => this.router.navigate(['/dashboard/']))
      ).subscribe();
    }
  }
}
