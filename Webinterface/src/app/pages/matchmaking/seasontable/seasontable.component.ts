import { MatchmakingService } from './../../../services/matchmaking.service';
import { ModifySeasonComponent } from './../../../dialogs/modify-season/modify-season.component';
import { MatCheckboxChange, MatDialog, MatTableDataSource } from '@angular/material';
import { Season } from './../../../entities/season';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeasonsService } from 'src/app/services/seasons.service';

@Component({
  selector: 'app-seasontable',
  templateUrl: './seasontable.component.html',
  styleUrls: ['./seasontable.component.css']
})
export class SeasontableComponent implements OnInit {

//  @Input() seasons: Season[];

  @Input() archived: boolean = false;

  @Output()
  onArchive: EventEmitter<Season> = new EventEmitter<Season>();

  @Output()
  onUnarchive: EventEmitter<Season> = new EventEmitter<Season>();

  dataSource: MatTableDataSource<Season> =  new MatTableDataSource();

  displayedSeasonsColumns = ['id', 'name', 'current', 'initialized', 'closed', 'edit', 'archive'];

  constructor(
    public dialog: MatDialog,
    private matchmakingService: MatchmakingService,
    private seasonsService: SeasonsService
    ) { }

  ngOnInit() {
  }

  @Input()
  set seasons (seasons: Season[]) {
    this.dataSource.data = seasons;
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    console.log('Season Array set');
  }

  activateSeason(event: MatCheckboxChange, season: Season) {
    if(event.checked) {
      if(window.confirm('Wenn Sie diese Saison als aktiv setzen, werden alle anderen Saisons auf ' +
      'passiv gesetzt.')) {
        this.putSeason(season);
      } else {
        setTimeout( () => {
          season.current = false;
        }, 0);
      }
    }
  }

  putSeason(season: Season) {
    this.seasonsService.saveSeason(season).subscribe( (res) => {
      season = res;
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
      console.log(res);
    });
  }

  archiveSeason(season: Season) {
    season.archived = true;
    this.putSeason(season);
    this.onArchive.emit(season);
  }

  trackingFunction(index: number, item: Season) {
    return item._id;
  }
}
