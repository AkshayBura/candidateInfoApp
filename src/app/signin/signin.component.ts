import { Component } from '@angular/core';
import { SignIn } from '../form.model';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { CoreService } from '../core/core.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor( private route: Router, private _userService: UserService, private _authService: AuthService, private _coreService: CoreService ) {  }

  signInModel: SignIn = {
    userEmail: '',
    password: ''
  }

  isValidForm(): {isValid: boolean, errMess: string}{
    let isValid = true;
    let errMess = '';

    if (this.signInModel.userEmail == '') {
      errMess = 'Please enter an email';
      isValid = false;
    } else if (!this.signInModel.userEmail || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,4}$/.test(this.signInModel.userEmail)) {
      errMess = 'Please enter a valid Email Address.';
      isValid = false;
    } else if (!this.signInModel.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(this.signInModel.password)){
      errMess = "Password must be between 8 and 20 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
      isValid = false;
    }

    return {isValid, errMess}
  }

  login(){
    const {isValid, errMess} = this.isValidForm();
    if (isValid) {
      this._userService.loginUser(this.signInModel).subscribe({
        next: (res: any) => {
          this._coreService.openSnackBar('LoggedIn Successfully', 'Success')
          this._authService.saveLoginData(res)
          this._authService.saveToken(res.accessToken)
          this.route.navigate(['/details'])
        },
        error: (err: any) => {
          this._coreService.openSnackBar(`${err.error}`, 'Failed')
          console.error(err);
        }
      })
    }
    else {
      this._coreService.openSnackBar(`${errMess}`, 'Failed')
    }
  }

  register() {
    this.route.navigate(['/signup'])
  }
}
