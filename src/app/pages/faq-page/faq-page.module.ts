import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaqPageComponent } from 'pages/faq-page/faq-page.component';
import { PipesModule } from 'pipes/pipes.module';

@NgModule({
  declarations: [
    FaqPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'faq', component: FaqPageComponent },
    ], {scrollPositionRestoration: 'enabled'}),
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [FaqPageComponent],
})
export class FaqPageModule {
}
