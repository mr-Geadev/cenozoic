import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MainContentComponent} from './main-content.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [MainContentComponent],
    exports: [MainContentComponent]
})
export class MainContentModule {
}