import { Component, Inject, OnInit } from '@angular/core';
import { ChangeCityClose } from './change-city-close.service';
import { City, Locations } from './cities.models';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LocalizationService } from '../../services';

@Component({
  selector: 'change-city-modal',
  templateUrl: './change-city.component.html',
  styleUrls: ['./change-city.component.scss'],
})
export class ChangeCityModalComponent implements OnInit {

  public inputField: string = '';
  public popularCities: City[] = [];
  public dictionary: any = {};
  public showContextMenu: boolean = false;

  constructor(private _closeModal: ChangeCityClose,
              private _localizationService: LocalizationService,
              @Inject(MAT_DIALOG_DATA) public data: Locations) {
  }

  ngOnInit(): void {
    this.popularCities = this.data.listCity.slice(0, 5);
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  public onShowContextMenu(): void {
    this.showContextMenu = true;
  }

  public offShowContextMenu(): void {
    this.showContextMenu = false;
  }

  public updatePopularCity(): void {
    this.popularCities = this.data.listCity
      .filter((city) =>
        city.name.toLocaleLowerCase().indexOf(this.inputField.toLocaleLowerCase()) > -1,
      )
      .slice(0, 5);
  }

  public selectCity(cityCode: number) {
    this.offShowContextMenu();
    this._closeModal.setCity(
      this.data.getCityToCode(cityCode),
    );
  }
}
