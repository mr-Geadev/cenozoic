import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ConfirmComponent} from './confirm.component';
import {ReqConfirmService} from './req-confirm.service';
import {ResConfirmService} from './res-confirm.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [ConfirmComponent],
    entryComponents: [ConfirmComponent],
    providers: [
        ReqConfirmService,
        ResConfirmService,
    ],
    exports: [ConfirmComponent]
})
export class ConfirmModule {
}
