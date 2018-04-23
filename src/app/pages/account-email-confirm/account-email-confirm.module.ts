import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AccountEmailConfirmComponent } from "./account-email-confirm.component";


@NgModule({
    declarations: [
        AccountEmailConfirmComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'account-email-confirm/:token', component: AccountEmailConfirmComponent },
        ]),
        CommonModule,
        HttpClientModule

    ],
    exports: [AccountEmailConfirmComponent]
})
export class AccountEmailConfirmModule {
}