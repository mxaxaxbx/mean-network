import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
// Material
import { 
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
// interfaces
import { UserI } from 'src/app/interfaces/user';
// services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public messsage: string;
  public horizontalPosition: MatSnackBarHorizontalPosition;
  public verticalPosition: MatSnackBarVerticalPosition;
  durationInSeconds: number = 2;
  public registerData: UserI = {
    name     : '',
    email    : '',
    password : '',
  };

  constructor(
    private userSvc: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.messsage = '';
    this.horizontalPosition = 'end';
    this.verticalPosition = 'top';
  }

  ngOnInit(): void {
  }

  registerUser() {    
    if( !this.registerData.name || !this.registerData.email || !this.registerData.password ) {
      this.messsage = 'Incomplete data';
      this.openSnackBarError();
      this.clearData();
      return;
    }

    this.userSvc.registerUser(this.registerData).subscribe(
      (res: any) => {
        console.log(res);
        // localStorage.setItem('token', res.jwt);
        this.router.navigate(['/login']);
        this.messsage = "User registered success!"
        this.openSnackBarSuccessfull();
        this.clearData();

      },
      (err) => {
        console.log(err.error.response);
        this.messsage = err.response;
        this.openSnackBarError();
        
      }
    )
  }

  clearData() {
    this.registerData = {
      name     : '',
      email    : '',
      password : '',
    };
  }

  openSnackBarSuccessfull() {
    this.snackbar.open(this.messsage, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-true'],
    });
  }

  openSnackBarError() {
    this.snackbar.open(this.messsage, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-false'],
    });
  }

}
