import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class FaqSocketService {

  private host: string = `http://134.0.119.98:4200`;
  private socket: any;

  constructor() {
    console.log();
    this.socket = io(this.host, {query: {sessionId: document.cookie} });
    this.socket.on('connect', () => this.connected());
    this.socket.on('disconnect', () => this.disconnected());
    this.socket.on('error', (error: string) => {
      console.log(`ERROR: "${error}" (${this.host})`);
    });
  }

  connect () {
    this.socket.connect();
  }
  disconnect () {
    this.socket.disconnect();
  }

  emit(chanel: string, message: any) {
    return new Observable<any>(observer => {
      this.socket.emit(chanel, message, function (data) {
        if (data.success) {
          // Успех
          observer.next(data.msg);
        } else {
          // Что-то пошло не так
          observer.error(data.msg);
        }
        observer.complete();
      });
    });
  }

  on(event_name) {
    return new Observable<any>(observer => {
      this.socket.off(event_name); // Если такое событие уже существует
      this.socket.on(event_name, (data) => {
        observer.next(data);
      });
    });
  }

  // Вызывается при открытии соединения
  private connected() {
    console.log('Connected');
  }
  // Вызывается при закрытии соединения
  private disconnected() {
    console.log('Disconnected');
  }

}
