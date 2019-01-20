import { User } from './../../entities/user';
import { ModifySeasonComponent } from './../../dialogs/modify-season/modify-season.component';
import { SeasonsService } from './../../services/seasons.service';
import { Season } from './../../entities/season';
import { Component, OnInit } from '@angular/core';
import { MatchmakingService } from 'src/app/services/matchmaking.service';
import { PlannedMatchday } from 'src/app/entities/plannedMatchday';
import { Event } from '@angular/router';
import { EventEmitter } from 'events';
import { MatCheckboxChange, MatDialog } from '@angular/material';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})
export class MatchmakingComponent implements OnInit {

  matchdays: PlannedMatchday[] = [];

  cupMatches: User[][];

  seasons: Season[] = [];

  archivedSeasons: Season[] = [];

  constructor(
    public dialog: MatDialog,
    private matchmakingService: MatchmakingService,
    private seasonsService: SeasonsService
  ) { }

  ngOnInit() {

    this.seasonsService.getAllSeasons().subscribe( (res) => {
      this.seasons = res;
    }, (err) => {
      console.log(err);
    })
  }

  calcMatches() {
    this.matchmakingService.getTableMatchmaking().subscribe( (res) => {
      this.matchdays = res;
    }, (err) => {
      console.log(err);
    });
    this.matchmakingService.getCupMatchmaking().subscribe( (res) => {
      this.cupMatches = res;
    }, (err) => {
      console.log(err);
    })
  }

  addSeason(season?) {
    const dialogRef = this.dialog.open(ModifySeasonComponent, {
      width: '650px',
      data: season
    });

    dialogRef.afterClosed().subscribe( (res) => {
      if(res) {
        this.seasons.push(res);
      }
    });
  }

  archivedSeason(season) {
    this.seasons.splice(this.seasons.indexOf(season));
    this.archivedSeasons.push(season);
  }


  loadArchivedSeasons() {
    this.seasonsService.getArchivedSeasons().subscribe( (res) => {
      this.archivedSeasons = res;
    }, (err) => {
      console.log(err);
    });
  }

}
