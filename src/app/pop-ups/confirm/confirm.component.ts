import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LocalizationService } from 'services/localization.service';
import { ResConfirmService } from './res-confirm.service';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})

export class ConfirmComponent implements OnInit {

  public dictionary: any = {};

  constructor(private _localizationService: LocalizationService,
              private resConfirmService: ResConfirmService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  public accept(): void {
    this.resConfirmService.response.next(true);
  }

  public renouncement(): void {
    this.resConfirmService.response.next(false);
  }
}
