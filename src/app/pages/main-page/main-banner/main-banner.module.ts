import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MainBannerComponent} from './main-banner.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [MainBannerComponent],
    exports: [MainBannerComponent]
})
export class MainBannerModule {
}