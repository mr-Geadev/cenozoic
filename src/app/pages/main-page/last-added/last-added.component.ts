import { Component, OnInit } from '@angular/core';

import { LocalizationService } from '../../../services/index';

@Component({
  selector: 'last-added',
  templateUrl: './last-added.component.html',
  styleUrls: ['./last-added.component.scss'],
})
export class LastAddedComponent implements OnInit {
  public dictionary: any = null;
  public type: string = 'resume'; // vacancy
  public offset: number = 0;


  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;
  }

  setType(newType) {
    this.offset = 0;
    this.type = newType;
  }

  addOffset() {
    if (this.offset < 6) {
      this.offset++;
    }
  }

  removeOffset() {
    if (this.offset > 0) {
      this.offset--;
    }
  }

  setOffset(offset) {
    this.offset = offset;
  }
}
