import { Component, OnInit } from '@angular/core';
import { TableUser } from 'src/app/entities/tableuser';
import { TableService } from 'src/app/services/table.service';

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
