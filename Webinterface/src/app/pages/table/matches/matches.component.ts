import { Match } from './../../../entities/match';
import { TableService } from './../../../services/table.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class TableMatchesComponent implements OnInit {

  matches: Match[] = [];

  constructor(
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.tableService.getAllMatches().subscribe( (res) => {
      this.matches = res;
    }, (err) => {
      console.log(err);
    })
  }

}
