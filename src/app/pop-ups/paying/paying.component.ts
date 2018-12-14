import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PaymentApi } from 'api';

import { LocalizationService } from 'services';

@Component({
  selector: 'paying-modal',
  templateUrl: './paying.component.html',
  styleUrls: ['./paying.component.scss'],
})
export class PayingComponent implements OnInit {

  public dictionary: any = {};
  public wordsDefault: any = null;
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
        res => {
          this.dictionary = res;
          this.wordsDefault = {
            vacancy: {
              title: this.dictionary.PAYING_MODAL_TITLE_VACANCY,
              more: this.dictionary.PAYING_MODAL_VACANCY_MORE,
              one: this.dictionary.PAYING_MODAL_VACANCY_ONE,
            },
            banner: {
              title: this.dictionary.PAYING_MODAL_TITLE_BANNER,
              more: this.dictionary.PAYING_MODAL_BANNER_MORE,
              one: this.dictionary.PAYING_MODAL_BANNER_ONE,
            },
            resume: {
              title: this.dictionary.PAYING_MODAL_TITLE_RESUME,
              more: this.dictionary.PAYING_MODAL_RESUME_MORE,
              one: this.dictionary.PAYING_MODAL_RESUME_ONE,
            },
          };

          this.words = this.wordsDefault[this.data.type];
        },
      );
  }

  buy(): void {
    this.paymentApi.buyCredential(this.data.type, this.payment.value.counter)
      .subscribe(res => {
        this._dialog.closeAll();
      });
  }
}
