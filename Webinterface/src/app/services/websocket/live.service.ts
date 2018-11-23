import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LiveService {

  private messages: Subject<WebsocketMessage>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>this.wsService.connect();
   }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }

  getMessageObserver (): Observable<WebsocketMessage> {
    return this.messages.asObservable();
  }

}

export interface WebsocketMessage {
  action: string;
  payload: any;
}
