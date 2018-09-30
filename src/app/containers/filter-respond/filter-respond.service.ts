import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FilterRespondService {

  private filterSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public filter$: Observable<any> = this.filterSubject.asObservable();

  private _setFilterParameters(parameter: any): void {
    this.filterSubject.next(parameter);
  }

  constructor() {
  }

  public changeForm(value): void {
    this._setFilterParameters(value);
  }
}
