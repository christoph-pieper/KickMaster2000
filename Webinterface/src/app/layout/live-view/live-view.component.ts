import { LiveService } from './../../services/websocket/live.service';
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { User } from 'src/app/entities/user';
import * as moment from 'moment';
import { sprintf } from 'sprintf-js';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css'],
  animations: [
    trigger('changeStateBoard', [
      state(
        'hidden',
        style({
          opacity: '0',
          bottom: '-10%',
          transform: 'scale(0.3)'
        })
      ),
      state(
        'shown',
        style({
          opacity: '1',
          bottom: '4px',
          transform: 'scale(1)'
        })
      ),
      transition('*=>hidden', animate('1300ms ease-in-out')),
      transition('*=>shown', animate('1200ms ease-in-out'))
    ]),
    trigger('changeStateProgressbar', [
      state(
        'hidden',
        style({
          right: '100%'
        })
      ),
      state(
        'shown',
        style({
          right: '0%'
        })
      ),
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

  timeValue: number;
  timeLeft;
  gameTime;

  timeIntervalTimer;

  constructor(public liveService: LiveService) {
    this.isOpen = false;
    this.timeValue = 0;
  }

  ngOnInit() {
    this.liveSubscription = this.liveService
      .getMessageObserver()
      .subscribe((msg) => {
        if (msg.action === 'startgame') {
          this.player1 = msg.payload.player1;
          this.player2 = msg.payload.player2;
          this.gameTime = moment.duration(msg.payload.timeInSeconds, 'seconds');
          this.timeLeft = this.gameTime.clone();
          this.setTimer();
          this.isOpen = true;
        } else if (msg.action === 'stopgame') {
          this.clearTimer();
          this.isOpen = false;
        }
      });
  }

  ngAfterViewInit() {

  }

  setTimer() {
    this.clearTimer();
    this.calcTimeValue();
    this.timeIntervalTimer = window.setInterval(() => {
      this.calcTimeValue();
    }, 1000);
  }

  clearTimer() {
    window.clearInterval(this.timeIntervalTimer);
    this.timeValue = 0;
  }

  ngOnDestroy() {
    this.liveSubscription.unsubscribe();
    this.clearTimer();
  }

  calcTimeValue() {
    if (this.timeLeft.asSeconds() > 0) {
      this.timeLeft.subtract(1, 'seconds');
      this.timeValue = ((this.gameTime - this.timeLeft) / this.gameTime) * 100;
    } else {
      this.isOpen = false;
      this.clearTimer();
    }
  }
}
