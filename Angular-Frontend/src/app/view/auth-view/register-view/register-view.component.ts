import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/config/app-routes.config';
import { AuthService } from 'src/app/core/services/auth.service';
import { PasswordValidators } from 'src/app/core/validators/password.validators';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent {

  loginRedirectPath :string = '/'+ APP_ROUTES.login 
  

  

  constructor(
    private authService: AuthService,
    private router : Router,
  ) {
    
  }

  registerForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl(null, [Validators.required])
  }, 
  
    { validators: PasswordValidators.passwordMatch });

  

    onSubmit(): void {
      if (this.registerForm.valid) {
        const email = this.registerForm.get('email')?.value;
        const password = this.registerForm.get('password')?.value;
  
        this.authService.register({ email, password }).pipe(
          tap(() => this.router.navigate(['../login']))
          )
          .subscribe();
      } else {
        console.log('Form is invalid:', this.registerForm.value);
      }
    }
}