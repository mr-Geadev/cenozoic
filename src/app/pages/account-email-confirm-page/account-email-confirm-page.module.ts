import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AccountEmailConfirmPageComponent} from './account-email-confirm-page.component';


@NgModule({
    declarations: [
        AccountEmailConfirmPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {path: 'account-email-confirm-page/:token', component: AccountEmailConfirmPageComponent},
        ]),
        CommonModule,
        HttpClientModule

    ],
    exports: [AccountEmailConfirmPageComponent]
})
export class AccountEmailConfirmPageModule {
}
