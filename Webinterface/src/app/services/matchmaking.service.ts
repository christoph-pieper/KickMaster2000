import { environment } from './../../environments/environment';
import { User } from '../entities/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlannedMatchday } from '../entities/plannedMatchday';

@Injectable({
  providedIn: 'root'
})
export class MatchmakingService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
    ) { }

    getTableMatchmaking(): Observable<PlannedMatchday[]> {
      return this.http.get<PlannedMatchday[]>(this.apiUrl + 'api/v1/matchmaking/table');
    }

    getCupMatchmaking(): Observable<User[][]> {
      return this.http.get<User[][]>(this.apiUrl + 'api/v1/matchmaking/cup');
    }
}
