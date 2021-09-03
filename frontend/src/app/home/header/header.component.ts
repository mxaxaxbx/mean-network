import { Component, OnInit } from '@angular/core';
// services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( public userSvc: UserService) { }

  ngOnInit(): void {
  }

}
