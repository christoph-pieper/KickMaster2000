import { SeasonsService } from './../../services/seasons.service';
import { Season } from './../../entities/season';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Optional, Inject } from '@angular/core';

@Component({
  selector: 'app-modify-season',
  templateUrl: './modify-season.component.html',
  styleUrls: ['./modify-season.component.css']
})
export class ModifySeasonComponent implements OnInit {

  headline = '';

  constructor(
    public dialogRef: MatDialogRef<ModifySeasonComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public season: Season,
    private seasonsService: SeasonsService
    ) {
      if (!season) {
        this.season = new Season();
        this.headline = 'Neue Saison anlegen';
      } else {
        this.headline = 'Saison editieren';
      }
    }

  ngOnInit() {
  }

  onSave() {
    if( this.season.name ) {
      this.seasonsService.saveSeason(this.season).subscribe( (res) => {
        this.dialogRef.close(res);
      }, (err) => {
        console.log(err);
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
