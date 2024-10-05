import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_ROUTES } from 'src/app/config/app-routes.config';
import { User } from 'src/app/core/models/user.models';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { DeletePopupComponent } from 'src/app/shared/components/delete-popup/delete-popup.component';
import { ReauthenticationPopupComponent } from 'src/app/shared/components/reauthentication-popup/reauthentication-popup.component';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent implements OnInit {
  settingsForm: FormGroup;
  public user: User = {
    email: ''
  };

  private userDataSubscription : Subscription

  constructor(private fb: FormBuilder, 
              private userService: UserService,
              private reAuthDialog: MatDialog,
              private router: Router,
              private authService: AuthService,
              private deleteDialog: MatDialog,
            ) {
    // Initialize form with validators
    this.settingsForm = this.fb.group({
      gmail: ['', [Validators.required, Validators.email]], // Gmail validation
      
    });


    this.userDataSubscription = this.userService.userData$
    .pipe(takeUntilDestroyed())
    .subscribe({
      next: user => {
        this.user.email = user.email
        this.settingsForm.markAsPristine();
        this.openReAuthenticationDialog()

      }
    })
  }

  ngOnInit(): void {
    // Fetch user details and pre-fill the form
    this.userService.getUserDetails().subscribe({
      next: (user) => {
        this.settingsForm.patchValue({
          gmail: user.email
        });
      },
      error: (error) => {
        console.error('Problem: Access failed to API :(', error);
      }
    });
  }

  

  saveChanges(): void {
    if (this.settingsForm.valid) {
      const updatedData = {
        email: this.settingsForm.get('gmail')?.value,
      };
        console.log(updatedData)
      this.userService.updateUserDetails(updatedData).subscribe();
    }
  }

  openReAuthenticationDialog(){
    const reAuthDialogConfig = new MatDialogConfig();
  
    reAuthDialogConfig.disableClose = true;
    reAuthDialogConfig.autoFocus = true;
    reAuthDialogConfig.hasBackdrop = true;
    reAuthDialogConfig.data = {
        message : 'Your credentials have changed',
        
      }
      const dialogRef = this.reAuthDialog.open(ReauthenticationPopupComponent, reAuthDialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.authService.logout();
          this.router.navigate([APP_ROUTES.login]);
        }
      });
  }

  onDeleteAccountClick():void{

    const deleteDialogConfig = new MatDialogConfig();
  
      deleteDialogConfig.disableClose = false;
      deleteDialogConfig.autoFocus = true;
      deleteDialogConfig.hasBackdrop = true;
      deleteDialogConfig.data = {
        type : 'account',
        
      }
      const dialogRef = this.deleteDialog.open(DeletePopupComponent, deleteDialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userService.deleteUserAccount().subscribe({
            next: () => {
              this.authService.logout();
              this.router.navigate([APP_ROUTES.login]);
              
            },
            error: (error) => {
              
              console.error('Failed to delete list');
            }
          });
        }
      });

  }
}