import { environment } from './../../environments/environment';
import { User } from './../entities/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'api/v1/users');
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'api/v1/users', user);
  }

  put(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl + 'api/v1/users/' + user._id, user);
  }

  delete(user: User): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'api/v1/users/' + user._id);
  }

  deleteImage(user_id: string): Observable<User> {
    return this.http.delete<User>(this.apiUrl + 'api/v1/users/' + user_id + '/image');
  }

  deleteAudio(user_id: string): Observable<User> {
    return this.http.delete<User>(this.apiUrl + 'api/v1/users/' + user_id + '/audio');
  }
}
