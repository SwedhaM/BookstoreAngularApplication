
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SignUpData, LoginData } from '../data-type';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoggerService } from '../logger/logger.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authRole: string = 'user';
  showLogin: boolean = true;
  errorMessage: string = '';
  LoginerrorMessage: string = '';

  SignUpData: SignUpData = {
    email: '',
    password: '',
    role: '',
    name: '',
    confirmpassword: '',
    address: '',
    phonenumber: ''
  };

  loginData: LoginData = {
    email: '',
    password: '',
    role: ''
  };

  constructor(private logger: LoggerService,private authService: AuthService, private router: Router) {


    // Check if the user or seller is already logged in
    if (this.authService.currentUserValue || this.authService.currentSellerValue) {
      if (this.authService.currentSellerValue) {
        this.router.navigate(['/seller-home']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  signup() {
    this.SignUpData.role = this.authRole;
    this.authService.signup(this.SignUpData, this.authRole).subscribe(
      result => {
        // Handle successful signup
        console.log(result);
        if (this.authRole === 'user') {
          this.router.navigate(['/']);
        } else if (this.authRole === 'seller') {
          this.router.navigate(['/seller-home']);
        }
        Swal.fire({
          icon: 'success',
          title: 'Sign-in Successful',
          text: 'You have successfully Signed in.',
          timer: 2000, // Automatically close after 2 seconds
          showConfirmButton: false
        });
        this.logger.log('Signup successful.');
      },
      error => {
        // Handle signup error
        console.log(error);
        if (error.status === 400 && error.error === environment.errorMessage.duplicateEmail) {
          // Display error message for duplicate email
          this.errorMessage=environment.errorMessage.duplicateEmail;
          Swal.fire('Error', this.errorMessage, 'error');
        }
        else if (error.status === 400 && error.error === environment.errorMessage.passwordMismatch) {
          // Display error message for duplicate email
          this.errorMessage=environment.errorMessage.passwordMismatch;
          Swal.fire('Error', this.errorMessage, 'error');
        } else {
          // Display a generic error message
          this.errorMessage=environment.errorMessage.unknownError;
          Swal.fire('Error', this.errorMessage, 'error');
        }
      }
    );
  }

  login() {
    this.loginData.role = this.authRole;
    this.authService.login(this.loginData, this.authRole).subscribe(
      result => {
        // Handle successful login
        //console.log(result);
        this.logger.log(result);
        if (this.authRole === 'user') {
          this.router.navigate(['/']);
        } else if (this.authRole === 'seller') {
          this.router.navigate(['/seller-home']);
        }
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in.',
          timer: 2000, // Automatically close after 2 seconds
          showConfirmButton: false
        });
        this.logger.log('Login successful.');
      },
      error => {
        // Handle login error
        //console.log(error);
        this.logger.error(error);
        if (error.status === 401 && error.error === environment.LoginerrorMessage.invalidMessage) {
          // Display error message for invalid email or password
          this.LoginerrorMessage=environment.LoginerrorMessage.invalidMessage;
          Swal.fire('Error', this.LoginerrorMessage, 'error');
        } else {
          // Display a generic error message
          this.LoginerrorMessage =environment.LoginerrorMessage.unknownError;
          Swal.fire('Error', this.LoginerrorMessage, 'error');
        }
      }
    );
  }



  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}




      // this.authService.currentUserValue.subscribe((user: { name: string; email: string; password: string; confirmpassword: string; address: string; phonenumber: string; }) => {
      //   if (user) {
      //     this.SignUpData.name = user.name;
      //     this.SignUpData.email = user.email;
      //     this.SignUpData.password = user.password;
      //     this.SignUpData.confirmpassword = user.confirmpassword;
      //     this.SignUpData.address = user.address;
      //     this.SignUpData.phonenumber = user.phonenumber;
      //     // Add more fields here if needed
      //   }
      // });
