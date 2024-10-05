
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './config/app-routes.config';

import { DashboardViewComponent } from './view/dashboard-view/dashboard-view.component';
import { Nf404Component } from './view/error-view/nf404/nf404.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginViewComponent } from './view/auth-view/login-view/login-view.component';
import { RegisterViewComponent } from './view/auth-view/register-view/register-view.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';




const routes: Routes = [

  { path: APP_ROUTES.login, component: LoginViewComponent },
  { path: APP_ROUTES.register, component: RegisterViewComponent },
  { path: APP_ROUTES.dashboard, component: DashboardViewComponent, 
    canActivateChild: [authGuard],
  children: 
    [   { path: '', redirectTo: APP_ROUTES.list, pathMatch: 'full' }, 
        { path: APP_ROUTES.list, component: ListPageComponent },
        { path: APP_ROUTES.settings, component: SettingsPageComponent  },
    ]
  },
  
  { path: '**' , component:Nf404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
