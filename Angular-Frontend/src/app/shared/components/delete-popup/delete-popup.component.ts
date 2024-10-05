import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { deletepopupInfo } from 'src/app/core/models/delete.models';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: deletepopupInfo
  ){

  }

  

}
