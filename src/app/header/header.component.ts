import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})

export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    private _authService : AuthService,
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
    this._authService.logout();
    this.router.navigate(['/signin']);
  }
}
