import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { LocalizationService } from "../../services";

import { ChangeCityModalService } from "./change-city.service";

@Component({
    selector: 'change-city-modal',
    templateUrl: './change-city.component.html',
    styleUrls: ['./change-city.component.scss']
})
export class ChangeCityModalComponent implements OnInit {

    public showContextMenu: boolean = false;
    public currentCity: string = '';
    public cities: any[] = [];
    public dictionary: any = null;

    private _locations: any[] = [];

    constructor(private dialogRef: MatDialogRef<any>,
                private cityModalService: ChangeCityModalService,
                private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {

        this.dictionary = this._localizationService.currentDictionary

        this.currentCity = this.cityModalService.getCurrentCity();
        this.cityModalService.getLocations()
            .subscribe((locations: any) => {
                this._locations = locations.data.map(item => item.name);
            });
    }

    public update(value: string): void {
        if (value) {
            // Transform word to normal form
            // Example: сарАтов --> Саратов
            const localValueArray: string[] = Array.from(value.toLocaleLowerCase());
            localValueArray[0] = localValueArray[0].toLocaleUpperCase();
            const localValue: string = localValueArray.join('');

            this.cities = this._locations
                .filter(city => city.indexOf(localValue) === 0);
            this.showContextMenu = this.cities.length > 0;
        }
    }

    public selectCity(city: string): void {
        this.dialogRef.close(city);
    }
}
