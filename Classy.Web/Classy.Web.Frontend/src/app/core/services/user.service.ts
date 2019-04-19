import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_PATH = environment.API_PATH;

  constructor(
    private http: HttpClient
  ) { }

  getCookieWithUserId() {
    return this.http.get(`${this.API_PATH}/request-id`);
  }

}
