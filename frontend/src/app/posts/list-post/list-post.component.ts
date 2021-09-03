import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { StatusesService } from 'src/app/services/statuses.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  statuses: any[] = [];

  constructor(
    private postSvc: PostsService,
    private statusSvc: StatusesService
  ) {
    this.getAllStatuses();
  }

  ngOnInit(): void {
  }

  getAllStatuses() {
    this.statusSvc.getAll().subscribe(
      (res: any) => {
        const mapped = res.data.map( status => {
          return {...status, posts: []};
        });
        console.log(mapped);
        
        this.statuses = mapped;        
      }
    )
  }

  getPosts(status_id) {
    this.postSvc.getPostStatuses(status_id).subscribe(
      (res: any) => {
        const status = this.statuses.find( status => status._id === status_id);
        status.posts = res.data;
        
      }
    )
    
  }

  deleteStatus(status_id) {
    this.statusSvc.delete(status_id).subscribe(
      (res) => {
        this.getAllStatuses();
      },
      (err) => {
        console.log(err);
        
      }
    )
  }

}
