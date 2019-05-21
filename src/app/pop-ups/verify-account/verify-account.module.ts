import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyAccountComponent } from 'pop-ups/verify-account/verify-account.component';

import { UserService } from '../../services';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [VerifyAccountComponent],
	entryComponents: [VerifyAccountComponent],
	providers: [
		UserService
	],
	exports: [VerifyAccountComponent],
})
export class VerifyAccountModule {
}
