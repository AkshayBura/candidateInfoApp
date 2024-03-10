import { Component } from '@angular/core';
import { SignUp } from '../form.model';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpModel: SignUp = {
    userName: '',
    userEmail: '',
    password: ''
  }

  constructor( private _route: Router, private _userService: UserService, private _coreService: CoreService ) {}

  isFormValid(): {isValid: boolean, errorMess: string} {
    let isValid = true;
    let errorMess = '';

    if (this.signUpModel.userName === '' ){
      errorMess = "Please enter a UserName"
      isValid = false;
    } else if (!this.signUpModel.userEmail || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,4}$/.test(this.signUpModel.userEmail)) {
      errorMess = 'Please enter a valid Email Address.';
      isValid = false;
    } else if (!this.signUpModel.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(this.signUpModel.password)){
      errorMess = "Password must be between 8 and 20 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
      isValid = false;
    }
    return {isValid, errorMess};
  }

  createAccount(){
    const {isValid, errorMess} = this.isFormValid();
    if (isValid){
      this._userService.createUser(this.signUpModel).subscribe({
        next: (res: any) => {
          this._coreService.openSnackBar("User created Successfully", "Success");
          // alert(JSON.stringify(res));
          this._route.navigate(['/sigin'])
        },
        error: (err: any) => {
          this._coreService.openSnackBar(`${err.error}`, "Failed")
          console.error(err.error);
        }
      })
    } else {
      this._coreService.openSnackBar(`${errorMess}`, 'Failed')
      console.error(errorMess)
    }
  }

  backtoLogin(){
    this._route.navigate(['/signin'])
  }
}
