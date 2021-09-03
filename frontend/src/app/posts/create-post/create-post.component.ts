import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { StatusesService } from 'src/app/services/statuses.service';
import { 
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  post: any;
  status: string;
  formCtrl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  public horizontalPosition: MatSnackBarHorizontalPosition;
  public verticalPosition: MatSnackBarVerticalPosition;
  durationInSeconds: number = 2;

  constructor(
    private statusSvc: StatusesService,
    private postSvc: PostsService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.clearData();
    this.getStatuses();
  }

  ngOnInit(): void {
    this.filteredOptions = this.formCtrl.valueChanges
      .pipe(
        startWith(''),
        map( value => this._filter(value))
      );
  }

  setFiltered() {
    this.filteredOptions = this.formCtrl.valueChanges
      .pipe(
        startWith(''),
        map( value => this._filter(value))
      );
  }

  clearData() {
    this.post = {
      title: '',
      text: '',
      status_id: '',
    }
  }

  getStatuses() {
    this.statusSvc.getAll().subscribe(
      (res:any) => {
        this.options = res.data;
        this.setFiltered();
        
        
      },
      (err) => {
        console.log(err);
        
      }
    )
  }

  private _filter(value: string ): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter( option => option.name.toLowerCase().includes(filterValue) );
  }

  async save() {
    if( !this.post.title || !this.status ) return this.openSnack('complete todos los datos');
    
    this.validateStatus( this.status )

    setTimeout(() => {
      this.postSvc.create( this.post ).subscribe(
        (res: any) => {
          console.log(res);
          this.openSnack('post creado');
          this.router.navigate(['/listPost']);
          this.clearData();
        },
        (err: any) => {
          console.log(err);
          this.openSnack(err.error.message);
        }
      );

    },1000);

    

  }

  validateStatus(name: string) {
    const lowerName = name.toLowerCase();
    const exist = this.options.find(option => option.name.toLowerCase() === lowerName );
    console.log(exist);
    console.log(name);

    if( exist ) {
      this.post.status_id = exist._id;
      return true;
    }
      
    return this.statusSvc.create(name).subscribe(
      (res: any) => {
        this.post.status_id = res.data._id;
        return true;
      },
      (err: any) => {
        console.log(err);
        this.openSnack(err.error.message);
        return false;
      }
    );
  }

  openSnack(message: string) {
    this.snackbar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

}
