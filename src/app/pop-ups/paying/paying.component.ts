import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PaymentApi } from 'api';

import { LocalizationService } from 'services';

const WORDS = {
  vacancy: {
    title: 'вакансии',
    more: 'вакансий',
    one: 'вакансия',
  },
  banner: {
    title: 'баннеры',
    more: 'баннеров',
    one: 'баннер',
  },
  resume: {
    title: 'резюме',
    more: 'резюме',
    one: 'резюме',
  },
};

@Component({
  selector: 'paying-modal',
  templateUrl: './paying.component.html',
  styleUrls: ['./paying.component.scss'],
})
export class PayingComponent implements OnInit {

  public dictionary: any = {};
  public words: any = null;

  public payment: FormGroup = new FormGroup({
    counter: new FormControl(0, [Validators.required]),
  });

  constructor(private _dialog: MatDialog,
              private paymentApi: PaymentApi,
              private _localizationService: LocalizationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    this.words = WORDS[this.data.type];
  }

  buy(): void {
    this.paymentApi.buyCredential(this.data.type, this.payment.value.counter)
      .subscribe(res => {
        this._dialog.closeAll();
      });
  }
}
