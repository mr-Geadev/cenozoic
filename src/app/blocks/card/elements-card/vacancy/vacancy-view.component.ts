import { Component, Input } from '@angular/core';

@Component({
  selector: 'vacancy-view',
  templateUrl: './vacancy-view.component.html',
  styleUrls: ['./vacancy-view.component.scss'],
})
export class VacancyViewComponent {

  @Input('dictionary') dictionary: any;
  @Input('vacancy') vacancy: any;
  @Input('respondTitle') respondTitle?: string;


  constructor() {
  }

}
