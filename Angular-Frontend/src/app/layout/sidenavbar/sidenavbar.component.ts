import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SidenavbarService } from './services/sidenavbar.service';
import { SVG } from 'src/assets/svg/icons.svg';
import { APP_ROUTES } from 'src/app/config/app-routes.config';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent {
  
  
  
 
  constructor(private router: Router,
              private sanitizer: DomSanitizer,
              private sideNavBarService: SidenavbarService,
              private authService: AuthService,
              private toaster : ToastrService,
              ) {

    
  }


  public activeIndex: number | null = null;
  public isSideBarCollapsed = false;


  togglebtn =  this.sanitizer.bypassSecurityTrustHtml(SVG.arrow);
  public menus = [
        { text: 'Todos',
         icon: this.sanitizer.bypassSecurityTrustHtml(SVG.Clipboard),
         route : APP_ROUTES.list},
  
  ];





  public second_menu = [

    { text: 'Settings',
    icon: this.sanitizer.bypassSecurityTrustHtml(SVG.settings) ,
    route : APP_ROUTES.settings},


  ];

  public logoutButton = { text: 'Log Out',icon: this.sanitizer.bypassSecurityTrustHtml(SVG.logOut)}; 
  toggleSidebar(): void {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
    this.sideNavBarService.setCollapsedState(this.isSideBarCollapsed);
  }



  logout(): void {
    console.log('logout');
    this.authService.logout();
    this.router.navigate([APP_ROUTES.login]);
  }

  

}
