import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export class PasswordValidators {

  static passwordMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    const errors = password.value !== confirmPassword.value ? { mustMatch: true } : null;
    confirmPassword.setErrors(errors);

    return errors;
  }

    }
  