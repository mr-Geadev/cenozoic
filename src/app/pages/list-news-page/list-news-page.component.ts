import { Component } from '@angular/core';

@Component({
  selector: 'list-news-page',
  templateUrl: './list-news-page.component.html',
  styleUrls: ['./list-news-page.component.scss'],
})
export class ListNewsPageComponent {

  public searchInput: string = '';
  public searchSubmit: string = '';
  public order: string = 'line';

  constructor() {
  }

  setFilter() {
    this.searchSubmit = this.searchInput;
  }

}