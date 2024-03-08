import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'] 
})

export class SidenavComponent {
  mode: MatDrawerMode = 'side';
  showAddTaskLink: boolean = false;

  ngOnInit() {
    this.getUserforManagers();
  }

  getUserforManagers() {
    // const logindata = retrieveUserDataFromLocalStorage();

    // // Check if the user ID is 2
    // if (logindata.user.userRoleId === 2) {
    //   this.showAddTaskLink = true; // Set to true to display the link
    // }
  }
}
