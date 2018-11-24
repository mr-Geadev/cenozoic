import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentApi } from 'api';
import { PayingComponent } from 'pop-ups/paying/paying.component';

import { UserService } from '../../services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PayingComponent],
  entryComponents: [PayingComponent],
  providers: [
    UserService,
    PaymentApi
  ],
  exports: [PayingComponent],
})
export class PayingModule {
}
