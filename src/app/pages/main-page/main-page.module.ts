import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {LoginModalModule} from '../../modals';
import {MainPageComponent} from './main-page.component';
import {LastAddedModule} from './last-added';
import {LastNewsModule} from './last-news';
import {MainContentModule} from './main-content';
import {MainPartnersModule} from './main-partners';
import {MainBannerModule} from './main-banner';

@NgModule({
    declarations: [
        MainPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {path: '', component: MainPageComponent, pathMatch: 'full'},
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        LoginModalModule,

        // Blocks
        LastAddedModule,
        LastNewsModule,
        MainBannerModule,
        MainContentModule,
        MainPartnersModule,
    ],
    exports: [MainPageComponent]
})
export class MainPageModule {
}
