import { Season } from './entities/season';
import { Component, OnInit } from '@angular/core';
import { SeasonsService } from './services/seasons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  activeSeason: Season;

  constructor(
    private seasonsService: SeasonsService
  ) {

  }

  ngOnInit() {
    this.seasonsService.getActiveSeason().subscribe( (res) => {
      this.activeSeason = res;
    }, (err) => {
      console.log(err);
    })
  }

}
