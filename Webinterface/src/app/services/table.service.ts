import { Match } from './../entities/match';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { TableUser } from './../entities/tableuser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<TableUser[]> {
    return this.http.get<TableUser[]>(this.apiUrl + 'api/v1/table');
  }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl + 'api/v1/table/matches');
  }
}
