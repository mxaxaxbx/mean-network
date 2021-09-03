import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private env: string;

  constructor(
    private http: HttpClient
  ) {
    this.env = environment.APP_URL;
  }

  create(post: any) {
    return this.http.post(`${ this.env }/api/posts/create`, post);
  }

  getPostStatuses(status_id: string) {
    return this.http.get(`${ this.env }/api/posts/list/status/${status_id}`);
  }
}
