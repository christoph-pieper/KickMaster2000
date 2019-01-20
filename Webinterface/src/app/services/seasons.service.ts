import { Season } from './../entities/season';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
    ) { }

  getAllSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(this.apiUrl + 'api/v1/seasons');
  }

  getArchivedSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(this.apiUrl + 'api/v1/seasons', { params: { archived: 'true' }});
  }

  getActiveSeason(): Observable<Season> {
    return this.http.get<Season>(this.apiUrl + 'api/v1/seasons', { params: { activeOnly: 'true' }});
  }

  saveSeason(season: Season): Observable<Season> {
    if(season._id) {
      return this.http.put<Season>(this.apiUrl + 'api/v1/seasons/' + season._id, season);
    } else {
      return this.http.post<Season>(this.apiUrl + 'api/v1/seasons', season);
    }
  }
}
