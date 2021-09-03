import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public messsage: string;
  public horizontalPosition: MatSnackBarHorizontalPosition;
  public verticalPosition: MatSnackBarVerticalPosition;
  durationInSeconds: number = 2;
  public loginData: UserI;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.clearData();
  }

  ngOnInit(): void {
  }

  login() {
    if( !this.loginData.email || !this.loginData.password ) {
      this.messsage = "Ingrese los datos solicitados";
      this.openSnackBarError();
      return;
    }

    this.userSvc.login( this.loginData ).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.data);
        this.router.navigate(['/listPost']);
        this.clearData();
        
      },
      (err) => {
        console.log(err);
        this.messsage = err.error.message;
        this.openSnackBarError();
        
      }
    )
  }

  openSnackBarError() {
    this.snackbar.open(this.messsage, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-false'],
    });
  }

  clearData() {
    this.loginData = {
      email    : '',
      password : '',
    }
  }

}
