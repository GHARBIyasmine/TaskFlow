import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { reAthenticatePopupInfo } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-reauthentication-popup',
  templateUrl: './reauthentication-popup.component.html',
  styleUrl: './reauthentication-popup.component.css'
})
export class ReauthenticationPopupComponent {
 constructor(
  @Inject(MAT_DIALOG_DATA) public data: reAthenticatePopupInfo

 ){}
}
