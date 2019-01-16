import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  ],
  exports: [ServicePageComponent],
})
export class ServicePageModule {
}
