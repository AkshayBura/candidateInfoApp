import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})

export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    // private _authService : AuthService,
    private router: Router
    ){}

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
  viewProfile() {
    console.log('View profile clicked');
  }

  signOut() {
    console.log('Sign out clicked');
    sessionStorage.removeItem('Authtoken')
    sessionStorage.removeItem('LoginData')
    this.router.navigate(['/signin']);
  }
}
