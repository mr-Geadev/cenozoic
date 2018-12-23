import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginModalComponent } from './login.component';
import { LoginModalService } from './login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../../services';
import { AuthService } from '../../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [LoginModalComponent],
  entryComponents: [LoginModalComponent],
  providers: [
    LoginModalService,
    UserService,
    AuthService,
  ],
  exports: [LoginModalComponent],
})
export class LoginModalModule {
}
