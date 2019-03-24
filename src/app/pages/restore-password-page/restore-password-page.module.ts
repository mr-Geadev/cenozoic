import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { RestorePasswordPageComponent } from 'pages/restore-password-page/restore-password-page.component';
import { AuthService } from 'services';


@NgModule({
  declarations: [
    RestorePasswordPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {path: 'account-change-password/:token', component: RestorePasswordPageComponent},
    ], {scrollPositionRestoration: 'enabled'}),
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ]
  exports: [RestorePasswordPageComponent]
})
export class RestorePasswordPageModule {
}
