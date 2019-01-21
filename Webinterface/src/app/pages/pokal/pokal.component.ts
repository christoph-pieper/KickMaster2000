import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pokal',
  templateUrl: './pokal.component.html',
  styleUrls: ['./pokal.component.css']
})
export class PokalComponent implements OnInit, AfterViewInit {
  minimalData = {
    teams: [
      ['Team 1', 'Team 2'] /* first matchup */,
      ['Team 3', 'Team 4'] /* second matchup */
    ],
    results: [
      [[1, 2], [3, 4]] /* first round */,
      [[4, 6], [2, 1]] /* second round */
    ]
  };

  constructor() {}

  ngOnInit() {
    $('h1').text('test');
  }

  ngAfterViewInit() {
    console.log($('#minimal'));
    /*$('#minimal').bracket({
      init: this.minimalData
    });*/

    // let bla = $('input').daterangepicker();
    // console.log(bla)
  }
}
