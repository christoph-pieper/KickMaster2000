import { LiveService } from './../../services/websocket/live.service';
import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { User } from 'src/app/entities/user';

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
export class LiveViewComponent implements OnInit, AfterViewInit, OnDestroy {

  apiUrl = environment.apiUrl;

  isOpen: boolean;
  liveSubscription: Subscription;

  player1: User;
  player2: User;

  constructor(
    public liveService: LiveService
  ) {
    this.isOpen = false;
  }

  ngOnInit() {
    this.liveSubscription = this.liveService.getMessageObserver().subscribe( (msg) => {
      if (msg.action === 'startgame') {
        this.isOpen = true;
        this.player1 = msg.payload.player1;
        this.player2 = msg.payload.player2;
      } else if (msg.action === 'stopgame') {
        this.isOpen = false;
      }
    });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.liveSubscription.unsubscribe();
  }

}
