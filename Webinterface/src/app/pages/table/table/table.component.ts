import { TableService } from './../../../services/table.service';
import { TableUser } from './../../../entities/tableuser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableTableComponent implements OnInit {
  displayedColumns: string[] = [ 'pos', 'name', 'points', 'matchesPlayed', 'wins', 'ties', 'losses', 'goalDiff'];
  dataSource: TableUser[] = [];
  constructor(
    private tableService: TableService
    ) { }

  ngOnInit() {
    console.log(this.tableService);
    this.tableService.getAll().subscribe( (res) => {
      this.dataSource = res;
    }, (err) => {
      console.log(err);
    })
  }
}
