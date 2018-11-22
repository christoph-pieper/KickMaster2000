import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css'],
  animations: [
    trigger('changeState', [
      state('hidden', style({
        opacity: '0',
        bottom: '-10%',
        transform: 'scale(0.3)'
      })),
      state('shown', style({
        opacity: '1',
        bottom: '0%',
        transform: 'scale(1)'
      })),
      transition('*=>hidden', animate('1300ms ease-in-out')),
      transition('*=>shown', animate('1200ms ease-in-out'))
    ])
  ]
})
export class LiveViewComponent implements OnInit, AfterViewInit {

  apiUrl = environment.apiUrl;

  isOpen: boolean;

  constructor() {
    this.isOpen = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.isOpen = true;
    }, 3000);
  }

}
