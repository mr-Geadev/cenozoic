import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ChangeCityModalComponent} from './change-city.component';
import {ChangeCityOpen} from './change-city-open.service';
import {ChangeCityClose} from './change-city-close.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [ChangeCityModalComponent],
    entryComponents: [ChangeCityModalComponent],
    providers: [
        ChangeCityOpen,
        ChangeCityClose
    ],
    exports: [ChangeCityModalComponent]
})
export class ChangeCityModule {
}
