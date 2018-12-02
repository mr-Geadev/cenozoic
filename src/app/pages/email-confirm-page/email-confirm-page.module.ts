import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EmailConfirmPageComponent} from './email-confirm-page.component';


@NgModule({
    declarations: [
        EmailConfirmPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {path: 'account-email-confirm/:token', component: EmailConfirmPageComponent},
        ], {scrollPositionRestoration: 'enabled'}),
        CommonModule,
        HttpClientModule

    ],
    exports: [EmailConfirmPageComponent]
})
export class EmailConfirmPageModule {
}
