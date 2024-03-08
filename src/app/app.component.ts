import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'candidateInfoApp';
  // showHeader: boolean = true;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  closeSidenav(): void {
    this.sidenav.close();
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  constructor(private router: Router) {
    // Subscribe to route changes
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       // Check if the current route is 'login' to hide the header
  //       this.showHeader = !(event.url === '/login' || event.url === '/createAccount');
  //       // this.showHeader = (event.url !== "/createAccount");
  //     }
  //   });
  }
}
