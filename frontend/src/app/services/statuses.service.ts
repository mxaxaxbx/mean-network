import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {

  private env: string;

  constructor(
    private http: HttpClient
  ) {
    this.env = environment.APP_URL;
  }

  getAll() {
    return this.http.get(`${ this.env }/api/statuses/list`);
  }

  create(name: string) {
    return this.http.post(`${ this.env }/api/statuses/create`, {name});
  }

  delete(status_id: string) {
    return this.http.delete(`${ this.env }/api/statuses/delete/${ status_id }`);
  }

}
