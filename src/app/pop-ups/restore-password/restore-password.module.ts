import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestorePasswordComponent } from 'pop-ups/restore-password/restore-password.component';
import { RestorePasswordService } from 'pop-ups/restore-password/restore-password.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [RestorePasswordComponent],
  entryComponents: [RestorePasswordComponent],
  providers: [
    RestorePasswordService,
    AuthService,
  ],
  exports: [RestorePasswordComponent],
})
export class RestorePasswordModule {
}
