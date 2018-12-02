import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConstructorBannerModule } from 'containers/constructor-banner';
import { BlankAccountGuard, LogInGuard, NotWorkerGuard } from 'guards';
import { EditBannerPageComponent } from 'pages/edit-banner-page/edit-banner-page.component';

@NgModule({
  declarations: [
    EditBannerPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'edit-banner/:id',
        component: EditBannerPageComponent,
        pathMatch: 'full',
        canActivate: [LogInGuard, NotWorkerGuard, BlankAccountGuard],
      },
    ], {scrollPositionRestoration: 'enabled'}),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // Blocks
    ConstructorBannerModule,
  ],
  exports: [EditBannerPageComponent],
})
export class EditBannerPageModule {
}
