import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {FormsModule} from "@angular/forms";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';





import { BreadcrumbsModule } from '@exalif/ngx-breadcrumbs';

import { ListComponent } from './shared/components/list/list.component';
import { SidenavbarComponent } from './layout/sidenavbar/sidenavbar.component';
import { MatDialogModule } from '@angular/material/dialog';

import {MatSelectModule} from '@angular/material/select';
import { DashboardViewComponent } from './view/dashboard-view/dashboard-view.component';
import { Nf404Component } from './view/error-view/nf404/nf404.component';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ReactiveFormsModule} from "@angular/forms";


import { environment } from 'src/environement';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { DatePipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { RegisterViewComponent } from './view/auth-view/register-view/register-view.component';
import { LoginViewComponent } from './view/auth-view/login-view/login-view.component';

import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { DeletePopupComponent } from './shared/components/delete-popup/delete-popup.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { TaskComponent } from './pages/components/task/task.component';

import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AddTaskpopupComponent } from './pages/components/popup/add-taskpopup/add-taskpopup.component';
import { EditTaskpopupComponent } from './pages/components/popup/edit-taskpopup/edit-taskpopup.component';
import { ReauthenticationPopupComponent } from './shared/components/reauthentication-popup/reauthentication-popup.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
  declarations: [
    AppComponent,
    SidenavbarComponent,
    ListComponent,
   
   
    DashboardViewComponent,
    Nf404Component,
    LoginViewComponent,
    RegisterViewComponent,
    DeletePopupComponent,
    SettingsPageComponent,
    ListPageComponent,
    TaskComponent,
    AddTaskpopupComponent,
    EditTaskpopupComponent,
    ReauthenticationPopupComponent,
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BreadcrumbsModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    HttpClientModule,

    //Angualr Material imports
    
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRippleModule,
    MatTooltipModule,
    MatSidenavModule,

    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    
    // BreadcrumbModule,
    BreadcrumbComponent, BreadcrumbItemDirective,

    MatCardModule,
    

    // firebase imports 
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideStorage(() => getStorage()),

    

  ],
  providers: [DatePipe,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideAnimationsAsync(),],
  bootstrap: [AppComponent]
})
export class AppModule { }
