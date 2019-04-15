import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalizationApi } from 'api';
import { PipesModule } from 'pipes/pipes.module';
import { ServicePageComponent } from './service-page.component';

@NgModule({
  declarations: [
    ServicePageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'services', component: ServicePageComponent, pathMatch: 'full' },
    ], { scrollPositionRestoration: 'enabled' }),
    CommonModule,
    PipesModule
  ],
  exports: [ServicePageComponent],
  providers: [
    LocalizationApi
  ]
})
export class ServicePageModule {
}
