import {Directive, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Directive({
  selector: '[appAuthMatchPassword]'
})
export class AuthMatchPasswordDirective {
  @Input('appPasswordMatch') passwordToMatch!: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    const confirmPassword = control.value;
    const passwordControl = control.root.get(this.passwordToMatch);

    if (passwordControl && confirmPassword !== passwordControl.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }
}
