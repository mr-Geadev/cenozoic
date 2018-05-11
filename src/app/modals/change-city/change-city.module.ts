import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ChangeCityModalComponent} from './change-city.component';
import {ChangeCityModalService} from './change-city.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [ChangeCityModalComponent],
    entryComponents: [ChangeCityModalComponent],
    providers: [ChangeCityModalService],
    exports: [ChangeCityModalComponent]
})
export class ChangeCityModalModule {
}
