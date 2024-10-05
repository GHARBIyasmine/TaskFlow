import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SidenavbarService } from '../../layout/sidenavbar/services/sidenavbar.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent {
  sidenavbarWidth$!: Observable<boolean> ; 

  constructor(private sidenavbarService: SidenavbarService) {
      this.sidenavbarWidth$ = this.sidenavbarService.collapsed$;
  }
}
